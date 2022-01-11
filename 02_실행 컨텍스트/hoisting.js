// 예제 코드 1
function a(x) {
    console.log(x); // 하단 a(1)이 호이스팅 되어 값이 1
    var x;
    console.log(x); // 호이스팅 이후 할당 값이 없으므로 이것도 마찬가지로 1
    var x = 2;
    console.log(x); // 2
}
a(1)

// 예제 코드 2
function a() {
    console.log(b); // 하단 b()가 호이스팅 되어 출력
    var b = 'bbb'; // var b = function b()였던 것에 'bbb'를 할당
    console.log(b); // bbb 출력
    function b () {}
    console.log(b); // bbb 출력
}
a();