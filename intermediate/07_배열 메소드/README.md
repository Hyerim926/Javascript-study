# 배열 메소드
`arr.splice(n, m)` 특정 요소 지움 n번째 요소부터 m개를 지움
```javascript
let att = [0,1,2,3,4];
arr.splice(1, 2);

console.log(arr); // [0,3,4]
```
`arr.splice(n, m, x)` 특정 요소 지우고 추가 m자리에 0을 대입하면 지우는 요소 없이 추가만 함
```javascript
let arr = [1,2,3,4,5];
arr.splice(1,3,10,20);

console.log(arr); // [1,10,20,5]
```
`arr.splice()` 삭제된 요소 반환
```javascript
let arr = [1,2,3,4,5];
let result = arr.splice(1, 2);

console.log(arr); // [1,4.5]
console.log(result); // [2,3]
```
`arr.slice(n, m)` n부터 m까지 반환
```javascript
let arr = [1, 2, 3, 4, 5];
arr.slice(1, 4); // [2,3,4]
```
`arr.concat(arr2, arr3 ..)` 합쳐서 새 배열 반환
```javascript
let arr = [1, 2];
arr.concat([3, 4]); // [1,2,3,4]
arr.concat([3, 4], [5, 6]); // [1,2,3,4,5,6]
```
`arr.forEach(fn)` 배열 반복\
`arr.indexOf` 첫 요소부터 검색 `arr.lastIndexOf` 마지막 요소부터 검색
```javascript
let arr = [1, 2, 3, 4, 5, 1, 2, 3];
arr.indexOf(3); // 2
arr.indexOf(3, 3); // 7
arr.lastIndexOf(3); // 7
```
`arr.includes()` 배열 내 요소를 포함하는지 확인
```javascript
let arr = [1, 2, 3];

arr.includes(2); // true
arr.includes(8); // false
```
`arr.find(fn)` `arr.findIndex(fn)` 함수를 반환. 첫 번째 true값만 반환하고 끝. 만약, 없으면 undefined를 반환
`arr.filter(fn)` 만족하는 모든 요소를 배열로 반환
`arr.reverse()` 역순으로 재정렬
`arr.map(fn)` 함수를 받아 특정 기능을 시행하고 새로운 배열 반환
`arr.join()` 배열 합쳐서 문자열로
`arr.split()` 문자열을 나눠서 배열로
`Array.isArray()` 배열인지 확인 (typeof로 검증하면 배열도 객체로 판단)
`arr.sort()` 배열 재정렬, 배열 자체가 변경되니 주의. 인수로 정렬 로직을 담은 함수를 받음
```javascript
let arr = [27, 8, 5, 13];

function fn(a, b) {
    return a - b;
}
arr.sort(); // [13, 27, 5, 8] -> 배열 요소를 문자열로 받기 때문
arr.sort(fn);

console.log(arr);
```
- 위와 같은 방법은 번거로워서 보통 Lodash 함수를 이용해 `_.sortBy(arr)`로 표현함
`arr.reduce()` 인수를 함수로 받음 (누적 계산값, 현재값) => { return 계산값 };
```javascript
// 배열의 모든 수 합치기
let arr = [1, 2, 3, 4, 5];

// for, for of, forEach

const result = arr.reduce((prev, cur) => {
    return prev + cur;
}, 0); // 초기값 0

console.log(result);
```


