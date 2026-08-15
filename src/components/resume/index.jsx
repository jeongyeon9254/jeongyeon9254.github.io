import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import './index.scss'

export const Resume = ({ photo }) => {
  const photoImage = getImage(photo)

  return (
    <div className="resume-wrap">
      <div className="resume">
        <header className="head">
          <div>
            <h1 className="name">
              정연재
              <small>Frontend Engineer</small>
            </h1>
            <p className="tagline">
              레거시를 걷어내고 구조를 다시 세우는 일을 주로 해온 프론트엔드
              개발자입니다. 분리 운영되던 3개 서비스를 하나의 모노레포
              대시보드로 통합했고, iframe 기반 리뷰 위젯을 Web Components로 옮겨
              렌더링 속도와 트래픽 비용을 절반 이하로 줄였습니다. 코드뿐 아니라
              배포 파이프라인·컨벤션·문서까지 팀이 굴러가는 환경을 함께
              만듭니다.
            </p>
            <ul className="contact">
              <li>jeongyeon9254@naver.com</li>
              <li>
                <a href="https://jeongyeon9254.github.io/">
                  jeongyeon9254.github.io
                </a>
              </li>
              <li>
                <a href="https://github.com/jeongyeon9254">
                  github.com/jeongyeon9254
                </a>
              </li>
            </ul>
          </div>
          <div className="photo">
            {photoImage && (
              <GatsbyImage image={photoImage} alt="정연재 프로필 사진" />
            )}
          </div>
        </header>

        <section>
          <h2 className="sec-title">강점</h2>
          <ul className="clean summary">
            <li>
              <b>레거시 마이그레이션</b>
              <div>
                iframe + 템플릿 위젯 → LIT 기반 Web Components, Vue → React,
                Angular 16 → 19, 분리된 3개 서비스 → Nx 모노레포. 서비스를
                멈추지 않고 구조를 바꾸는 작업을 반복해 왔습니다.
              </div>
            </li>
            <li>
              <b>수치로 남는 개선</b>
              <div>
                위젯 렌더링 <span className="m">3.2s → 1.1s</span> 전송량{' '}
                <span className="m">412KB → 166KB</span> CDN 요청{' '}
                <span className="m">7,000만 → 3,000만 건</span>. 성능 개선을
                인프라 비용 절감까지 연결해 정리합니다.
              </div>
            </li>
            <li>
              <b>개발 환경 설계</b>
              <div>
                수동 배포를 CI/CD로 자동화하고, PR 단위 작업·브랜치 전략·코드
                컨벤션을 도입했습니다. 코드리뷰 문화와 FE 스터디를 직접 제안해
                운영하고 있습니다.
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="sec-title">기술 스택</h2>
          <dl className="stack">
            <dt>Language</dt>
            <dd>TypeScript, JavaScript</dd>
            <dt>Framework</dt>
            <dd>Angular (RxJS, Signals), React, Vue, LIT / Web Components</dd>
            <dt>Architecture</dt>
            <dd>
              Nx 모노레포, FSD(Feature-Sliced Design), Native Federation, Shadow
              DOM
            </dd>
            <dt>State</dt>
            <dd>React Query, Recoil, Redux Toolkit, Angular Signals</dd>
            <dt>Style</dt>
            <dd>
              LESS, styled-components, 디자인 시스템 · 공용 컴포넌트 라이브러리
            </dd>
            <dt>Infra / Tool</dt>
            <dd>GitHub Actions, AWS S3 · CDN, Datadog, Playwright, Figma</dd>
            <dt>AI</dt>
            <dd>
              Claude 기반 개발 워크플로우 자동화, 사내 룰 · SSOT 문서 체계 운영
            </dd>
          </dl>
        </section>

        <section>
          <h2 className="sec-title">
            경력 <span>총 4년 1개월</span>
          </h2>

          <article className="job">
            <div className="job-head">
              <h3>
                샐러드랩 <em>프론트엔드 개발자</em>
              </h3>
              <span className="period">2024.03 – 재직 중 · 2년 5개월</span>
            </div>
            <p className="job-intro">
              리뷰 · 마케팅 SaaS(알파리뷰)의 어드민 대시보드와 쇼핑몰 노출
              위젯을 담당했습니다. 분리되어 있던 서비스의 통합 대시보드를
              설계·구축하고, 위젯 렌더링 구조를 전면 교체해 성능과 인프라 비용을
              함께 개선했습니다.
            </p>

            <div className="proj">
              <h4>
                리뷰 위젯 렌더링 구조 전환 및 비용 최적화{' '}
                <span className="when">2025.06 – 2025.08</span>
              </h4>
              <ul className="bullets">
                <li>
                  iframe + 서버 템플릿 기반 위젯을 LIT · Shadow DOM 컴포넌트로
                  마이그레이션 — 렌더링 시간{' '}
                  <span className="m">3.2s → 1.1s</span> (66% 개선)
                </li>
                <li>
                  스크립트 모듈화 및 FE↔BE 불필요 API 정리 — Data Transfer Out{' '}
                  <span className="m">412KB → 166KB</span>, 평균 API 요청{' '}
                  <span className="m">16회 → 8회</span>
                </li>
                <li>
                  CDN 요청 전략 재설계로 302 리다이렉트 최소화 — 요청량{' '}
                  <span className="m">7,000만 → 3,000만 건</span>, 관련 트래픽
                  비용 50% 이상 절감
                </li>
                <li>
                  리뷰 카드 누적이 전체 리렌더링에 미치는 영향을{' '}
                  <code>content-visibility</code>로 차단
                </li>
                <li>
                  위젯 미리보기를 하드코딩 방식에서 실제 생성 스크립트 기반
                  프리뷰로 전환 — 위젯 추가 시 반복 공수 제거
                </li>
              </ul>
            </div>

            <div className="proj">
              <h4>
                3개 서비스 통합 대시보드 구축{' '}
                <span className="when">2024.06 – 2025.04</span>
              </h4>
              <ul className="bullets">
                <li>
                  업셀 · 푸시 · 리뷰로 각각 운영되던 웹을 Nx 모노레포 단일
                  대시보드로 통합, 의존성 트리를 제거해 앱별 독립 배포 기반 마련
                </li>
                <li>
                  FSD 아키텍처 도입 및 공통 컴포넌트 · 레이아웃 · GNB 상태관리
                  설계, 앱별 온보딩 워크플로우와 공용 상태 정의
                </li>
                <li>
                  Signals와 React Query 패턴을 차용한 서비스 모듈을 설계해 중복
                  API 호출 제거
                </li>
                <li>
                  Angular 16 → 19 마이그레이션, GitHub Actions Large Runner를
                  main 브랜치에만 적용해 빌드 시간과 비용을 동시에 관리
                </li>
                <li>
                  배포 인프라 및 CI/CD 구축, Datadog 기반 에러 · 세션 로깅 체계
                  도입
                </li>
                <li>
                  서비스 간 UX를 일관되게 정리한 결과 평균 세션 체류 시간 증가
                </li>
              </ul>
            </div>

            <div className="proj">
              <h4>
                신규 백오피스 어드민 및 모노레포 기반 정비{' '}
                <span className="when">2024.03 – 2024.06</span>
              </h4>
              <ul className="bullets">
                <li>
                  구독 · 결제 워크플로우 설계, 모노레포 앱 및 공용 모듈 구성,
                  base.less 변수화
                </li>
                <li>
                  공통 스타일에서 폰트를 호출해 다중 폰트가 중복 로드되던 문제를
                  각 앱 루트 import 구조로 분리해 해결
                </li>
                <li>
                  Angular Material 컴포넌트를 사내 디자인 시스템에 맞게 래핑,
                  피드백 메시지를 스택형으로 재구성
                </li>
                <li>
                  라우팅 처리를 네비게이션 컴포넌트에서 Route Guard로 이관,
                  static 파일 S3 이전, Prettier · ESLint 정비
                </li>
                <li>
                  merge 기반 작업을 PR 단위로 전환하고 커밋 · 브랜치 컨벤션 도입
                  — GitFlow에서 main 중심(TBD) 전략으로 변경해 릴리스 이력 관리
                </li>
              </ul>
            </div>

            <div className="proj">
              <h4>
                디자인 시스템 라이브러리 · 배포 자동화{' '}
                <span className="when">2026.08 –</span>
              </h4>
              <ul className="bullets">
                <li>
                  인증 코드 보유자가 수동 명령으로 진행하던 UI 라이브러리 배포를
                  CI/CD 자동 배포로 전환, 성공 · 실패를 Slack 채널로 알림
                </li>
                <li>
                  컴포넌트 모음에서 출발해 생긴 디자인–코드 간 괴리를 디자이너와
                  합의해 재정렬, 공용 라이브러리 패키지화
                </li>
                <li>Playwright 기반 E2E 테스트 자동화 파이프라인 구성</li>
              </ul>
            </div>

            <div className="proj">
              <h4>
                플랫폼 · 상품 확장{' '}
                <span className="when">2025.12 – 2026.06</span>
              </h4>
              <ul className="bullets">
                <li>
                  아임웹 신규 플랫폼 연동 설계 — 하나의 대시보드에서 플랫폼별로
                  다른 상태 UI를 처리하도록 구조화해 이후 플랫폼 · 요금제 확장의
                  토대 마련
                </li>
                <li>
                  무료 구독형 인스타피드 · 알파리뷰 앱 런칭, 구독 종류별 전환 및
                  온보딩 상태 설계
                </li>
                <li>
                  온보딩 단계에서 위젯 자동 설치 지원 — 설치 · 삭제 기준과
                  상태관리 재정의, 위젯 프리뷰 타입 추가
                </li>
              </ul>
            </div>

            <div className="proj">
              <h4>AI 기반 개발 워크플로우 · 팀 문화</h4>
              <ul className="bullets">
                <li>
                  신규 입사자와 기존 인원을 위한 통합 코드 파악 도구(AR-AI)
                  개발, 사내 Claude 룰 정비 및 옵시디언 기반 SSOT 문서 체계 구축
                </li>
                <li>방어 스크립트 조기 경보 및 자동 수정 PR 생성 기능 개발</li>
                <li>
                  코드리뷰 도입과 FE 스터디를 제안해 운영, 온보딩 문서 · README
                  · 트러블슈팅 기록 정리
                </li>
                <li>
                  PD 및 타 직군과 기술 의사결정을 조율하고 통합 프로젝트를 리딩
                </li>
              </ul>
            </div>
          </article>

          <article className="job">
            <div className="job-head">
              <h3>
                얼리페이 <em>프론트엔드 개발자</em>
              </h3>
              <span className="period">2022.03 – 2023.10 · 1년 8개월</span>
            </div>
            <p className="job-intro">
              소상공인 선정산 서비스의 웹 프론트엔드를 단독으로 담당했습니다.
              Vue 기반 레거시를 React · TypeScript로 마이그레이션해 이후 합류할
              개발자가 이어받을 수 있는 코드베이스로 정리했고, 배포 환경과
              운영팀 업무 자동화까지 프론트엔드 바깥의 영역을 함께 맡았습니다.
            </p>

            <div className="proj">
              <h4>Vue → React 마이그레이션 및 구조 재설계</h4>
              <ul className="bullets">
                <li>
                  싱글 파일 컴포넌트가 사실상 페이지 단위로 묶여 있던 구조를
                  작은 단위 컴포넌트로 재설계, 라우트 가드와 공통 레이아웃을
                  직접 구현
                </li>
                <li>
                  Redux → React Query + Recoil로 전환해 서버 상태와 클라이언트
                  상태를 분리, 이후 Redux Toolkit · TypeScript로 정착
                </li>
                <li>
                  TypeScript 마이그레이션과 전체 프론트엔드 구조 개편, 테스트
                  코드 및 Git 컨벤션 도입
                </li>
                <li>
                  불필요한 로컬스토리지 · 전역 상태 정리, 글로벌 CSS와
                  styled-components 상속으로 컴포넌트 재사용성 확보
                </li>
              </ul>
            </div>

            <div className="proj">
              <h4>성능 · 사용자 경험 개선</h4>
              <ul className="bullets">
                <li>
                  라우트 가드에서 문서 이미지 판별을 위해 매번 호출하던 API를
                  새로고침 시에만 호출하도록 변경해 중복 요청 제거
                </li>
                <li>
                  무한 스크롤을 스크롤 이벤트에서 IntersectionObserver로 전환,
                  모바일 정산 화면 스크롤 이벤트 최적화
                </li>
                <li>
                  <code>picture</code> · <code>source</code> 태그로 WebP · SVG ·
                  PNG를 브라우저 지원에 따라 분기 제공
                </li>
                <li>
                  Rollup 기반 빌드에 minify와 코드 스플리팅을 적용하고 중복 API
                  호출 순서를 정리해 초기 로딩 리소스 축소
                </li>
                <li>
                  Vue History 모드 전환 및 Netlify 리다이렉트 설정, robots.txt ·
                  메타 description 정비
                </li>
              </ul>
            </div>

            <div className="proj">
              <h4>배포 환경 이전 및 인프라 자동화</h4>
              <ul className="bullets">
                <li>
                  백엔드와 배포 스택을 통일하기 위해 Netlify에서 AWS로 이전 —
                  프론트엔드 월 배포 비용{' '}
                  <span className="m">50,495원 → 3,000원</span>
                </li>
                <li>
                  이전 과정에서 발생한 Jenkins 메모리 부족 이슈를 스왑 메모리
                  설정으로 해결
                </li>
                <li>
                  80 포트를 닫은 서버의 certbot 갱신을 DNS 방식으로 전환하고
                  Crontab으로 자동화, 결과를 Slack으로 전송
                </li>
                <li>
                  CloudFront → S3 → Athena → Grafana로 표준 액세스 로그
                  파이프라인 구성
                </li>
                <li>
                  백엔드 API Error를 Sentry 커스텀 에러로 로깅해 운영팀의 CS
                  선제 대응 가능하게 함
                </li>
              </ul>
            </div>

            <div className="proj">
              <h4>CS 어드민 · 크롬 익스텐션 개발</h4>
              <ul className="bullets">
                <li>
                  운영팀이 기존 도구와 이질감 없이 쓰도록 Django Admin과 유사한
                  UI로 CS 어드민 개발
                </li>
                <li>
                  파편화된 고객 정보를 한 화면에 모은 CS 대시보드와 엑셀
                  내보내기 기능으로 수기 반복 작업 제거
                </li>
                <li>
                  계정 정보 · 날짜 입력 등 단순 반복 업무를 자동화하는 크롬
                  익스텐션 개발, <code>chrome.storage</code>로 탭 간 상태 공유
                </li>
                <li>
                  GitHub Actions로 master push 시 Notion · Slack API를 통해 버전
                  기록과 알림 자동화
                </li>
              </ul>
            </div>

            <div className="proj">
              <h4>금융 도메인 기능 개발</h4>
              <ul className="bullets">
                <li>
                  대부 약정 동의 사이트 개발 — 버튼 조작에 따라 약관 위치로 자동
                  스크롤되도록 동의 UX 개선
                </li>
                <li>
                  계좌 이미지 업로드 시 Tesseract OCR로 계좌번호를 추출해 입력
                  필드에 자동 반영
                </li>
                <li>
                  Canvas 기반 전자 서명 패드 구현 — 서명 데이터는
                  클라이언트에서만 보관 후 전송
                </li>
                <li>
                  경남은행 인증번호 팝업 개발, 정산 페이지 이중 탭 구조 개편
                </li>
                <li>
                  커스텀 캘린더 컴포넌트를 직접 구현해 라이브러리 제약 없이
                  요구사항 반영
                </li>
              </ul>
            </div>

            <div className="proj">
              <h4>그로스 · 마케팅 기반 작업</h4>
              <ul className="bullets">
                <li>
                  카카오 친구 초대 이벤트 개발(메시지 공유, 초대 현황 페이지) 및
                  카카오 로그인 시 초대 · UTM 기준 분기 처리
                </li>
                <li>
                  GA · GTM 삽입, 회원가입 유입 경로(UTM · 리퍼럴) 추적 체계 구축
                </li>
                <li>PWA 설치 배너 및 설정, Web Push 발송 테스트</li>
                <li>
                  백엔드 없이 인터랙션 중심의 행사용 체험 사이트를 1주 만에 개발
                </li>
              </ul>
            </div>
          </article>
        </section>

        <section>
          <h2 className="sec-title">활동</h2>
          <ul className="bullets">
            <li>
              구름 새싹톤 참가 (2023.06) — 시각장애인 대상 웹 플랫폼 개발. Web
              Speech API 음성 인식 신청 폼, Semantic Tag와{' '}
              <code>aria-label</code> 기반 페이지 안내 구현
            </li>
            <li>
              사내 개발 세션 운영 — 2주 단위로 FE · BE · UI/UX 주제를 정해 공유
            </li>
          </ul>
        </section>

        <div className="foot">
          <span>정연재 · Frontend Engineer</span>
        </div>
      </div>
    </div>
  )
}
