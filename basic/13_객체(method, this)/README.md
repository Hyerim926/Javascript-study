# 객체(Object) - method, this
### method
객체 프로퍼티로 할당된 함수
```javascript
const superman = {
    name: 'clark',
    age: 33,
    fly: function () {
        console.log('날아갑니다.')
    }
}

// 위와 동일한 코드
const superman = {
    name: 'clark',
    age: 33,
    fly () { // 줄여쓰기 가능
        console.log('날아갑니다.')
    }
}

superman.fly(); // 날아갑니다
```
### this
객체와 메서드와의 관계
- 일반 함수
```javascript
const user = {
    name: 'Mike',
    sayHello: function () {
        console.log(`Hello, I'm ${this.name}`);
    },
}

user.sayHello(); // Hello, I'm Mike
```
  - 화살표 함수: 일반 함수와는 달리 자신만의 `this`를 가지지 않음. 화살표 내부에서 this를 사용하면 그 this는 _외부에서 값을 가져옴_ (전역객체)
```javascript
const user = {
  name: 'Mike',
  sayHello: () => {
    console.log(this);
  },
}

user.sayHello(); // Window
```
