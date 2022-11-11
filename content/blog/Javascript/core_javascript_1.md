---
title: '코어 자바스크립트'
date: 2022-11-07
category: 'Javascript'
draft: false
---

### this란 뭐지?

자바스크립트 내에서 사용하는 this

처음에는 무엇인지 잘 모르고 어떤식으로 동작하는지 모르기에 공부했습니다.  
먼저 this가 왜 생겼는지에 대해 알아봅시다.

javascript는 설계당시 java와는 다르게 가볍고 인터넷을 위한 작은 스크립트 언어로 설계되었습니다. 하지만 그와 동시에 java의 oop개념을 일부 차용하면서 쉽고 간결한 언어를 설계하려고 했습니다.

그래서 oop처럼 상송,추상화,다형성을 class 없이 javascript에 넣고 싶었습니다. 그렇다면 class가 없는데 어떻게 객체를 만들수 있지? 라고 생각했고, javascript는 아래와 같이 객체문법을 사용했습니다.

```jsx
var person = {
	name = 'covy'
	age = 20
}

console.log(person.name) // 'covy'
console.log(person.age) // 20
```

그러면 타입이 없다면.. 객체 내의 메소드는 어떻게 동작시킬수 있을까? 에 대한방식으로 함수내 this 를 사용했다.
