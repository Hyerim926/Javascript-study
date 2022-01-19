# this

## 함수와 객체를 구분하는 기능으로 사용

### 학습 목표

1. 상황별로 this가 어떻게 달라지는지
2. 왜 그렇게 되는지
3. 예상과 다른 대상을 바라보고 있을 때 그 원인을 효과적으로 추적하는 방법

### 상황에 따라 달라지는 this

`this` 실행 컨텍스트 생성 시 함께 결정. 즉, 함수를 어떤 방식으로 호출하느냐에 따라 값 변동

1. 전역공간에서의 `this`

- 전역 객체, 브라우저에서는 `window` Node.js에서는 `global`

  ```javascript
  // 전역 공간에서의 this(브라우저 환경)

console.log(this); console.log(window); console.log(this === window); // true

// 전역 공간에서의 this(Node.js 환경)
console.log(this); console.log(global); console.log(this === global); // true

  ```

- 전역공간의 특이한 성질
    - 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 `프로퍼티로 할당`함 (=변수이면서 객체의 프로퍼티)
  ```javascript
  var a = 1;
  console.log(a); // 1
  console.log(window.a); // 1
  console.log(this.a); // 1
  ```

    - 값이 모두 1로 동일한 이유 : 자바스크립트의 모든 변수는 특정 객체의 프로퍼티로서 동작하기 때문. 특정객체란 실행컨텍스트의 L.E인데 전역 컨텍스트의 경우 L.E는 전역객체를 그대로 참조함

  ```javascript
  var a = 1;
window.b = 2;
console.log(a, window.a, this.a); // 1 1 1
console.log(b, window.b, this.b); // 2 2 2

window.a = 3;
b = 4;
console.log(a, window.a, this.a); // 3 3 3
console.log(b, window.b, this.b); // 4 4 4
  ```

    - 전역변수 선언과 전역객체의 프로퍼티 할당 사이에 전혀 다른 경우도 존재, `삭제 명령 시`에 해당

  ```javascript
  // 전역변수로 선언한 경우
var a = 1;
delete window.a; // false
console.log(a, window.a, this.a); // 1 1 1

var b = 2;
delete b; // false
console.log(b, window.b, this.b); // 2 2 2

// 처음부터 전역객체의 프로퍼티로 할당한 경우
window.c = 3;
delete window.c; // true
console.log(c, window.c, this.c); // Uncaught ReferenceError: c is not defined

window.d = 4;
delete d; // true
console.log(d, window.d, this.d); // Uncaught ReferenceError: d is not defined
  ```

    - 전역변수로 선언한 경우에는 `delete`명령 안먹힘. 반면, 전역객체의 프로퍼티로 할당한 경우에는 `delete`명령 먹힘\
      전역객체의 프로퍼티로 할당한느 경우 자동으로 해당 프로퍼티의 `configurable`속성(변경 및 삭제 가능성)을 `false`로 정의함.\
      -> `var로 선언한 전역변수`와 `전역객체의 프로퍼티`는 호이스팅 여부 및 configurable 여부에서 차이 존재

2. 메서드로서 호출할 때 그 메서드 내부에서의 this

