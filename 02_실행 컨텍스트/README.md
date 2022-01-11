# 실행 컨텍스트
## 실행 컨텍스트란?
실행할 코드에 제공할 환경 정보들을 모아놓은 객체. 자바스크립트의 동적 언어로서의 성격
### 그렇다면 자바스크립트만의 특이한 현상은?
- 호이스팅 (어떤 실행 컨텍스트가 활성화되는 시점에 선언된 변수를 위로 끌어올림)
- 외부 환경 정보 구성
- `this`값 설정
### 스택과 큐
`스택` 출입구가 하나 뿐, 깊은 우물같은 데이터 구조. (in) abcd -> (out) dcba\
`큐` 양쪽이 모두 열려있음. 한 쪽은 입력, 한 쪽은 출력 담당 (in) abcd -> (out) abcd
### 작동 원리
동일한 환경에 있는 코드들을 실행할 때 필요한 환경 정보들을 모아 컨텍스트를 구성함. -> 이를 `콜 스택`에 쌓아올렸다가, 가장 상위에 있는 코드들을 실행함.\
`동일한 환경` 하나의 실행 컨텍스트르 구성할 수 있는 방법. 전역공간, eval() 함수, 함수 등이 존재. 가장 흔한 방법은 `함수 실행` 방법
- 예제
```javascript
// 1번
var a = 1;
function outer() {
    function inner() {
        console.log(a); // undefined
        var a = 3;
    }
    // 2번
    inner();
    console.log(a); // 1
}
// 3번
outer();
console.log(a); // 1
```
=> `1번` 전역 컨텍스트(파일이 열리는 순간 활성화)가 콜 스택에 담김\
   `3번` outer() 컨텍스트 생성 후 콜 스택에 담음\
   `2번` inner() 컨테스트 생성 후 outer() 컨텍스트 코드 실행 중단 및 inner() 실행\
           inner() 내부에서 a 변수에 3 할당한 뒤 컨텍스트 종료\
   `3번` 중단되었던 outer() 재진행\
   `1번` outer()가 실행되어 a값 출력한 후에는 전역 컨텍스트도 제거됨\
