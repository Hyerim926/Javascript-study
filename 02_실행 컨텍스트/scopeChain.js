var a = 1;
var outer = function () {
    var inner = function () {
        console.log(a); // 외부 a와 다른 변수임 아직 할당되기 전이기 때문에 undefined 출력
        var a = 3; // inner() 안에 a 선언
    };
    inner();
    console.log(a); // 실행 컨텍스트의 LexicalEnvironment에 접근, 전역 a값인 1 출력
};
outer();
console.log(a); // 전역 컨텍스트의 LexicalEnvironment에 접근, 1 출력

/* 전역 컨텍스트 -> outer 컨텍스트 -> inner 컨텍스트 순으로 규모가 작아지지만 스코프 체인을 타고 접근 가능한 변수의 수는 늘어남 .
* 전역공간에서는 전역 스코프에서 생성된 변수에만 접근 가능
* outer 함수 내부에서는 outer 및 전역 스코프에서 생성된 변수에 접근할 수 있지만, inner 스코프 내부에서 생성된 변수에는 접근 불가
* inner 함수 내부에서는 inner, outer, 전역 스코프 모두에 접근 가능
* */