import React, { useCallback, useEffect, useRef, useState } from 'react'

import './index.scss'

const SIZE = 4
const MOVE_DURATION = 110
const SWIPE_THRESHOLD = 24
const BEST_SCORE_KEY = 'jeong-io-2048-best'

const VECTORS = {
  up: { dr: -1, dc: 0 },
  down: { dr: 1, dc: 0 },
  left: { dr: 0, dc: -1 },
  right: { dr: 0, dc: 1 },
}

const KEY_MAP = {
  arrowup: 'up',
  arrowdown: 'down',
  arrowleft: 'left',
  arrowright: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
  k: 'up',
  j: 'down',
  h: 'left',
  l: 'right',
}

let tileId = 0
const nextTileId = () => ++tileId

function toGrid(tiles) {
  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
  tiles.forEach(tile => {
    grid[tile.r][tile.c] = tile
  })
  return grid
}

function addRandomTile(tiles) {
  const occupied = new Set(tiles.map(tile => tile.r * SIZE + tile.c))
  const empty = []

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!occupied.has(r * SIZE + c)) empty.push({ r, c })
    }
  }

  if (!empty.length) return tiles

  const { r, c } = empty[Math.floor(Math.random() * empty.length)]

  return tiles.concat({
    id: nextTileId(),
    r,
    c,
    value: Math.random() < 0.9 ? 2 : 4,
    isNew: true,
  })
}

/**
 * 이동 결과만 계산한다. 합쳐지는 두 타일은 같은 칸으로 모이되 값은 그대로 두고,
 * 살아남는 쪽에 mergedValue 를 달아둔다. 슬라이드 애니메이션이 끝난 뒤 commit 에서 값이 바뀐다.
 */
function move(tiles, direction) {
  const { dr, dc } = VECTORS[direction]
  const grid = toGrid(tiles)
  const rowOrder = dr > 0 ? [3, 2, 1, 0] : [0, 1, 2, 3]
  const colOrder = dc > 0 ? [3, 2, 1, 0] : [0, 1, 2, 3]
  const placed = Array.from({ length: SIZE }, () => Array(SIZE).fill(null))
  const absorbed = []
  let moved = false
  let gained = 0

  rowOrder.forEach(r =>
    colOrder.forEach(c => {
      const tile = grid[r][c]
      if (!tile) return

      let nr = r
      let nc = c
      let mergeTarget = null

      for (;;) {
        const tr = nr + dr
        const tc = nc + dc
        if (tr < 0 || tr >= SIZE || tc < 0 || tc >= SIZE) break

        const occupant = placed[tr][tc]
        if (!occupant) {
          nr = tr
          nc = tc
          continue
        }
        if (occupant.value === tile.value && !occupant.mergedValue) {
          mergeTarget = occupant
        }
        break
      }

      if (mergeTarget) {
        mergeTarget.mergedValue = mergeTarget.value * 2
        gained += mergeTarget.mergedValue
        absorbed.push({
          ...tile,
          r: mergeTarget.r,
          c: mergeTarget.c,
          isNew: false,
          isMerged: false,
          absorbed: true,
        })
        moved = true
        return
      }

      placed[nr][nc] = { ...tile, r: nr, c: nc, isNew: false, isMerged: false }
      if (nr !== r || nc !== c) moved = true
    })
  )

  const survivors = []
  placed.forEach(row => row.forEach(tile => tile && survivors.push(tile)))

  return { tiles: absorbed.concat(survivors), moved, gained }
}

function commit(tiles) {
  return tiles
    .filter(tile => !tile.absorbed)
    .map(tile =>
      tile.mergedValue
        ? {
            id: tile.id,
            r: tile.r,
            c: tile.c,
            value: tile.mergedValue,
            isNew: false,
            isMerged: true,
          }
        : { ...tile, isNew: false, isMerged: false }
    )
}

function hasMoves(tiles) {
  if (tiles.length < SIZE * SIZE) return true

  const grid = toGrid(tiles)

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const { value } = grid[r][c]
      if (r + 1 < SIZE && grid[r + 1][c].value === value) return true
      if (c + 1 < SIZE && grid[r][c + 1].value === value) return true
    }
  }

  return false
}

function createTiles() {
  return addRandomTile(addRandomTile([]))
}

const offset = n => `calc((100% + var(--g2048-gap)) * ${n})`

const positionStyle = (r, c) => ({
  transform: `translate(${offset(c)}, ${offset(r)})`,
})

// 바깥은 위치(translate), 안쪽은 등장/합체(scale) 를 맡는다. 한 요소에서 둘 다 하면 transform 이 서로를 덮어쓴다.
function tileClassName(tile) {
  return ['g2048-tile', tile.absorbed ? 'is-absorbed' : ''].filter(Boolean).join(' ')
}

