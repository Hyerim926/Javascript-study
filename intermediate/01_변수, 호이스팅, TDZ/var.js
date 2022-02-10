//한 번 선언된 변수 재선언 가능
var name = 'Mike';
console.log(name); // Mike

var name = 'Jane';
console.log(name); // Jane

//선언 전 사용 가능
console.log(name); // undefined
var name = 'Mike';

/*
* var name; // 호이스팅
* console.log(name);
* name = 'Mike';
* */
