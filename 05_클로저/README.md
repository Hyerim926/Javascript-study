# 클로저

# 01 클로저의 의미 및 원리 이해

> 클로저는 함수와 그 함수가 선언될 당시의 lexical environment의 상호관계에 따른 현상 -MDN
>

내부함수에서 외부 변수를 참조하는 경우에 한해서만 즉, 선언될 당시의 LexicalEnvironment와의 상호관계가 의미가 있음

어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상

```jsx
var outer = function(){
	var a = 1;
	var inner = function() {
		console.log(++a);
	};
	inner();
};

outer();
```

```jsx
var outer= function() {
	var a = 1;
	var inner = function() {
		return ++a;
	};
	return inner(); // inner()는 함수를 실행시켜서 반환함
};

var outer2 = outer();
console.log(outer2); //2
```

```jsx
var outer= function() {
	var a = 1;
	var inner = function() {
		return ++a;
	};
	return inner; // inner는 함수 자체를 반환함
};

var outer2 = outer();

console.log(outer2); //2
console.log(outer2); //3
```

- 가비지 컬렉터의 수집 대상에서 제외되는 경우는 바로 위의 경우와 같이 지역변수를 참조하는 내부함수가 외부로 전달된 경우가 유일함
- 즉, 어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상이란 외부 함수의 LexicalEnvironment가 가비지 컬렉팅되지 않는 현상을 말함

## 클로저란

어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상
그러나 `return` 만이 `외부로 전달` 하는 것은 아님

```jsx
// setInterval/setTimeout
(function () {
	var a = 0;
	var intervalId = null;
	var inner = function() {
		if(++a >= 10) {
			clearInterval(intervalId);
		}
		console.log(a);
	};
	intervalId = setInterval(inner, 1000);
})();

// eventListener
(function () {
	var count = 0;
	var button = document.createElement('button');
	button.innerText = 'click';
	button.addEventListener('click', function () {
		console.log(++count, 'times clicked');
	});
	document.body.appendChild(button);
})(); 
```

# 02 클로저와 메모리 관리

메모리 누수의 위험을 이유로 클로저 사용을 조심해야 한다는 의견이 있지만, 오히려 이러한 특성을 정확히 이해하고 잘 활용해야함

개발자가 의도적으로 참조 카운트를 0이 되지 않게 설계한다면 메모리 누수라고 볼 수 없음

## 관리방법

- 클로저는 어떤 필요에 의해 의도적으로 함수의 지역변수를 메모리를 소모하도록 함으로써 발생함. 따라서 그 필요성이 사라진 시점에는 더는 메모리를 소모하지 않도록 해주면 됨.
- 참조 카운트를 0으로 만들면 언젠가 GC(가비지 컬렉터)가 수거해갈 것이고 이때 소모됐던 메모리가 회수됨
- 참조 카운트를 0으로 만드는 방법은 식별자에 참조형이 아닌 기본형 데이터(`null` 혹은 `undefined`)를 할당해줌

```jsx
var outer = (function () {
	var a = 1;
	var inner = function () {
		return a++;
	};
	return inner;
})();
console.log(outer());
console.log(outer());
outer = null; // outer 식별자의 inner 함수 참조를 끊음
```

```jsx
(function () {
	var a = 0;
	var intervalId = null;
	var inner = function () {
		if(++a >= 10) {
			clearinterval(intervalId);
			inner = null; // inner 식별자의 함수 참조를 끊음
		}
		console.log(a);
	};
	intervalId = setInterval(inner, 1000);
})();
```

```jsx
(function() {
	var count = 0;
	var button = document.createElement('button');
	button.innerText = 'click';

	var clickHandler = function () {
		console.log(++count, 'times clicked');
		if(count >= 10) {
			button.removeEventListener('click', clickHandler);
			clickHandler = null; // clickHandler 식별자의 함수 참조를 끊음
		}
	};
	button.addEventListener('click', clickHandler);
	document.body.appendChild(button);
})();
```

# 03 클로저 활용 사례

## 1. 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

```jsx
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul'); // 공통 코드

fruits.forEach(function(fruit) { // (A)
	var $li = document.createElement('li');
	$li.innerText = fruit;
	$li.addEventListener('click', function() { // (B)
		alert('your choice is ' + fruit);
	});
	$ul.appendChild($li);
});
document.body.appendChild($ul);
```

