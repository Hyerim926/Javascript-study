# 배열(Array)

순서가 있는 리스트

### 배열의 특징

- 배열은 문자 뿐만 아니라, 숫자, 객체, 함수 등도 포함할 수 있음

```javascript
let arr = [
    '민수', // 문자
    3, // 숫자
    false, // Boolean
    { // 객체
        name: 'Mike',
        age: 30,
    },
    function () { // 함수
        console.log('TEST');
    }
];
```

- `length` 배열의 길이

```javascript
students.length;
```

- 배열의 메서드
    - `push()` 배열 끝에 추가
  ```javascript
    let days = ['월', '화', '수'];
    days.push('목')
    console.log(days); // ['월', '화', '수', '목']
  ```
  - `pop()` 배열 끝 요소 제거
  ```javascript
    let days = ['월', '화', '수'];
    days.pop()
    console.log(days); // ['월', '화']
  ```
  - `shift` `unshift` 배열 앞에 제거/추가
  ```javascript
  // 추가
  days.unshift('일');
  console.log(days); // ['일', '월', '화', '수']
  
  // 제거
  days.shift();
  console.log(days); // ['월', '화', '수']
  ```
  - `for` 반복문
  ```javascript
  let days = ['월', '화', '수'];
  
  for(let index = 0; index < days.length; index++){
    console.log(days[index]);
  }
  ```
  - `for ... of` 반복문 / for문보다는 간단하지만 인덱스를 얻지 못함
  ```javascript
  let days = ['월', '화', '수'];
  
  for(let day of days){
    console.log(day);
  }
  ```
  - `for ... in` 보다 `for ... of`를 더 권장 

  
  
  