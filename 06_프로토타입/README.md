# 프로토타입

- 자바스크립트는 프로토타입 기반 언어
- 클래스 기반 언어에서는 `상속` 을 사용하지만, 프로토타입 기반 언어에서는 어떤 객체를 `원형` 으로 삼고 이를 복제(참조)함으로써 상속과 비슷한 효과를 냄

# 1. 프로토타입의 개념 이해

## 6-1-1 constructor, prototype, instance

- 어떤 생성자 함수 `constructor` 를 `new` 연산자와 함께 호출하면
- Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스가 생성됨
- 이때 인스턴스에는 `__proto__` 라는 프로퍼티가 자동으로 부여되는데,
- 이 프로퍼티는 Constructor의 prototype이라는 프로퍼티를 참조함

```jsx
var instance = new Constructor();
```

- `prototype` 과 `__proto__` 는 모두 객체고 `__proto__` 를 통해 `prototype` 객체 내부의 메서드들에 접근할 수 있게 됨
- 참고

  ES5.1 명세에는 `__proto__` 가 아니라 `[[prototype]]` 이라는 명칭으로 정의되어 있으며 실무에서는 잘 사용하지 않는다. 대신, `Object.getPrototypeOf()` 혹은 `Object.create()` 등을 이용하자.


```jsx
var Person = function(name) {
	this._name = name;
};
Person.prototype.getName = function() {
	return this._name;
};

var suzi = new Person('Suzi');
suzi.__proto__.getName(); //undefined

Person.prototype === suzi.__proto__; // true
```

- getName() 함수를 호출했을 때 undefined가 나온 점을 주목. 어떤 변수를 실행해 undefined가 나왔다는 것은 이 변수가 ‘호출할 수 있는 함수'에 해당하는 것을 의미함. 단순히 ‘Suzi’ 라는 값이 나오지 않았다고 해서 함수가 아니라는 것이 아님. 따라서, getName()은 함수임.
- 함수 내부의 반환값이 ‘Suzi’ 가 아닌 이유는 this에 바인딩된 대상이 잘못 지정되었기 때문

```jsx
// 만약, __proto__ 객체에 name 프로퍼티가 있다면?
var suzi = new Person('Suzi');
suzi.__proto__._name = 'SUZI__proto__';
suzi.__proto__.getName(); //SUZI__proto__
```

- this를 인스턴스로 사용하기 - `__proto__` 없이 인스턴스에서 곧바로 메서드 쓰기 why? 생략가능한 프로퍼티이기 때문

```jsx
var suzi = new Person('Suzi', 28);
suzi.getName(); // Suzi

var iu = new Person('Jieun', 28);
iu.getName(); // Jieun
```

## 6-1-2. constructor 프로퍼티

- 생성자 함수의 프로퍼티인 Prototype 내부에는 constructor라는 프로퍼티가 있음.
- 인스턴스의 `__proto__` 객체도 마찬가지.
- 원래의 생성자 함수(자기 자신)을 참조하는데, 인스턴스로부터 그 원형을 알 수 있는 수단이기 때문

```jsx
let arr = [1, 2];
Array.prototype.constructor == Array // true
arr.__proto__.constructor == Array // true
arr.constructor == Array // true

let arr2 = new arr.constructor(3, 4);
console.log(arr2); // [3, 4]
```

- constructor는 읽기 전용 속성이 부여된 예외적인 경우를 제외하고는 값을 바꿀 수 있다.
    - 읽기 전용 속성: 기본형 리터럴 변수 `number` `string` `boolean`

```jsx
let NewConstructor = function() {
  console.log('this is new constructor!');
};
let dataTypes = [
  1, // Number & false
  'test', // String & false
  true, // Boolean & false
  {}, // NewConstructor & false
  [], // NewConstructor & false
  function () {}, // NewConstructor & false
  /test/, // NewConstructor & false
  new Number(), // NewConstructor & false
  new String(), // NewConstructor & false
  new Boolean, // NewConstructor & false
  new Object(), // NewConstructor & false
  new Array(), // NewConstructor & false
  new Function(), // NewConstructor & false
  new RegExp(), // NewConstructor & false
  new Date(), // NewConstructor & false
  new Error() // NewConstructor & false
];

dataTypes.forEach(function(d) {
  d.constructor = NewConstructor;
  console.log(d.constructor.name, '&', d instanceof NewConstructor);
});
```

⇒ 모든 데이터가 `d instanceof NewConstructor` 명령어에 대해 `false`를 반환하는데, constructor를 변경하더라도 참조하는 대상이 변경될 뿐 이미 만들어진 인스턴스의 원형이 바뀐다거나 데이터 타입이 변하는 것은 아님을 알 수 있음. 따라서, 어떤 인스턴스의 생성자 정보를 알아내기 위해 constructor 프로퍼티에 의존하는 것이 항상 안전하지는 않다는 것을 알 수 있음

- 다음은 모두 동일한 대상을 가르킴

```jsx
[Constructor]
[instance].__proto__.constructor
[instance].constructor
Object.getPrototypeOf([instance]).constructor
[Constructor].prototype.constructor
```

- 다음은 모두 동일한 객체에 접근이 가능함

```jsx
[constructor].prototype
[instance].__proto__
[instance]
Object.getPrototypeOf([instance])
```