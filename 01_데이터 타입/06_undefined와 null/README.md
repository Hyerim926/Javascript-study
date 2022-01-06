# 불변객체
`undefined`와 `null`은 자바스크립트에서 `없음`을 나타내는 값. 그러나 두 값의 의미는 같은 듯 미세하게 다르고 사용 목적 또한 다름.
## undefined
1. 사용자가 명시적으로 지정하는 경우
2. 값이 존재하지 않을 때 자바스크립트 엔진이 자동으로 부여하는 경우[코드](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/06_undefined%EC%99%80%20null/autoUndefined.js)
- 자바스크립트 엔진은 사용자가 응당 어떤 값을 지정할 것이라고 예상되는 상황임에도 실제로는 그렇게 하지 않았을 때 `undefined` 반환
- 아래의 3가지 경우에 해당
    - 값을 대입하지 않은 변수, 즉 데이터 영역의 메모리 주소를 지정하지 않은 식별자에 접근할 때
    - 객체 내부의 존재하지 않는 프로퍼티에 접근하려할 때
    - return문이 없거나 호출되지 않는 함수의 실행 결과
- 배열의 경우에는 다르게 동작함[코드](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/06_undefined%EC%99%80%20null/arrayUndefined.js)
    - `비어있는 요소`와 `undefined를 할당한 요소`는 `[empty x 3]`과 `[undefined, undefined, undefined]`으로 출력 결과가 다름.
    - `비어있는 요소`는 순회와 관련된 많은 배열 메서드들의 순회 대상에서 제외됨[코드](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/06_undefined%EC%99%80%20null/emptyArray.js) -> 값이 지정되지 않는 인덱스는 `아직 존재하지 않는 프로퍼티`에 지나지 않음
  -> '비어있음'을 명시적으로 나타내고 싶을 때는 같은 의미를 가진 `null`을 사용하자. 그러면, `undefined`는 오직 값을 대입하지 않은 변수에 접근하고자 할 때 자바스크립트 엔진이 반환해주는 값으로서만 존재할 수 있음
     그러나, `null`은 `typeof null`이 `object`라는 자체 버그를 지닌다. 따라서 어떤 변수의 값이 null인지 여부를 판별하기 위해서는 typeof 대신 다른 방식으로 접근해야함[코드](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/06_undefined%EC%99%80%20null/undefinedNull.js)

