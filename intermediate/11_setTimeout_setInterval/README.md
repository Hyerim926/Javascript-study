# setTimeout과 setInterval
1. setTimeout
- 일정 시간이 지난 후 함수를 실행
- 두 개의 인자(일정 시간 이후에 실행할 함수와 시간)를 가짐
```javascript
function fn() {
    console.log(3);
}

setTimeout(fn, 3000); // 3초 후 fn 실행

// 다른 표현
setTimeout(function () {
    console.log(3);
}, 3000);

// 인수가 더 필요한 경우
function showName(name) {
    console.log(name);
}

setTimeout(showName, 3000, 'Mike');
```
2. clearTimeout
- 예정된 작업을 없앰
```javascript
const tId = function showName(name) {
    console.log(name);
}

setTimeout(showName, 3000, 'Mike');

clearTimeout(tId);
```
3. setInterval
- 일정 시산 간격으로 함수 반복
```javascript
function showName(name) {
    console.log(name);
}

setInterval(showName, 3000, 'Mike'); // 3초마다 Mike 찍힘

// 중단하려면 clearInterval 실행하면됨
```
#### 참고
`delay = 0` 인 경우, 함수가 바로 실행되지는 않음
```javascript
setTimeout(function () {
    console.log(2); // 두 번째로 실행
}, 0);

console.log(1); // 첫번째로 실행
```