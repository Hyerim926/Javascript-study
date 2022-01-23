# switch문
```javascript
switch (평가) {
    // case A:
        // A일 때 코드
    // case B:
        // B일 때 코드
}

// 아래 코드와 동일하게 동작
if (평가 == A) {
    // A일 때 코드
} else if (평가 == B) {
    // B일 때 코드
}
```
```javascript
// 사과: 100원
// 바나나: 200원
// 키위: 300원
// 멜론: 500원
// 수박: 500월
// 사고 싶은 과일 물어보고 가격 알려주기
let fruit = prompt('무슨 과일을 사고 싶나요?');

switch (fruit) {
    case '사과':
        console.log('100원입니다.');
        break;
    case '바나나':
        console.log('200원입니다.');
        break;
    case '키위':
        console.log('300원입니다.');
        break;
    case '멜론':
    case '수박':
        console.log('500원입니다.');
        break;
    default: // 모든 경우에 해당하지 않는 경우
        console.log('그런 과일은 없습니다');
}
```