# 비교 연산자, 조건문

반환 타입은 `Boolean`타입

동등 연산자

- `==` 값만 비교

```javascript
const a = 1;
const b = "1";

console.log(a == b); // true
```

- `===` 타입까지 비교

```javascript
const a = 1;
const b = "1";

console.log(a === b); // false
```

# 조건문
if / else / else if문

```javascript
const age = 30;

if (age > 19) {
    console.log('환영합니다.');
} else if (age === 19) {
    console.log('수능 잘 치세요.');
} else
    console.log('안녕히 가세요.');
```