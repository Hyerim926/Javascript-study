# this
## 함수와 객체를 구분하는 기능으로 사용
### 학습 목표
1. 상황별로 this가 어떻게 달라지는지
2. 왜 그렇게 되는지
3. 예상과 다른 대상을 바라보고 있을 때 그 원인을 효과적으로 추적하는 방법
### 상황에 따라 달라지는 this
`this` 실행 컨텍스트 생성 시 함께 결정. 즉, 함수를 어떤 방식으로 호출하느냐에 따라 값 변동
- 전역공간에서의 `this`
  - 전역 객체, 브라우저에서는 `window` Node.js에서는 `global`
  ```javascript
  // 전역 공간에서의 this(브라우저 환경)
  console.log(this);
  console.log(window);
  console.log(this === window); // true
  
  // 전역 공간에서의 this(Node.js 환경)
  console.log(this);
  console.log(global);
  console.log(this === global); // true
  ```
- 전역공간의 특이한 성질
  - 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 `프로퍼티로 할당`함 (=변수이면서 객체의 프로퍼티)
  ```javascript
  var a = 1;
  console.log(a); // 1
  console.log(window.a); // 1
  console.log(this.a); // 1
  ```
  - 값이 모두 1로 동일한 이유 : 자바스크립트의 모든 변수는 특정 객체의 프로퍼티로서 동작하기 때문. 특정객체란 실행컨텍스트의 L.E인데 전역 컨텍스트의 경우 L.E는 전역객체를 그대로 참조함
  ```javascript
  var a = 1;
  window.b = 2;
  console.log(a, window.a, this.a); // 1 1 1
  console.log(b, window.b, this.b); // 2 2 2
  
  window.a = 3;
  b = 4;
  console.log(a, window.a, this.a); // 3 3 3
  console.log(b, window.b, this.b); // 4 4 4
  ```
  - 전역변수 선언과 전역객체의 프로퍼티 할당 사이에 전혀 다른 경우도 존재, `삭제 명령 시`에 해당
  ```javascript
  // 전역변수로 선언한 경우
  var a = 1;
  delete window.a; // false
  console.log(a, window.a, this.a); // 1 1 1
  
  var b = 2;
  delete b; // false
  console.log(b, window.b, this.b); // 2 2 2
  
  // 처음부터 전역객체의 프로퍼티로 할당한 경우
  window.c = 3;
  delete window.c; // true
  console.log(c, window.c, this.c); // Uncaught ReferenceError: c is not defined
  
  window.d = 4;
  delete d; // true
  console.log(d, window.d, this.d); // Uncaught ReferenceError: d is not defined
  ```
  - 전역변수로 선언한 경우에는 `delete`명령 안먹힘. 반면, 전역객체의 프로퍼티로 할당한 경우에는 `delete`명령 먹힘\
    전역객체의 프로퍼티로 할당한느 경우 자동으로 해당 프로퍼티의 `configurable`속성(변경 및 삭제 가능성)을 `false`로 정의함.\
    -> `var로 선언한 전역변수`와 `전역객체의 프로퍼티`는 호이스팅 여부 및 configurable 여부에서 차이 존재
- 메서드로서 호출할 때 그 메서드 내부에서의 this