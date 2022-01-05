var user = {
    name: 'hey',
    gender: 'female'
};

var changeName = function (user, newName) {
    var newUser = user;
    newUser.name = newName;
    return newUser;
};

var user2 = changeName(user, 'forest');

if(user != user2) {
    console.log('유저 정보가 변경되었습니다.'); // 출력 없이 통과 -> 바뀌기 전후 서로 다른 객체를 바라보게 만들기 solve.js
}

console.log(user.name, user2.name); // forest forest
console.log(user === user2); // true