- 함수 실행 방법에서의 함수와 메서드 차이 : `독립성` 함수는 그 자체로 독립적인 기능 수행, 메서드는 자신을 호출한 대상 객체에 관한 동작 수행
  ```javascript
  var func = function(x){ // 익명함수 할당
    console.log(this, x);
  };
  func(1); // 함수로서 호출, 전역객체 window 출력 Window {...} 1 
  
  var obj = {
    method: func
  };
  
  obj.method(2); // 메서드로서 호출(객체 뒤 .으로 메서드 호출), { method: f } 2
  ```
    - 메서드로서 호출 - 점 표기법, 대괄호 표기법 (이외에는 모두 함수 호출법)
  ```javascript
  var obj = {
    method: function (x) {console.log(this, x);}
  };
  obj.method(1); // { method: f } 1
  obj['method'](2); // { method: f } 2
  ```
    - 메서드 내부에서의 this [코드](https://github.com/Hyerim926/Javascript-study/blob/main/03_this/thisMethod.js)
        - this에는 호출한 주체에 대한 정보 담기며, 어떤 함수를 메서드로서 호출하는 경우 호출 주체는 바로 함수명(프로퍼티명)앞의 객체.\
          점 표기법의 경우 `마지막 점 앞에 명시된 객체`가 `this`

3. 함수로서 호출할 때 그 함수 내부에서의 this

- 함수 내부에서의 this
    - 어떤 함수를 함수로서 호출할 경우에 this 지정 안함. 그래서, 함수에서의 this는 여전히 전역객체이며 이는 명백한 설계상의 오류임.
- 메서드 내부함수에서의 this

```javascript
var obj1 = {
    outer: function () {
        console.log(this); // (1) obj1
        var innerFunc = function () {
            console.log(this); // (2) 전역객체(Window) (3) obj2
        }
        innerFunc();

        var obj2 = {
            innerMethod: innerFunc
        };
        obj2.innerMethod();
    }
}
```

- (2)에서 전역객체가 바인딩된 이유는 innerFunc()를 함수로서 호출했기 때문
- (3)에서 obj2가 바인딩된 이유는 `.innerMethod()` 메서드로서 호출했기 때문
- 메서드 내부 함수에서의 this를 우회하는 방법 `변수 활용하기`
    - 호출 주체가 없을 때는 자동으로 전역객체를 바인딩하지 않고 호출 당시 주변 환경의 this를 그대로 상속받아 써보기
    ```javascript
    var obj = {
        outer: function() {
            console.log(this); // (1) { outer: f }
            var innerFunc = function () {
                console.log(this); // (2) Window { ... }
            };
            innerFunc();

            var self = this; // 상위 스코프의 this를 저장해서 내부함수에서 활용함
            var innerFunc2 = function () {
                console.log(self); // (3) { outer: f }
            };
            innerFunc2();
        }
    };
    obj.outer();
    ```
- this를 바인딩하지 않는 함수
    - ES6에서 함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자, this를 바인딩하지 않는 `화살표 함수`를 새로 도입함.
    - `화살표함수` 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 활용 가능 -> 위의 우회법 불필요
    ```javascript
    var obj = {
        outer: function () {
            console.log(this); // { outer: f }
            var innerFunc = () => {
                console.log(this); // { outer: f }
            };
        innerFunc();
        }
    };
    obj.outer();
    ```
    - 함수로서 호출된 `innerFunc()`에서 this가 `outer`로 바인딩된 것을 확인 가능
    - 이외에도 `call` `apply` 등의 메서드를 활용해 함수를 호출할 때 명식적으로 this를 지정하는 방법 존재

4. 콜백 함수 호출 시 그 함수 내부에서의 this\
   `콜백 함수` 함수 A의 제어권을 다른 함수(또는 메서드) B에게 넘겨주는 경우에서 함수 A.\
   함수 A는 함수 B의 내부 로직에 따라 실행되며, this 역시 함수 B 내부 로직에서 정한 규칙에 따라 결정됨.\
   콜백함수도 함수이기 때문에 기본적으로 this가 전역객체를 참조, 제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조함\
   [코드](https://github.com/Hyerim926/Javascript-study/blob/main/03_this/thisCallbackFn.js)
5. 생성자 함수 내부에서의 this
   `생성자 함수` 어떤 공통된 성질을 지니는 객체들을 생성하는 데 사용하는 함수
   `생성자` 구체적인 인스턴스를 만들기 위한 일종의 틀. 해당 클래스의 공통 속성들이 미리 준비돼있고, 여기에 구체적인 인스턴스의 개성을 더해 개별 인스턴스를 만듦

- `new` 명령어와 함께 함수를 호출하면 해당 함수가 생성자로 동작함.
- 생성자 함수로 호출된 경우 내부에서의 `this`는 곧 새로 만들 구체적인 인스턴스 자신이 됨

```javascript
var Cat = function (name, age) {
    this.bark = '야옹';
    this.name = name;
    this.age = age;
};
var choco = new Cat('초코', 7); // this = choco 인스턴스
var nabi = new Cat('나비', 5); // this = nabi 인스턴스
console.log(choco, nabi);

/*결과
* Cat { bark: '야옹', name: '초코', age: 7 }
* Cat { bark: '야옹', name: '나비', age: 5 }
* */
```

### 명시적으로 this를 바인딩하는 방법

this에 별도의 대상을 바인딩하는 방법

1. call 메서드

- 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령
- call 메서드의 `첫 번째 인자`를 `this`로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 함
- 함수를 그냥 실행하면 this는 전역객체를 참조하지만, `call 메서드`를 이용하면 임의의 객체를 this로 지정 가능함
- 메서드도 마찬가지로 객체의 메서드를 그냥 호출하면 this는 객체 참조하지만 `call 메서드`를 이용하면 임의의 객체를 this로 지정함

```javascript
// 함수
var func = function (a, b, c) {
    console.log(this, a, b, c);
};

func(1, 2, 3); // Window{...} 1 2 3 전역객체
func.call({x: 1}, 4, 5, 6); // {x:1} 4 5 6 call로 호출

// 메서드
var obj = {
    a: 1,
    method: function (x, y) {
        console.log(this.a, x, y);
    }
};

obj.method(2, 3); // 1 2 3
obj.method.call({a: 4}, 5, 6); // 4 5 6
```

2. apply 메서드

- call 메서드와 기능적으로 완전히 동일
- `두번째 인자`를 `배열`로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정함

```javascript
var func = function (a, b, c) {
    console.log(this, a, b, c);
};
func.apply({x: 1}, [4, 5, 6]); // { x: 1 } 4 5 6

var obj = {
    a: 1,
    method: function (x, y) {
        console.log(this.a, x, y);
    },
};
obj.method.apply({a: 4}, [5, 6]); // 4 5 6
```