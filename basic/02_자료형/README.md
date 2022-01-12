# 자료형
### 문자형
```javascript
const name = "Mike"
const name = 'Mike'
const name = `Mike`

const message = "I'm a boy."
const message2 = 'I\'m a boy.'

const message3 = `My name is ${name}`; // 표현식
const dontdothis = "My name is ${name}"; // "My name is ${name}" 으로 출력됨
console.log(message3)

// 문자형도 더할 수 있음
const name = "Mike";

const a = "나는 ";
const b = " 입니다.";
console.log(a + name + b); // 나는 Mike 입니다.
```

### 숫자형
```javascript
const age = 30;
const PI = 3.14 // 소수점 표현 가능

console.log(1 + 2); // 더하기
console.log(10-3); // 빼기
console.log(3*2); // 곱하기
console.log(6/3); // 나누기
console.log(6%4); // 나머지

const x = 1/0;
console.log(x); // Infinity

// 문자열을 숫자로 나누는 경우
const name = "Mike";
const y = name / 2;
console.log(y); // NaN = 숫자가 아니란 뜻, Not a Number
```
숫자형과 문자형을 더할 수도 있는데 이 경우엔 숫자도 문자형으로 변환됨.
```javascript
const name = "hey";
const age = 27;

const a = "나는 ";
const b = "이고, ";
const c = "살이야."

console.log(a + name + b + age + c); // "나는 hey이고, 27살이야.
```

### Boolean
```javascript
const a = true;
const b = false;

const name = "Mike";
const age = 30;

console.log(name === "Mike"); // true
console.log(age > 40); // false 
```

### null과 undefined
`null`은 값이 없다는 뜻. `undefined`는 값이 할당되지 않았다는 뜻
```javascript
let age;
console.log(age); // undefined

let user = null;
```

### 객체형과 심볼형
null은 객체형이 아님
### typeOf 연산자
```javascript
const name = "Mike";

console.log(typeof 3); // number
console.log(typeof name); // string
console.log(typeof true); // boolean
console.log(typeof "xxx"); // string
console.log(typeof null); // object - 객체형
console.log(typeof undefined) // undefined
```