function tileInnerClassName(tile) {
  const level = tile.value > 2048 ? 'super' : tile.value
  const digits = String(tile.value).length

  return [
    'g2048-tile-inner',
    `g2048-tile-${level}`,
    `g2048-tile-d${digits > 4 ? 5 : digits}`,
    tile.isNew ? 'is-new' : '',
    tile.isMerged ? 'is-merged' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function Game2048() {
  const [tiles, setTiles] = useState([])
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [status, setStatus] = useState('ready')
  const [gain, setGain] = useState(null)

  const tilesRef = useRef(tiles)
  const statusRef = useRef(status)
  const lockRef = useRef(false)
  const wonRef = useRef(false)
  const timerRef = useRef(null)
  const touchRef = useRef(null)

  tilesRef.current = tiles
  statusRef.current = status

  const startGame = useCallback(() => {
    clearTimeout(timerRef.current)
    lockRef.current = false
    wonRef.current = false
    setTiles(createTiles())
    setScore(0)
    setGain(null)
    setStatus('playing')
  }, [])

  const handleMove = useCallback(direction => {
    if (lockRef.current) return
    if (statusRef.current !== 'playing') return

    const result = move(tilesRef.current, direction)
    if (!result.moved) return

    lockRef.current = true
    setTiles(result.tiles)

    timerRef.current = setTimeout(() => {
      const committed = commit(result.tiles)
      const nextTiles = addRandomTile(committed)

      setTiles(nextTiles)
      if (result.gained > 0) {
        setScore(prev => prev + result.gained)
        setGain({ value: result.gained, key: nextTileId() })
      }

      if (!wonRef.current && committed.some(tile => tile.value >= 2048)) {
        wonRef.current = true
        setStatus('won')
      } else if (!hasMoves(nextTiles)) {
        setStatus('over')
      }

      lockRef.current = false
    }, MOVE_DURATION)
  }, [])

  // 첫 판은 마운트 후에 깐다. 빌드 시점(SSR)과 브라우저의 랜덤 결과가 달라지는 걸 피하기 위함.
  useEffect(() => {
    startGame()
    return () => clearTimeout(timerRef.current)
  }, [startGame])

  useEffect(() => {
    const saved = Number(window.localStorage.getItem(BEST_SCORE_KEY))
    if (saved) setBest(saved)
  }, [])

  useEffect(() => {
    if (score <= best) return
    setBest(score)
    window.localStorage.setItem(BEST_SCORE_KEY, String(score))
  }, [score, best])

  useEffect(() => {
    const onKeyDown = event => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (!event.key) return

      const direction = KEY_MAP[event.key.toLowerCase()]
      if (!direction) return

      event.preventDefault()
      handleMove(direction)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleMove])

  const onTouchStart = event => {
    const touch = event.touches[0]
    touchRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = event => {
    const start = touchRef.current
    if (!start) return
    touchRef.current = null

    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y

    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_THRESHOLD) return

    if (Math.abs(dx) > Math.abs(dy)) {
      handleMove(dx > 0 ? 'right' : 'left')
    } else {
      handleMove(dy > 0 ? 'down' : 'up')
    }
  }

  const keepPlaying = () => {
    setStatus('playing')
  }

  return (
    <div className="g2048">
      <div className="g2048-header">
        <div className="g2048-headline">
          <h2 className="g2048-title">2048</h2>
          <p className="g2048-description">
            같은 숫자끼리 합쳐서 2048을 만들어보세요.
          </p>
        </div>
        <div className="g2048-scores">
          <div className="g2048-score">
            <span className="g2048-score-label">SCORE</span>
            <strong className="g2048-score-value">{score}</strong>
            {gain && (
              <span key={gain.key} className="g2048-score-gain">
                +{gain.value}
              </span>
            )}
          </div>
          <div className="g2048-score">
            <span className="g2048-score-label">BEST</span>
            <strong className="g2048-score-value">{best}</strong>
          </div>
        </div>
      </div>

      <div className="g2048-toolbar">
        <span className="g2048-hint">방향키 · WASD · HJKL · 스와이프</span>
        <button type="button" className="g2048-button" onClick={startGame}>
          새 게임
        </button>
      </div>

      <div
        className="g2048-board"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="application"
        aria-label="2048 게임판"
      >
        <div className="g2048-inner">
          {Array.from({ length: SIZE * SIZE }, (_, index) => (
            <div
              key={index}
              className="g2048-cell"
              style={positionStyle(Math.floor(index / SIZE), index % SIZE)}
            />
          ))}

          {tiles.map(tile => (
            <div
              key={tile.id}
              className={tileClassName(tile)}
              style={positionStyle(tile.r, tile.c)}
            >
              <div className={tileInnerClassName(tile)}>{tile.value}</div>
            </div>
          ))}

          {status !== 'playing' && status !== 'ready' && (
            <div className="g2048-overlay">
              <p className="g2048-overlay-title">
                {status === 'won' ? '2048 달성 🎉' : '더 움직일 곳이 없어요'}
              </p>
              <p className="g2048-overlay-score">{score}점</p>
              <div className="g2048-overlay-actions">
                {status === 'won' && (
                  <button
                    type="button"
                    className="g2048-button"
                    onClick={keepPlaying}
                  >
                    계속하기
                  </button>
                )}
                <button
                  type="button"
                  className="g2048-button"
                  onClick={startGame}
                >
                  다시하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Game2048
