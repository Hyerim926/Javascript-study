# 연산자
### 나머지
홀수 : X % 2 = 1\
짝수 : X % 2 = 0\
어떤 값이 들어와도 5를 넘기면 안됨 -> X % 5 = 0~4 사이의 값만 변환
### 거듭제곱
```javascript
const num = 2 ** 3;
console.log(num); // 8 
```
### 우선순위
*/가 +-보다 더 우선순위\
```javascript
// 연산자 줄여 쓰기
let num = 10;
num = num + 5;

num += 5;
```
### 증가 연산자, 감소 연산자
```javascript
let num = 10;
let result = num++; // 10
let result = ++num; // 11
let result = num--; // 10
let result = --num; // 9
console.log(result);
```
