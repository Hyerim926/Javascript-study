# 함수 표현식, 화살표 함수(arrow function)
1. 함수 선언문
- 어디서든 호출 가능 
```javascript
// sayHello(); 여기서 선언해도 동작함
function sayHello() {
    console.log('Hello');
}

sayHello();
```
2. 함수 표현식
- 코드에 도달하면 생성
```javascript
let sayHello = function () {
    console.log('Hello');
};

sayHello();
```
3. 화살표 함수(arrow function)
- return문이 하나라면 괄호 생략 가능
- 인수가 하나라면 괄호 생략 가능
- 인수가 없는 경우에는 괄호 생략 불가
- return문이 하나라도 return문 이전에 여러 코드가 있을 경우 괄호 생략 불가
```javascript
let add = (num1, num2) => {
    num1 + num2;
}

let sayHello = name => `Hello, ${name}`;
```