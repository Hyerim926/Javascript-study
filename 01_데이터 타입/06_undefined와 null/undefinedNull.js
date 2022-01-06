var n = null;
console.log(typeof n); // object

console.log(n == undefined); // true 동등 연산자(==)로 비교할 경우 null과 undefined가 서로 같다고 판단 -> 비교하기 어렵 따라서 일치연산자(===)사용
console.log(n == null); // true

console.log(n === undefined); //false 일치연산자(===) 사용
console.log(n === null); // true