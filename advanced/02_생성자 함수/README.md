# 생성자 함수
1. 객체 리터럴
```javascript
let user = {
    name: 'Mike',
    age: 30,
}
```
2. 생성자 함수
- 여러 객체가 필요할 때 사용함
- 함수의 첫 글자를 대문자로 명명함
- `new` 연산자를 사용해 함수 호출, `new`를 붙이지 않으면 `undefined` 뱉음
```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
        console.log(this.name);
    };
}

let user1 = new User('Mike', 30);
let user2 = new User('Jane', 22);
let user3 = new User('Tom', 17);

let user5 = new User('Han', 40);
user5.sayName(); // Han

// 작동 원리
function User(name, age) {
    this = {};

    this.name = name;
    this.age = age;
    
    return this;
}

new 함수명();
```