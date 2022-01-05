var copyObjectDeep = function (target) {
    var result = {};
    /* target이 객체인 경우 내부 프로퍼티들을 순회하며 copyObject 함수를 재귀적으로 호출하고,
    * 객체가 아닌 경우 라인12번과 같이 target을 그대로 지정함
    * 객체를 복사한 다음에는 원본과 사본이 서로 완전히 다른 객체를 참조하게 되어 어느 쪽의 프로퍼티를 변경하더라도 다른 쪽에 영향을 주지 않음
     */
    if (typeof target === 'object' && target !== null) { // typeof 명령어가 null에 대해서도 object를 반환하기 때문, 자스의 자체 버그
        for (var prop in target) {
            result[prop] = copyObject(target[prop]);
        }
    } else {
        result = target;
    }
    return result;
};

var obj = {
    a: 1, // 객체가 아니므로 얘는 복사되지 않음
    b: {
        c: null,
        d: [1, 2]
    }
};

var obj2 = copyObjectDeep(obj); // obj2 와 obj1 값 동일 - 객체인 부분만

obj.a = 3; // obj의 a값을 3으로
obj2.b.c = 4; // obj2의 b객체의 c값을 4로
obj.b.d[1] = 3; // obj의 b객체의 d[1]값을 3으로

console.log(obj); // a: 3, b: {c: null, d: [1, 3]
console.log(obj2); // a: , b: {c: 4, d: [1, 2]