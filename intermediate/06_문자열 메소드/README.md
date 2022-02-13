# 문자열 메소드
- 문자열을 표현할 때는 작은 따옴표, 큰 따옴표, 벡틱 문자가 있음
- 보통 `HTML` 코드를 감쌀 때는 작은 따옴표를 쓰는 것이 좋음
- 영어로 된 문자는 큰 따옴표로 감싸는 것이 편리
- 벡틱은 `$`와 `변수`로 표현식을 쓸 때 쓰는 것이 편리
- 벡틱은 여러 줄을 표현할 때 사용 가능
### length
- 문자열 길이
```javascript
let desc = '안녕하세요';
desc.length; // 6
```
- 특정 위치에 접근
- but, 배열과 동일하게 한 글자만 바꾸는 것은 불가
```javascript
let desc = '안녕하세요';
desc[2]; // '하'

desc[4] = '용';
console.log(desc); // 안녕하세요
```
### toUpperCase()와 toLowerCase()
영문의 경우 모든 문자열을 대문자 혹은 소문자로 바꾸는 메소드

### str.indexOf(text)
문자를 인수로 받아 몇 번째 위치하는지 알려줌\
만약 찾는 문자가 없으면 `-1`을 반환함
```javascript
let desc = "Hi guys. Nice to meet you.";
desc.indexOf('to'); // 14

if (desc.indexOf('Hi') > -1) { // 이 경우 조건식의 값이 0이기 때문에 아래 로그를 출력하지 않음. 따라서 > -1 조건을 더 붙여줘야함
    console.log('Hi가 포함된 문장입니다.');
}
```
### str.slice(n, m)
특정 문자열의 범위(n~m) 뽑아주는 메소드(n: 시작점, m: 없으면 문자열 끝까지. 양수면 그 숫자 앞자리까지. 음수면 끝에서부터 셈)
### str.substring(n, m)
n과 m 사이 문자열 반환. n과 m을 바꿔도 동작함. 음수는 0으로 인식
### str.substr(n, m)
n부터 시작해서 m개를 가져옴
### str.trim()
앞 뒤 공백 제거
### str.repeat(n)
문자열 n번 반복
### 문자열 비교
- 아스키 코드로 비교함
```javascript
1 < 3 // true
"a" < "b" // true
"a".codePointAt(0); // 97
String.fromCodePoint(97); // "a"
```
### includes
문자가 있으면 true, 없으면 false 반환
```javascript
function hasCola(str) {
    if (str.includes("콜라")) {
        console.log("금칙어가 있습니다");
    } else {
        console.log("통과");
    }
}

hasCola("와 사이다가 짱이야");
hasCola("엥 콜라가 짱임");
hasCola("콜라");
```