# 구조 분해 할당 Destructuring assignment
구조 분해 할당 구문은 배열이나 객체의 속성을 분해해서 그 값을 변수에 담을 수 있게 하는 표현식
1. 배열 구조 분해
```javascript
let [x, y] = [1, 2];

console.log(x); // 1
console.log(y); // 2
```
- 기본값
```javascript
let [a, b, c] = [1, 2]; // c값은 undefined
```
- 일부 반환값 무시
```javascript
let [user1, user2] = ['Mike', 'Tom', 'Jane', 'Tony'];

console.log(user1); // Mike
console.log(user2); // Jane
```
- 바꿔치기
```javascript
let a = 1;
let b = 2;

let c = a; // 임시변수
a = b;
b = c; // 복잡한 방법

[a, b] = [b, a]; // 한 번에
```
2. 객체 구조 분해
```javascript
let user = {name: 'Mike', age: 30}
let {name, age} = user;

console.log(name); // Mike
console.log(age); // 30
```
- 새로운 변수 이름으로 할당
```javascript
let user = {name: 'Mike', age: 30};
let {name: userName, age: userAge} = user;

console.log(userName);
console.log(userAge);
```
- 기본값 : 객체 내 값이 undefined일 때만 해당
```javascript
let user = {
    name: Mike, 
    age: 30, 
    gender: 'female'
};
let {name, age, gender = "male"} = user;

console.log(gender); // female
```