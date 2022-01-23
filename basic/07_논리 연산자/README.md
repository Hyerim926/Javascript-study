# 논리 연산자(AND, OR, NOT)
1. OR `||` 여러개 중 하나라도 true면 true. 즉, 모든 값이 false일 때만 false를 반환
- 첫 번째 true를 발견하는 즉시 평가를 멈춤
2. AND `&&` 모든 값이 true면 true. 즉, 하나라도 false면 false를 반환
- 첫 번째 false를 발견하는 작성 즉시 평가를 멈춤
3. NOT `!` true면 true, false면 false
```javascript
const name = 'Mike';
const age = 30;

// 1. 이름이 Tom이거나, 성인이면 통과
if (name === 'Tom' || age > 19) {
    console.log('통과');
} else {
    console.log('돌아가');
}

// 2. 이름이 Mike이고 성인이면 통과
if (name = 'Mike' && age > 19) {
    console.log('통과');
} else {
    console.log('돌아가');
}

// 3. 나이를 입력받아 성인이 아니면 돌아가기
const age = prompt('나이가..?');
const isAdult = age > 19;

if (!isAdult) {
    console.log('돌아가...');
}
```
4. 우선순위
- AND가 OR보다 더 높음
```javascript
// 남자이고, 이름이 Mike이거나 성인이면 통과
const gender = 'F';
const name = 'Jane';
const isAdult = true;

if (gender === 'M' && name === 'Mike' || isAdult) {
    // if ((gender === 'M' && name === 'Mike') || isAdult) 와 동일
    console.log('통과');
} else {
    console.log('돌아가');
}

// 결과 : 통과
// 조건식을 (gender === 'M' && (name === 'Mike' || isAdult)) 이렇게 해주면 돌아가가 뜸
```
