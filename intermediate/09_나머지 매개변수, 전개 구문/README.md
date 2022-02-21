# 나머지 매개변수와 전개 구문
`...`
1. 인수 전달
- 자바스크립트에서 인수 전달 개수에는 제한이 없음
- `arguments`
  - 함수로 넘어온 모든 인수에 접근
  - 함수 내에서 이용 가능한 지역 변수
  - length / index
  - Array 형태의 객체
  - 배열의 내장 메서드 없음(forEach, map)
2. 나머지 매개변수
- 늘 마지막에 위치해야함
```javascript
function showName(...names) {
    console.log(names);
}

showName(); // []
showName('Mike'); // ['Mike'] 
showName('Mike', 'Tome'); // ['Mike', 'Tome']
```
3. 전개 구문 : 배열
- `splice` 와 같은 배열 메서드 사용 않고 배열 만질 수 있음
- 복제도 가능함
```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = [...arr1, ...arr2];

console.log(result); // [1,2,3,4,5,6]
```