### 실행 컨텍스트에 담기는 정보
- VariableEnvironment : 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 선언 시점의 LexicalEnvironment의 스냅샷으로 변경사항은 반영 x
- LexicalEnvironment : 처음에는 VariableEnvironment와 같지만 변경 사항이 실시간으로 반영됨
- ThisBinding : this 식별자가 바라봐야 할 대상 객체
## VariableEnvironment
- `LexicalEnvironment`와 같지만 _최초 실행시 스냅샷 유지_. 실행 컨텍스트 생성 시 `variableEnvironment`에 정보를 담음. 이걸 그대로 복사해 `LexicalEnvironment`를 생성하고 이후 이를 주로 활용
- `VariableEnvironment`와 `LexicalEnvironment`의 내부는 `environmentRecord`와 `outer-EnvironmentReference`로 구성되어있음
## LexicalEnvironment
> environmentRecord와 호이스팅
- environmentRecord
현재 컨텍스트와 관련된 코드의 식별자 정보 제공. 컨텍스트 내부 전체를 처음부터 끝까지 순서대로 수집\
지정된 매개변수 식별자와 선언한 함수로 컨텍스트 구성 함수가 이루어져있다면 그에 대한 식별자는 그 함수 자체 혹은 var로 선언된 변수의 식별자가 됨
cf. 전역 실행 컨텍스트 : window나 node.js의 global 객체 등과 같은 전역 객체를 활용함. 이는 변수 객체 생성이 아닌 js 구동환경이 별도로 제공하는 객체로 호스트 객체로 분류됨
- 호이스팅 (hoisting)
끌어올리다라는 의미. 변수 수집 과정을 이해하기 쉬운 방법으로 대체한 가상의 개념\
수집대상(변수의 선언부, 함수 선언 전체)은 상단으로 끌어올리고 변수의 할당부는 원래 자리에 고정\
함수 선언문은 함수명으로 선언한 변수에 함수를 할당함\
[예제코드](https://github.com/Hyerim926/Javascript-study/blob/main/02_%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/hoisting.js)
> 함수 선언문과 함수 표현식

함수를 새롭게 정의할 때 쓰이는 방식
1. 함수 선언문
- function 정의부만 존재, 별도 할당 명령 x.
- 반드시 함수명이 정의되어 있어야함
- 전체를 호이스팅함
```javascript
function sum(a, b) {
    return a + b;
}
```
2. 함수 표현식
- 정의한 function을 별도의 변수에 할당.
- 함수명이 반드시 필요하지 x.
- 변수 선언부만 호이스팅 -> 함수도 하나의 값으로 취급함(선언문과 표현식의 차이)
```javascript
var multiply = function (a, b) {
    return a * b;
}
```
cf. `기명 함수 표현식` 함수명을 정의한 함수 표현식. 외부에서는 함수명으로 바로 함수 호출 불가능. 오직 함수 내부에서만 호출 가능.\
         `익명 함수 표현식` 정의하지 않은 것 - 일반적인 함수 표현식
```javascript
// 함수를 정의하는 세 가지 방식
function a() { /* .. */ } // 함수 선언문. 함수명 a가 곧 변수명
a(); // 실행됨

var b = function () { /* .. */ } // (익명) 함수 표현식. 변수명 b가 곧 함수명
b(); // 실행됨

var c = function d() { /* .. */ } // 기명 함수 표현식. 변수명은 c, 함수명은 d
c(); // 실행됨
d(); // 에러 - c함수 내부에서는 작동함
```
[호이스팅된 함수 선언문과 함수 표현식](https://github.com/Hyerim926/Javascript-study/blob/main/02_%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/hoistingFunction.js) \
함수 선언문은 코드가 길어지고 협업하는 경우, 중복 선언 시 디버깅이 어려워 상대적으로 안전한 함수 표현식을 사용하자.\
전역공간에 함수를 선언하거나 동명의 함수를 중복 선언하는 경우는 없어야 함. 만약, 전역공간에 동명함수가 여럿 존재하는 상황에 모든 함수가 `함수 표현식`으로 정의된다면 이런 상황을 방지할 수 있음.

> 스코프, 스코프 체인, outerEnvironmentReference
1. 스코프
식별자에 대한 유효범위. A의 외부에서 선언한 변수는 A의 내,외부에서 접근 가능. A의 내부에서 선언한 변수는 오직 A의 내부에서만 접근 가능\
cf. ES6에서는 `함수 스코프` `블록 스코프`로 구분됨
2. 스코프 체인
- 식별자의 유효범위(스코프)를 안에서부터 바깥으로 차례로 검색해나가는 것 -> `outerEnvironmentReference`의 역할\
- `outerEnvironmentReference`는 현재 호출된 함수가 선언될 당시의 `LexicalEnvironment`를 참조함
- 예제
```javascript
function A() {
    function B() { // outerEnvironmentReference는 A의 LexicalEnvironment 참조
        function c() {} // outerEnvironmentReference는 B의 LexicalEnvironment 참조
    }
}
```
-> `outerEnvironmentReference`는 연결리스트(Linked List)의 형태를 띔. '선언시점의 LexicalEnvironment' 를 계속 찾아 올라가면 마지막엔 전역 컨텍스트의 LexicalEnvironment가 있을 것.\
       또한, 각 outerEnvironmentReference는 오직 자신이 선언된 시점의 LexicalEnvironment만 참조하고 있으므로 가장 가까운 요소부터 차례대로만 접근할 수 있고, 다른 순서로 접근하는 것은 불가능\
       따라서, 여러 스코프에서 동일한 식별자를 선언한 경우, 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능함.\
       [예제코드](https://github.com/Hyerim926/Javascript-study/blob/main/02_%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/scopeChain.js)
- 변수 은닉화
    - 스코프 체인 상에 있는 변수라고 해서 무조건 접근 가능하지 않음
    - 전역공간의 a 변수와 inner 함수 내부의 a 변수는 다르고, inner 함수 내부에서는 전역공간의 a 변수에 접근 불가
> 전역변수와 지역변수
1. 전역변수
전역 공간에서 선언한 변수. 예제코드에서는 변수 a와 outer() 함수.\
cf. 함수 선언문과 함수 표현식에서 배웠던 함수 선언문의 약점 또한 선언문이 전역변수이기 때문. 전역변수 사용을 최소화하자.
2. 지역변수
함수 내부에서 선언한 변수. 예제코드에서는 outer() 내부에서 선언한 inner와 inner 함수 내부에서 선언한 변수 a
## ThisBinding
실행 컨텍스트의 thisBinding에는 this로 지정된 객체가 저장되며, 실행 컨텍스트 활성화 당시에 this가 지정되지 않은 경우 this에는 전역 객체가 저장됨. 그 밖에는 함수 호출 방법에 따라 this에 저장되는 대상 다름.