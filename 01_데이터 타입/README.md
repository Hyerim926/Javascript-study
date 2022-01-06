# 01 데이터 타입
#### 학습목표 : 자바스크립트가 데이터를 처리하는 과정을 알아본다.
### [데이터 타입의 종류](https://github.com/Hyerim926/Javascript-study/tree/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85%EC%9D%98%20%EC%A2%85%EB%A5%98)
### [데이터 타입에 관한 배경지식](https://github.com/Hyerim926/Javascript-study/tree/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/02_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85%EC%97%90%20%EA%B4%80%ED%95%9C%20%EB%B0%B0%EA%B2%BD%EC%A7%80%EC%8B%9D)
### [변수 선언과 데이터 할당](https://github.com/Hyerim926/Javascript-study/tree/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/03_%EB%B3%80%EC%88%98%20%EC%84%A0%EC%96%B8%EA%B3%BC%20%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%95%A0%EB%8B%B9)
### [기본형 데이터와 참조형 데이터](https://github.com/Hyerim926/Javascript-study/tree/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/04_%EA%B8%B0%EB%B3%B8%ED%98%95%20%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%99%80%20%EC%B0%B8%EC%A1%B0%ED%98%95%20%EB%8D%B0%EC%9D%B4%ED%84%B0)
### [불변 객체](https://github.com/Hyerim926/Javascript-study/tree/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/05_%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4)
### [undefined와 null](https://github.com/Hyerim926/Javascript-study/tree/main/01_%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85/06_undefined%EC%99%80%20null)

> 정리
1. 자바스크립트의 데이터 타입 : 기본형(불변값) & 참조형(가변값)
2. 변수 : 변경 가능한 데이터가 담길 수 있는 공간    식별자 : 그 변수의 이름
3. 변수 선언 시
    - 메모리의 빈 공간에 식별자 저장 -> 그 공간에 자동으로 undefined 할당 -> 그 변수에 기본 데이터 할당시 별도 공간에 데이터 저장 후 그 공간의 주소를 변수의 값 영역에 할당
    - 참조형 데이터의 경우, 참조형 데이터 내부 프로퍼티들을 위한 변수 영역을 별도로 확보해 확보된 주소 변수에 연결 -> 앞서 확보한 변수 영역에 각 프로퍼티의 식별자 저장 -> 각 데이터를 별도 공간에 저장해 그 주소를 식별자들과 매칭
    - 할당 과정에서 기본형과 참조형 간 차이가 발생하는 이유 : 참조형 데이터는 여러 개의 프로퍼티(변수)를 모은 그룹이기 때문. -> 참조형 데이터 = 가변값
4. 얕은 복사와 깊은 복사
    - 참조형 데이터를 불변값으로 사용하고자 할 때 내부 프로퍼티들을 일일이 복사하는 깊은 복사를 하거나 관련 라이브러리를 사용함.
    - 불변 객체는 최근 js 진영에서 가장 중요한 개념 중 하나
5. null과 undefined
    - 두 값 모두 없음을 나타냄
    - null은 사용자가 명시적으로 '없음'을 표현하기 위해 대입한 값
    - undefined는 어떤 변수에 값이 존재하지 않을 경우를 의미 -> 본래 의미에 따라 사용자가 없음을 표현하기 위해 명시적으로 undefined 대입은 지양하자
