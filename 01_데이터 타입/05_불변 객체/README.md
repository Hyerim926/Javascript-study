# 불변 객체
## 불변 객체를 만드는 간단한 방법
### 불변객체가 필요한 상황
값으로 전달받은 객체에 변경을 가하더라도 원본 객체는 변하지 않아야하는 경우\
    -> [가변성으로 인한 문제점](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/05_%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4/problem.js) \
    -> [변경 전후 서로 다른 객체를 바라보게 만들기](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/05_%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4/solve.js) \
    -> [대상 객체의 프로퍼티 개수와 상관없이 모든 프로퍼티를 복사하는 함수 만들기](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/05_%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4/shallowCopy.js) why? 대상 객체에 정보가 많을수록, 변경이 필요한 정보가 많을수록 사용자 수고 증가
- `immutable.js` `baobab.js` 라이브러리\
개발자가 규칙을 따르지 않고서는 프로퍼티를 변경할 수 없게 시스템적으로 제약을 걸 수 있게 도와당
## 얕은 복사와 깊은 복사
`얕은 복사 shallow copy` 바로 아래 단계의 값만 복사하는 방법 -> 중첩된 객체에서 참조형 데이터가 저장된 프로퍼티 복사 시 그 주솟값만 복사한다는 의미. 이 경우, 해당 프로퍼티에 대해 원본과 사본이 모두 동일한 참조형 데이터의 주소를 가리키게 됨. 즉, 사본을 바꾸면 원본도 바뀌고, 원본을 바꾸면 사본도 바뀐다는 말. ~~허거덩!~~\
`깊은 복사 deep copy` 내부의 모든 값들을 하나하나 찾아서 전부 복사하는 방법

[중첩된 객체에 대한 얕은 복사](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/05_%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4/nestedObjectShallowCopy.js) 

- user 객체에 직접 속한 프로퍼티에 대해서는 복사해 완전히 새로운 데이터가 만들어진 반면, 한 단계 더 들어간 `urls`의 내부 프로퍼티들은 기존 데이터를 그대로 참조함

[중첩된 객체에 대한 깊은 복사](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/05_%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4/nestedObjectDeepCopy.js)
- 어떤 객체를 복사할 때 객체 내부의 모든 값을 복사해서 완전히 새로운 데이터를 만들고자 할 때, 객체의 프로퍼티 중 그 값이 `기본형 데이터`일 경우에는 그대로 복사하면 되지만, `참조형 데이터`는 다시 그 내부의 프로퍼티들을 복사해야함.

[copyObject()를 깊은 복사 방식으로 바꾸기](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/05_%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4/copyObjectDeep.js)
- `hasOwnProperty`메서드를 활용해 프로토타입 체이닝을 통해 상속된 프로퍼티를 복사하지 않게끔 할 수 있으나, ES5의 getter/setter를 복사하는 방법은 아쉽게도 ES6의 `Object.getOwnPropertyDescriptor` 또는 ES2017의 `Object.getOwnPropertyDescriptors`외에는 방법이 없음

[JSON을 활용한 간단한 깊은 복사](https://github.com/Hyerim926/Javascript-study/blob/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/05_%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4/jsonDeepCopy.js)


