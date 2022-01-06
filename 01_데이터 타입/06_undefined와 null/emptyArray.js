/*
 배열의 각 요소를 순회하는 것을 기본으로 추가적인 기능을 수행하는 메서드들간 비교 : forEach(), map(), filter(), reduce()
 undefined를 할당한 arr1은 배열의 모든 요소를 순회해서 결과 출력함
 arr2는 메서드들이 비어있는 요소에 대해서는 어떠한 처리도 하지않고 건너띔
 */

var arr1 = [undefined, 1]; // undefined 직접 할당
var arr2 = []; // 빈 배열의 인덱스 1 값에 1 할당
arr2[1] = 1;

arr1.forEach(function (v, i) {
    console.log(v, i);
});
arr2.forEach(function (v, i) {
    console.log(v, i);
});

arr1.map(function (v, i) {
    return v + i;
});
arr2.map(function (v, i) {
    return v + i;
});

arr1.filter(function (v) {
    return !v;
});
arr2.filter(function (v) {
    return !v;
});

arr1.reduce(function (p, c, i) {
    return p + c + i;
});
arr2.reduce(function (p, c, i) {
    return p + c + i;
});