(B)는 (A)의 변수 fruit이라는 외부변수를 참조하기 때문에 (A)는 GC 대상에서 제외되어 계속 참조가 가능함. 그러나, (B) 함수의 쓰임새가 콜백 함수에 국한되지 않는 경우라면 반복을 줄이기 위해 (B)를 외부로 분리하는 것이 좋음

```jsx
...
var alertFruit = function(fruit) {
	alert('your choice is ' + fruit);
}; // 공통 함수로 쓰고자 외부로 꺼내어 해당 변수에 담음

fruits.forEach(function(fruit) { // (A)
	var $li = document.createElement('li');
	$li.innerText = fruit;
	$li.addEventListener('click', alertFruit);
	$ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruit(fruits[1]);
```

하지만, 각 li를 클릭하면 클릭한 대상의 과일명이 아닌 [object MouseEvent]라는 값이 출력됨. 콜백 함수의 인자에 대한 제어권을 addEventListener가 가진 상태이며, addEventListener는 콜백 함수를 호출할 때 첫 번째 인자에 `이벤트 객체` 를 주입하기 때문. 이 문제는 `bind` 메서드를 활용하면 해결 가능

```jsx
...
fruits.forEach(function(fruit) { // (A)
	var $li = document.createElement('li');
	$li.innerText = fruit;
	$li.addEventListener('click', alertFruit.bind(null, fruit));
	$ul.appendChild($li);
});
...
```

다만, 이렇게 하면 this가 원래의 this와 달라짐. 따라서, `bind` 메서드보다는 `고차함수` 를 활용해 해결을 추천. 고차함수는 함수형 프로그래밍에서 자주 쓰이는 방식

```jsx
...
var alertFruitBuilder = function(fruit) {
	return function() { // 고차 함수
		alert('your choice is ' + fruit);
	}
};

fruits.forEach(function(fruit) { // (A)
	var $li = document.createElement('li');
	$li.innerText = fruit;
	$li.addEventListener('click', alertFruitBuilder(fruit);
	$ul.appendChild($li);
});
...
```

- event Bubbling 방법도 있음

## 2. 접근 권한 제어(정보 은닉)

> 정보은닉
>

어떤 모듈의 내부 로직에 대해 외부로의 노출을 최소화해서 모듈 간 결합도를 낮추고 유연성을 높이고자 하는 현대 프로그래밍 언어의 중요한 개념 중 하나.

`public` 외부에서 접근 가능

`private` 내부에서만 사용하며 외부에 노출 안함

`protected`

자바스크립트는 기본적으로 변수 자체에 접근 권한을 직접 부여하도록 설계돼 있지 않음. 불가능한 것은 아님. → 클로저를 이용하면 함수 차원에서 public한 값과 private한 값을 구분하는 것이 가능해짐

- return 활용하기

외부에서는 return한 정보에만 접근이 가능함. 즉, return 값이 외부에 정보를 제공하는 유일한 수단인 것.

## 3. 부분 적용 함수

n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가, 나중에 (n-m)개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게끔 하는 함수

```jsx
var partial = function() {
	var orginalPartialArgs = arguments;
	console.log(arguments); // (func, ...)
	var func = originalPartialArgs[0]'
	if(typeof func !== 'function') {
		throw new Error('첫 번째 인자가 함수가 아닙니다.');
	}
	return function() {
		var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
		var restArgs = Array.prototype.slice.call(arguments);
		return func.apply(this, partialArgs.concat(restArgs));
	};
};

var add = function() {
	var result = 0;
	for(var i = 0; i < arguments.length; i++) {
		result += arguments[i];
	}
	return result;
};
var addPartial = partial(add, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10)); // 55

var dog = {
	name: '강아지',
	greet: partial(function(prefix, suffix) {
		return prefix + this.name + suffix;
	}, '왈왈, ')
};
dog.greet('입니다!'); // 왈왈, 강아지입니다!
```

