# 클로저
- 함수와 렉시컬 환경의 조합
- 함수가 생성될 당시의 외부 변수를 기억
- 생성 이후에도 계속 접근 가능
```javascript
function makeCounter() {
    let num = 0; // 은닉화

    return function () {
        return num++; 
    };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
```