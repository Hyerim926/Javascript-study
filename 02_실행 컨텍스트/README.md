# 실행 컨텍스트
## 실행 컨텍스트란?
실행할 코드에 제공할 환경 정보들을 모아놓은 객체. 자바스크립트의 동적 언어로서의 성격
### 그렇다면 자바스크립트만의 특이한 현상은?
- 호이스팅 (어떤 실행 컨텍스트가 활성화되는 시점에 선언된 변수를 위로 끌어올림)
- 외부 환경 정보 구성
- `this`값 설정
### 스택과 큐
`스택` 출입구가 하나 뿐, 깊은 우물같은 데이터 구조. (in) abcd -> (out) dcba
`큐` 양쪽이 모두 열려있음. 한 쪽은 입력, 한 쪽은 출력 담당 (in) abcd -> (out) abcd
### 작동 원리
동일한 환경에 있는 코드들을 실행할 때 필요한 환경 정보들을 모아 컨텍스트를 구성함. -> 이를 `콜 스택`에 쌓아올렸다가, 가장 상위에 있는 코드들을 실행함.
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
=> `1번` 전역 컨텍스트(파일이 열리는 순간 활성화)가 콜 스택에 담김
   `3번` outer() 컨텍스트 생성 후 콜 스택에 담음
   `2번` inner() 컨테스트 생성 후 outer() 컨텍스트 코드 실행 중단 및 inner() 실행
        inner() 내부에서 a 변수에 3 할당한 뒤 컨텍스트 종료
   `3번` 중단되었던 outer() 재진행
   `1번` outer()가 실행되어 a값 출력한 후에는 전역 컨텍스트도 제거됨
### 실행 컨텍스트에 담기는 정보
- VariableEnvironment : 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 선언 시점의 LexicalEnvironment의 스냅샷으로 변경사항은 반영 x
- LexicalEnvironment : 처음에는 VariableEnvironment와 같지만 변경 사항이 실시간으로 반영됨
- ThisBinding : this 식별자가 바라봐야 할 대상 객체
## VariableEnvironment
- `LexicalEnvironment`와 같지만 _최초 실행시 스냅샷 유지_. 실행 컨텍스트 생성 시 `variableEnvironment`에 정보를 담음. 이걸 그대로 복사해 `LexicalEnvironment`를 생성하고 이후 이를 주로 활용
- `VariableEnvironment`와 `LexicalEnvironment`의 내부는 `environmentRecord`와 `outer-EnvironmentReference`로 구성되어있음
## LexicalEnvironment
## ThisBinding