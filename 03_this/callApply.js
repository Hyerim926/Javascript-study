// 1. 유사배열객체에 배열 메서드 적용
var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
Array.prototype.push.call(obj, 'd');
console.log(obj); // {0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4}

/*
slice 메서드
원래 시작 인덱스값과 마지막 인덱스값을 받아 시작값부터 마지막값의 앞부분까지의 배열 요소 추출
매개변수를 아무것도 넘기지 않을 경우 그냥 원본 배열의 얕은 복사본 반환
*/
var arr = Array.prototype.slice.call(obj);
console.log(arr); // (4) ['a', 'b', 'c', 'd']

// 2. arguments, NodeList에 배열 메서드 적용
function a() {
    var argv = Array.prototype.slice.call(arguments);
    argv.forEach(function (arg) {
        console.log(arg); // 1 2 3
    });
}

a(1, 2, 3);

document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
var nodeList = document.querySelectorAll('div');
var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function (node) {
    console.log(node); // a b c
});

// 3. 문자열에 배열 메서드 적용 예시
var str = 'abc def';

Array.prototype.push.call(str, ', pushed string'); // Cannot assign to read only property 'length' of object '[object String]'

Array.prototype.concat.call(str, 'string'); // [String, 'string']

Array.prototype.every.call(str, function (char) {
    return char !== ' ';
}); // false

Array.prototype.some.call(str, function (char) {
    return char !== ' ';
}); // true

var newArr = Array.prototype.map.call(str, function (char) {
    return char + '!';
});

console.log(newArr); // ['a!', 'b!', 'c!', ' !', 'd!', 'e!', 'f!']

var newStr = Array.prototype.reduce.apply(str, [
    function (string, char, i) {
        return string + char + i;
    }, ''
]);

console.log(newStr); // a0b1c2 3d4e5f6입

// 4. Array.from 메서드
var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
var arr = Array.from(obj);
console.log(arr); // ['a', 'b', 'c']