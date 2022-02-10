let num1 = 5.1;
let num2 = 5.7;

// 올림
Math.ceil(num1); // 6
Math.ceil(num2); // 6

// 내림
Math.floor(num1); // 5
Math.floor(num2); // 5

// 반올림
Math.round(num1); // 5
Math.round(num2); // 6

// 소수점 자릿수
let userRate = 30.1234;

userRate.toFixed(2); // 30.12

// isNaN
let x = Number('x'); //NaN
x == NaN // false
x === NaN // false
NaN === NaN // false
isNaN(x) // true
isNaN(3) // false

// parseInt
let margin = '10px';

parseInt(margin); // 10
Number(margin); // NaN

let redColor = 'f3';
parseInt(redColor); // NaN

// parseFloat
let padding = '18.5%';
parseInt(padding); // 18
parseFloat(padding); // 18.5