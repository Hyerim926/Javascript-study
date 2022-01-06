var arr1 = [];
arr1.length = 3;
console.log(arr1); // [empty x 3] -> 3개의 빈 요소를 확보했지만 각 요소에는 어떤 값도 없음. even undefined

var arr2 = new Array(3);
console.log(arr2); // [empty x 3]

var arr3 = [undefined, undefined, undefined];
console.log(arr3); // [undefined, undefined, undefined]
