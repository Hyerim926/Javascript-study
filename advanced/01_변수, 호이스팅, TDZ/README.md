# 변수, 호이스팅, TDZ
1. 변수
- `let`
  - var로 가능한 경우 다 에러 뜸
- `const`
- `var` 
  - [코드]()
  - 한 번 선언된 변수 재선언 가능
  - 선언하기 전에 사용 가능 (호이스팅되기 때문, 물론 `let`과 `const` 모두 호이스팅 작동함)
2. 호이스팅
- 스코프 내부 어디서든 변수 선언은 최상위에 선언된 것처럼 행동
- 선언은 가능, 할당은 불가
3. TDZ(Temporal Dead Zone)
- `var`에서는 되는 호이스팅이 `let`과 `const`에서 안되는 이유
```javascript
console.log(name); // TDZ
const name = 'Mike'; // 함수 선언 및 할당
console.log(name); // 사용 가능
```
4. 변수의 생성과정
- 선언 단계
- 초기화 단계
- 할당 단계
  - `var` 1. 선언 및 초기화 단계 2. 할당 단계
  - `let` 1. 선언 단계 2. 초기화 단계 3. 할당 단계
  - `const` 1. 선언 + 초기화 + 할당
5. 스코프
- var: 함수 스코프(function-scoped)
- let, const: 블록 스코프(block-scoped), 함수, if문, for문, while문, try/catch문 등 선언된 함수 블록 내에서만 접근 가능