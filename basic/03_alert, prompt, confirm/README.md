# alert, prompt, confirm
사용자와 상호작용할 수 있는 대화상자
### alert
알려주는 역할\
`alert()`
### prompt
입력 받음
```javascript
const naem = prompt("이름을 입력하세요");
alert("환영합니다, " + name + "님");
// 벡틱으로 변경
alert(`안녕하세요, ${name}님. 환영합니다.`);

// 두 개의 인수를 받을 수 있음
const name = prompt("예약일을 입력해주세요.", "2020-10-"); // 두번째 인수가 입력받을 디폴트값
```
### confirm
확인 받음. 확인과 취소 버튼이 함께 존재
```javascript
const isAdult = confirm("당신은 성인입니까?");

console.log(isAdult); // 확인 누르면 true, 취소를 누르면 false
```

### 단점
1. 스크립트 일시 정지
2. 스타일링 불가능