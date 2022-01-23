# 함수(function) 기초
함수(function)
- 한 번에 한 작업에 집중할 수 있도록 코드 작성하기
- 읽기 쉽고 어떤 동작인지 알 수 있게 네이밍하기
  - showError
  - getName
  - createUserData
  - checkLogin
- 장점
  - 반복되는 코드를 줄일 수 있음
  - 유지보수가 쉬움

기본 format
```javascript
function 함수명(매개변수) { // 매개변수는 하나일수도 여러개일수도 있음
    console.log('아무거나 말하셈');
}
```
매개변수가 없는 함수
```javascript
function showError() {
    alert('에러가 발생했습니다. 다시 시도해주세요.');
}

showError();
```
매개변수가 있는 함수
```javascript
function sayHello(name) {
    let msg = `Hello`; // 지역변수이기 때문에 함수 내부에서만 사용 가능
    if (name) {
        msg += `, + ${name}`;
    }
    console.log(msg);
}

sayHello('Mike');
```
전역변수와 지역변수
```javascript
let msg = "welcome"; // 전역변수

function sayHello(name) {
    let msg = "Hello"; // 지역변수
    console.log(msg + ' ' + name);
}

sayHello('Mike');
```
가급적 `지역변수`를 사용하자
```javascript
let name = "Mike";

function sayHello(name) {
    console.log(name);
}

sayHello(); // 매개변수에 대입되는 값이 없기 때문에 undefined 출력
sayHello('Jane'); // Jane
```
추가 예시
```javascript
// OR
function sayHello(name) {
    let newName = name || 'friend';
    let msg = `Hello, ${newName}`;
    console.log(msg);
}

sayHello(); // 매개변수에 대입되는 값이 없기 때문에 Hello, friend 출력
sayHello('Jane'); // Hello, Jane 출력

// default value
function sayHello(name = 'friend') {
    let msg = `Hello, ${name}`;
    console.log(msg);
}

sayHello(); // 매개변수에 대입되는 값이 없기 때문에 디폴트 값 Hello, friend 출력
sayHello('Jane'); // Hello, Jane 출력

// return 으로 값 반환
function add(num1, num2) {
    return num1 + num2;
}

const result = add(2, 3);
console.log(result); // 5

// return문이 없는 경우 - undefined 반환
function showError() {
    alert('에러가 발생했습니다.');
    return;
    alert('이 코드는 절대 실행되지 않습니다.');
}

const result = showError();
console.log(result); // undefined
```