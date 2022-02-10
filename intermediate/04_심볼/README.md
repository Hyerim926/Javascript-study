# 심볼(Symbol)
1. propery key: 문자형
```javascript
const obj = {
    1: '1입니다',
    false: '거짓'
}

Object.keys(obj); // ["1", "false"]

obj['1'] // "1입니다"
obj['false'] // "거짓"
```
2. Symbol
```javascript
const a = Symbol(); // new를 붙이지 않음
const b = Symbol();

console.log(a)
Symbol()

console.log(b)
Symbol()

a === b; //false
```
- 유일성 보장
- `Symbol('id')`식으로 설명을 붙여주면 디버깅이 편해짐
```javascript
const id = Symbol('id');
const id2 = Symbol('id');

// 로그 찍어보면 둘 다 Symbol(id)로 나옴 하지만, id와 id2는 다름
id === id2; // false
```
- Object 메서드들이 순회를 돌며 값을 찾을 때 Symbol형은 제외함
- `Symbol.for()` 전역 심볼
  - 하나의 심볼만 보장받음
  - 없으면 만들고, 있으면 가져오기 때문
  - Symbol 함수는 매번 다른 Symbol 값을 생성하지만, Symbol.for 메소드는 하나를 생성한 뒤 키를 통해 같은 Symbol을 공유
```javascript
const id1 = Symbol.for('id');
const id2 = Symbol.for('id');

id1 === id2 // true

// 이름(키 값)을 얻고 싶을 때
Symbol.keyFor(id1); // id

// 전역 심볼이 아닌 경우
const _id = Symbol('id 입니다');
id.description; // "id 입니다"
```
- 숨겨진 Symbol key 보는 법
```javascript
const id = Symbol('id');

const user = {
    name: 'Mike',
    age: 30,
    [id] : 'myid'
}

Object.getOwnPropertySymbols(user); // [Symbol(id)]
Reflect.ownKeys(user); // ["name", "age", Symbol(id)]
```
