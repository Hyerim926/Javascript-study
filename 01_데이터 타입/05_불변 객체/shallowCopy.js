// for in 문법을 이용해 result 객체에 target 객체의 프로퍼티를 복사함줌 단, 얕은 복사만 해당
var copyObject = function (target) {
    var result = {};
    for (var prop in target) {
        result[prop] = target[prop];
    }

    return result;
};

// copyObject() 함수를 이용하면 user 객체는 불변 객체
var user = {
    name: 'hey',
    gender: 'female'
};

var user2 = copyObject(user);
user2.name = 'forest';

if (user !== user2) {
    console.log('유저 정보가 변경되었습니다.'); // 유저 정보가 변경되었습니다.
}

console.log(user.name, user2.name); // hey forest
console.log(user === user2); // false