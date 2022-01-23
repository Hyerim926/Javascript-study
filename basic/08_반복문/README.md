# 반복문

동일한 작업을 여러분 실행

1. for

```javascript
for (let i = 0; i < 10; i++) {
    console.log(i + 1);
}
// 1) let i = 0; 초기값
// 2) i < 10; 조건
// 3) i++; 코드 실행 후 작업
```

2. while

```javascript
let i = 0;
while (i < 10) {
    console.log(i);
    i++; // 코드 
}
```

3. do-while

```javascript
let i = 0;
do {
    // 코드
    i++;
} while (i < 10)
```

- break, continue
  - break: 멈추고 빠져나옴
    ```javascript
    while (true) {
     let answer = confirm('계속 할까요?');
     if (!answer){
      break;
     }
    }
    ```
  - continue: 멈추고 다음 반복으로 진행

    ```javascript
    for (let i = 0; i < 10; i++){
        if (i % 2) {
            continue;
        }
        console.log(i);
    }
    ```