```jsx
Object.defineProperty(window, '_', {
	value: 'EMPTY_SPACE',
	writable: false,
	configurable: false, 
	enumerable: false
});

var partial2 = function() {
	var originalPartialArgs = arguments;
	var func = originalPartialArgs[0];
	if(typeof func !== 'function') {
		throw new Error('첫 번째 인자가 함수가 아닙니다.');
	}
	return function() {
		var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
		var restArgs = Array.prototype.slice.call(arguments);
		for(var i = 0; i < partialArgs.length; i++) {
			if(partialArgs[i] === _) {
				partialArgs[i] = restArgs.shift();
			}
		}
		return func.apply(this, partialArgs.concat(restArgs));
	};
};

var add = function () {
	var result = 0;
	for(var i = 0; i < arguments.length; i++) {
		result += arguments[i];
	}
	return result;
};
var addPartial = partial(Add, 1, 2, _, 4, 5, _, 6, 7, 8, 9);
console.log(addPartial(3, 6, 7, 10)); //55

var dog = {
	name: '강아지',
	greet: partial2(function(prefix, suffix) {
		return prefix + this.name + suffix;
	}, '왈왈, ')
};
dog.greet('배고파요!');
```

- debounce

실무에서 부분 함수를 적용하기에 적합한 예. 짧은 시간 동안 동일한 이벤트가 많이 발생할 경우 이를 전부 처리하지 않고, 처음 또는 마지막에 발생한 이벤트에 대해 한 번만 처리함. scroll, wheel, mousemove, resize에 적용하기 좋음. `Lodash` 등의 라이브러리에서도 사용가능하지만 복잡하게 구현됨.

```jsx
var debounce = function(eventName, func, wait) {
	var timeoutId = null;
	return function(event) {
		var self = this;
		console.log(eventName, '이벤트 발생');
		clearTimeout(timeoutId);
		timeoutId = setTimeout(func.bind(self, event), wait);
	};

var moveHandler = function(e) {
		console.log('move event 처리');
};

var wheelHandler = function(e) {
		console.log('wheel event 처리');
};

document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
document.body.addEventListener('mousewheel', debounce('wheel', wheelHandler, 700));
```

클로저로 처리되는 변수로는 `eventName` `func` `wait` `timeoutId` 가 있음

## 4. 커링 함수

여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠 순차적으로 호출될 수 있게 체인 형태로 구성한 것

한 번에 하나의 인자만 전달하는 것을 원칙으로 함. 또한, 중간 과정상의 함수를 실행한 결과는 그 다음 인자를 받기 위해 대기만 할 뿐, 마지막 인자가 전달되기 전까지는 원본 함수가 실행되지 않음

( 부분 적용 함수는 여러 인자 전달가능하며, 실행 결과를 재실행할 때 원본 함수가 무조건 실행됨 )

```jsx
var curry3 = function(func){
	return function(a) {
		return function(b) {
			return func(a, b);
		};
	};
};

var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25

var getMinWith10 = curry3(Math.min)(10);
console.log(getMinWith10(8)); // 8
console.log(getMinWith10(25)); // 10
```

단, 인자가 많아질수록 가독성이 떨어진다는 단점이 있음

```jsx
var curry5 = function(func) {
	return function(a) {
		return function(b) {
			return function(c) {
				return function(d) {
					return function(e) {
						return func(a, b, c, d, e);
					};
				};
			};
		};
	};
};
var getMax = curry5(Math.max);
console.log(getMax(1)(2)(3)(4)(5)); // 너무 긴 코드

var curry5 = func => a => b => c => d => e => func(a, b, c, d, e);
```

- 커링 함수가 유용한 경우
    - 지연실행의 경우 - 당장 필요한 정보만 받아서 전달하고 또 필요한 정보가 들어오면 전달하는 식으로 하면 결국 마지막 인자가 넘어갈 때까지 함수 실행을 미룸
    - 프로젝트 내에서 자주 쓰이는 함수의 매개변수가 항상 비슷하고 일부만 바뀌는 경우

        ```jsx
        var getInformation = function(baseUrl) { // 서버에 요청할 주소의 기본 URL
        	return function(path) { // path 값
        		return function(id) { // id 값
        			return fetch(baseUrl + path + '/' + id); // 실제 서버에 정보를 요청
        		};
        	};
        };
        
        //ES6
        var getInformation = baseUrl => path => id => fetch(baserUrl + path +'/' + id);
        ```

    - Flux 아키텍처의 구현체 중 하나인 Redux의 미들웨어

        ```jsx
        // Redux Middleware 'Logger'
        const logger = store => next => action => {
        	console.log('dispatching', action);
        	console.log('next state', store.getState());
        	return next(action);
        };
        
        // Redux Middleware 'thunk'
        const thunk = store => next => action => {
        	return typeof action === 'function' ? action(dispatch, store.getState) : next(action);
        };
        ```