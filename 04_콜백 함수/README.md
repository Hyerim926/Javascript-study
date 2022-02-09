# 콜백 함수

다른 코드의 인자로 넘겨주는 함수. 다른 코드(함수 또는 메서드)에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수

### 제어권

1. 호출 시점

```javascript
var count = 0;
var timer = setInterval(function () { // 호출 시 익명함수와 300이라는 숫자 매개변수로 전달
    console.log(count);
    if (++count > 4) clearInterval(timer);
}, 300);

var count = 0;
var cbFunc = function () {
    console.log(count);
    if (++count > 4) clearInterval(timer);
};
var timer = setInterval(cbFunc, 300);
// 실행 결과
// 0 (0.3초)
// 1 (0.6초)
// 2 (0.9초)
// 3 (1.2초)
// 4 (1.5초)
```

- `cbFunc();`
    - 호출 주체: 사용자
    - 제어권: 사용자
- `setInterval(cbFunc, 300);`
    - 호출 주체: setInterval
    - 제어권: setInterval

2. 인자

```javascript
var newArr = [10, 20, 30].map(function (currentValue, index) {
    console.log(currentValue, index);
    return currentValue + 5;
});
console.log(newArr);
// 실행 결과
// 10 0
// 20 1
// 30 2
// [15, 25, 35]
```

- `map`메서드는 첫 번째 인자로 callback 함수를 받고, 생략 가능한 두 번째 인자로 콜백함수 내부에서 this로 인식할 대상을 특정 가능함
- 콜백함수의 첫 번째 인자에는 배열의 요소 중 현재값, 두 번째 인자에는 현재값의 인덱스, 세 번째 인자에는 map 메서드의 대상이 되는 배열 자체가 담김
- 콜백함수의 첫 번재 인자에 `index` 두 번째 인자에 `currentValue`가 온다면?

```javascript
var newArr = [10, 20, 30].map(function (index, currentValue) {
    console.log(index, currentValue);
    return currentValue + 5;
});
console.log(newArr);
// 실행 결과
// 10 0
// 20 1
// 30 2
// [5, 6, 7] 인덱스에 5씩 더해짐
```

- 콜백함수를 호출할 때는 인자값의 순서대로 넣어주자.
    - 콜백 함수의 제어권을 넘겨받은 코든느 콜백 함수 호출 시 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권을 가지기 때문

3. this

- 콜백 함수도 함수이기 때문에 기본적으로는 this가 전역 객체를 참조하지만, 제어권을 넘겨받을 코드에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조함

```javascript
Array.prototype.map = function (callback, thisArg) {
    var mappedArr = [];
    for (var i = 0; i < this.length; i++) {
        var mappedValue = callback.call(thisArg || window, this[i], i, this);
        mappedArr[i] = mappedValue;
    }
    return mappedArr;
};
```

