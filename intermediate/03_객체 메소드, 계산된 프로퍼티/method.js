const user = {
    name: 'Mike',
    age: 30
}

// 객체 복제
const newUser = Object.assign({}, user);

// 키 배열 반환
Object.keys(user); // ["name":"Mike", "age":30]

// 값 배열 반환
Object.values(user); // ["Mike", 30]

// 키/값 배열 반환
Object.entries(user); // ["name","Mike"],["age",30]

// 키/값 배열 객체로
const arr =
    [
        ["name", "Mike"],
        ["age", 30],
        ["gender", "male"]
    ];
Object.fromEntries(arr); // {name: 'Mike', age: 30, gender: 'male'}