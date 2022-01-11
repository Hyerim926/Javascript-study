// 원본 코드
console.log(sum(1, 2)); // 3
console.log(multiply(3, 4)); // 활성화되지 않는다. 왜그럴까? - 함수 표현식은 변수 선언부만 호이스팅하기 때문에 함수 실행이 안됨 -> multiply is not a function 에러

function sum(a, b) {
    return a + b;
}

var multiply = function (a, b) {
    return a * b;
}

/* 호이스팅된 상태
var sum = function sum(a, b) { // 함수 선언문은 전체를 호이스팅함
    return a + b;
};
var multiply; // 함수 표현식의 경우 변수 선언부만 끌어올림
console.log(sum(1, 2));
console.log(multiply(3, 4));

multiply = function (a, b) { // 변수의 할당부는 원래 자리에 남겨
    return a * b;
}
*/