- this에는 `thisArg`값이 있을 경우 그 값을, 없을 경우 전역객체 지정
- 제어권을 넘겨받을 코드에서 `call/apply` 메서드의 첫 번째 인자에 콜백 함수 내부에서의 this가 될 대상을 명시적으로 바인딩하기 때문에 this에 다른 값이 담김
- [코드](https://github.com/Hyerim926/Javascript-study/blob/main/03_this/thisCallbackFn.js) 에서 `addEventListener`메서드에서
  this가 HTML 엘리먼트를 가리키게 되는 이유는 `addEventListenr`메서드 내부에서 콜백 함수(click)를 호출할 때 call 메서드의 첫 번째 인자에 `addEventListener`메서드의
  this를 그대로 넘기도록 정의되어있기 때문임

### 콜백 함수는 함수

콜백함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 `함수`로서 호출됨

```javascript
var obj = {
    vals: [1, 2, 3],
    logValues: function (v, i) { // 메서드로 정의
        console.log(this, v, i);
    }
};

// 메서드로 호출 - this -> obj, 인자로 넘어온 1, 2 출력
obj.logValues(1, 2); // { vals: [1, 2, 3], logValues: f} 1, 2

// forEach 함수의 콜백 함수로서 전달 - obj를 this로 하는 메서드를 그대로 전달한 것이 아닌, obj.logValues가 가리키는 함수만 전달한 것
[4, 5, 6].forEach(obj.logValues); // Windows{...} 4 0 Windows{...} 5 1 Windows{...} 6 2
```

### 콜백 함수 내부의 this에 다른 값 바인딩하기

별도의 인자로 this를 받는 함수의 경우에는 여기에 원하는 값을 넘겨주면 되지만, 그렇지 않은 경우에는 this의 제어권도 넘겨주게 되므로 사용자가 임의로 값을 바꿀 수 없게됨. 그렇다면, 콜백함수 내부에서
this가 객체를 바라보게 하기 위해서는 어떻게 해야할까?

1. 전통적인 방법

```javascript
var obj1 = {
    name: 'obj1',
    func: function () {
        var self = this;
        return function () {
            console.log(self.name);
        };
    },
}

var callback = obj1.func();
setTimeout(callback, 1000); // obj1을 1초 뒤 출력 
```

2. 콜백 함수 내부에서 this를 쓰지 않는 경우 - 코드 재사용이 어렵

```javascript
var obj1 = {
    name: 'obj1',
    func: function () {
        console.log(obj1.name);
    }
};

setTimeout(obj1.func, 1000);
```

3. func 함수 재활용

```javascript
var obj1 = {
    name: 'obj1',
    func: function () {
        console.log(obj1.name);
    }
};

setTimeout(obj1.func, 1000); // obj1이 1초 후 실행

var obj2 = {
    name: 'obj2',
    func: obj1.func() // obj2.func()에 obj1 복사
};

var callbakc2 = obj2.func();
setTimeout(callbakc2, 1500); // obj2이 1.5초 이후 실행

var obj3 = {name: 'obj3'};
var callback3 = obj1.func.call(obj3); // obj1.func()를 obj3에 바인딩(this는 obj3)
setTimeout(callback3, 2000); // obj3이 2초 후 실행
```

4. bind 메서드 활용

```javascript
var obj1 = {
    name: 'obj1',
    func: function () {
        console.log(this.name);
    }
};

setTimeout(obj1.func.bind(obj1), 1000);

var obj2 = {name: 'obj2'};
setTimeout(obj1.func.bind(obj2), 1500);

```

### 콜백 지옥

1. 동기적 코드

- 현재 실행 중인 코드가 완료된 후에 다음 코드를 실행함
- CPU의 계산에 의해 즉시 처리가 가능함

2. 비동기적 코드

- 현재 실행 중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어감
- `setTimeout` 사용자의 요청에 의해 특정 시간이 경과되기 전까지 어떤 함수의 실행 보류
- `addEventListener` 사용자의 직접적인 개입이 있을 때 비로소 어떤 함수 실행 보류
- `XMLHttpRequest` 웹브라우저 자체가 아닌 별도의 대상에 무언가를 요청하고 그에 대한 응답이 왔을 때 비로소 어떤 함수를 실행하도록 대기
- 웹의 복잡도가 높아지면서 비동기적인 코드의 비중이 높아졌고, 그에 따라 콜백 지옥에 빠지기도 쉬워짐

3. 콜백 지옥
- 들여쓰기 수준이 과도하게 깊어짐
- 값이 전달되는 순서가 `아래에서 위로` 향하고 있어 어색하게 느껴짐
```javascript
setTimeout(function (name) {
    let coffeList = name;
    console.log(coffeList); // 에스프레소

    setTimeout(function (name) {
        coffeList += ', ' + name;
        console.log(coffeList); // 에스프레소, 아메리카노

        setTimeout(function (name) {
            coffeList += ', ' + name;
            console.log(coffeList); // 에스프레소, 아메리카노, 카페모카

            setTimeout(function (name) {
                coffeList += ', ' + name;
                console.log(coffeList); // 에스프레소, 아메리카노, 카페모카, 카페라떼
            }, 500, '카페라떼');
        }, 500, '카페모카');
    }, 500, '아메리카노');
}, 500, '에스프레소');
```
3-1. 해결 - 기명 함수로 변환
- 코드의 가독성 높임
- 함수 선언과 함수 호출만 구분할 수 있다면 `위에서 아래서부터` 아래로 순서대로 읽어내려가는데 어려움 없음
```javascript
let coffeeList = '';

const addEspresso = function (name) {
  coffeeList = name;
  console.log(coffeeList); // "에스프레소"
  setTimeout(addAmericano, 500, '아메리카노');
};

const addAmericano = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList); // "에스프레소, 아메리카노"
  setTimeout(addMocha, 500, '카페모카');
};

const addMocha = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList); // "에스프레소, 아메리카노, 카페모카"
  setTimeout(addLatte, 500, '카페라떼');
};

const addLatte = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList); // "에스프레소, 아메리카노, 카페모카, 카페라떼"
};

setTimeout(addEspresso, 500, '에스프레소');
```
3-2. 해결 - 비동기 작업의 동기적 표현
- `ES6`에서 `Promise` `Generator` 등이 도입
- `ES8`에서 `async / await` 이 도입\
[Promise(1)](https://github.com/Hyerim926/Javascript-study/blob/main/04_%EC%BD%9C%EB%B0%B1%20%ED%95%A8%EC%88%98/promise1.js)
- `new` 연산자와 함께 호출한 `Promise`의 인자로 넘겨주는 콜백 함수는 호출할 때 바로 실행
- 함수 내부에 `resolve` 또는 `reject`함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행되기 전까지는 `then` 또는 `catch`로 넘어가지 않음\
[Promise(2)](https://github.com/Hyerim926/Javascript-study/blob/main/04_%EC%BD%9C%EB%B0%B1%20%ED%95%A8%EC%88%98/promise2.js)
- 반복적인 내용을 함수화하여 더욱 짧게 표현\
[Generator](https://github.com/Hyerim926/Javascript-study/blob/main/04_%EC%BD%9C%EB%B0%B1%20%ED%95%A8%EC%88%98/generator.js)
- ES6의 Generator 이용
- `*`가 붙은 함수가 `Generator`
- 함수 실행 시 Iterator 반환되고 Iterator는 next라는 메서드를 가지고 있음
- `next` 메서드를 호출하면 Generator 함수 내부에서 가장 먼저 등장하는 `yield`에서 함수의 실행을 멈춤. 이후 `next`도 마찬가지로 계속 진행
- 비동기 작업이 완료되는 시점마다 `next` 메서드를 호출하면 `Generator` 함수 내부의 소스가 `위에서부터 아래로` 순차적으로 진행됨\
[Promise + Async/Await](https://github.com/Hyerim926/Javascript-study/blob/main/04_%EC%BD%9C%EB%B0%B1%20%ED%95%A8%EC%88%98/asyncAwait.js)
- 비동기 작업을 수행하고자 하는 함수 앞에 `async` 표기, 함수 내부에서 실질적인 비동기 작업이 필요한 위치마다 `await` 표기
- `await` 뒤의 내용이 Promise로 자동 전환, 해당 내용이 `resolve`된 이후에야 다음으로 진행