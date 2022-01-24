# 콜백 함수
다른 코드의 인자로 넘겨주는 함수. 다른 코드(함수 또는 메서드)에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수
### 제어권
1. 호출 시점
```javascript
var count = 0;
var timer = setInterval(function () { // 호출 시 익명함수와 300이라는 숫자 매개변수로 전달
    console.log(count);
    if(++count > 4) clearInterval(timer);
}, 300);

var count = 0;
var cbFunc = function () {
    console.log(count);
    if(++count > 4) clearInterval(timer);
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
- [코드](https://github.com/Hyerim926/Javascript-study/blob/main/03_this/thisCallbackFn.js) 에서 `addEventListener`메서드에서 this가 HTML 엘리먼트를 가리키게 되는 이유는 `addEventListenr`메서드 내부에서 콜백 함수(click)를 호출할 때 call 메서드의 첫 번째 인자에 `addEventListener`메서드의 this를 그대로 넘기도록 정의되어있기 때문임