# 객체 Object

- 선언, 접근, 추가, 삭제

```javascript
// 선언
const superman = {
    name: 'clark',
    age: 30
}

// 접근
superman.name // 'clark'
superman.age // 30

// 추가
superman.gender = 'male';
superman['hairColor'] = 'black';

// 삭제
delete superman.hairColor;
```

- 단축 프로퍼티

```javascript
const name = 'clark';
const age = 30;

const superman = {
    name, // name: name,
    age, // age: age,
    gender: 'male',
}
```

- 프로퍼티 존재 여부 확인
    - `in`연산자 사용하면 `Boolean`값으로 존재 여부 확인 가능

```javascript
const superman = {
    name: 'clark',
    age: 30,
}

superman.birthDay; // undefined, 에러 발생 x
'birthDay' in superman; // false
'age' in superman; // true
```

- `for ... in` 반복문
    - 객체를 순회하며 값을 얻을 수 있음
    ```javascript
    for (let key in superman){
        console.log(key)
        console.log(superman[key])
    }
  ```
- 종합 예제
```javascript
function isAdult(user) {
  if (!('age' in user) || user.age < 20) {
    return false;
  }
  return true;
}

const Mike = {
  name: 'Mike',
  age: 30
}

const Jane = {
  name: 'Jane'
}

console.log(isAdult(Jane)); 
// if문 조건에 !('age' in user) 조건도 넣어줘야 이 경우에 false를 반환함
// 그렇지 않으며 Jane의 age값이 undefined로 인식돼 true를 반환하게됨
```
