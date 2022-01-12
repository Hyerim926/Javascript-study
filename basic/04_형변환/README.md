# 형변환
prompt로 입력받은 값은 문자형 -> 연산 시 값이 다르게 나옴\
자동 형변환 : 문자형끼리 곱셉이나 나눗셈을 할 경우에는 제대로 연산이 됨\
명시적 형변환 : 자동 형변환으로 이루어지지 않게 의도적으로 형변환 해주는 방법. 아래의 방법들이 변환 방법임.
### String()
문자형으로 변환
````javascript
console.log(
    String(3),
    String(true),
    String(false),
    String(null),
    String(undefined)
); // "3", "true", "false", "null", "undefined"
````
### Number()
숫자형으로 변환
```javascript
console.log(
    Number("1234")
); // 1234
console.log(Number(true), Number(false)); // 1 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
console.log(Number(0)); // false
console.log(Number('0')); // true
console.log(Number('')); // false
console.log(Number(' ')); // true
```
### Boolean() 
불린형으로 변환\
> false

- 숫자 0
- 빈 문자열 ''
- null
- undefined
- NaN\
이외의 것들은 모두 true 반환