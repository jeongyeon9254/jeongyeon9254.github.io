---
title: '[TIL]Nest.js 기초(1)'
date: 2024-01-08
category: 'TIL'
draft: false
---

## Node.js 프레임워크

Express의 아키텍처가 개발자들마다 천차만별인 개발경험을 보다 좋게 바꾸기 위해 개발된 프레임워크

#### Nest.js 특징

- 내부적으로 Express를 기본적으로 사용함
- MVC 디자인 패턴(Controller, Service, Entity, Repository 등)을 기본으로 사용
- Typescript 기본으로 적용
- Java spring 프레임워크와 구조가 유사하며 개념적인 부분(DI,OOP..)도 유사함

#### 기본적인 구조

- App과 도메인을 가지고 있는 Module폴더
- 폴더에는 Module, Controller, Service, Entity, Repository등을 가지고 있음
- nest-cli.json 은 nest 프로젝트를 위해 특정한 설정을 할수있는 json 파일

클라이언트가 엔드포인트(모듈)에서 리퀘스트를 보내면(라우터) 컨트롤러 핸들러에서 서비스 부분에 로직을 가져와 인스턴스를 브라우저에 보내줌

모듈은 기본적으로 싱글톤이라 여럼 모듈간 쉽게 공급자의 동일한 인스터스를 제공함

컨트롤러내의 get,post,delete등 핸들러 요소
각각 @get,@post,@delete,@patch 데코레이터 사용

컨트롤러 생성 cli

```
nest g controller [모듈명] --no sepc(스펙없)

모듈 폴더 찾음 -> 모듈폴더 안에 컨트롤러 파일 생성 -> 모듈폴더 안 모듈파일 찾기->모듈 파일 안에다가 컨트롤러 넣어주기

```

접근제한자를 이용해서 소스 간단하게 하기

```javascript
@Controller('/')
export class AppController {
    constructor(private appSerivce:)
}
// 접근제한자를 생성자 파라미터에 선언하면 접근제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됨
```

프로바이더란 종속성을 주입하는것
객체는 서로 다양한 관계를 만들수 있음
