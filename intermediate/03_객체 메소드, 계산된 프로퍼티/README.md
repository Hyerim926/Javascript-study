# 객체 메소드, 계산된 프로퍼티
1. Computed Property
```javascript
let a = 'age';

const user = {
    name: 'Mike',
    [a] : 30 // age: 30 a에 age가 들어가는 것이 계산된 프로퍼티
}
```
2. 객체 메소드 [코드]()
- `Object.assign()` 객체 복제
  - key가 같다면 value 덮어쓰기함
  - 객체를 합할수도 있음
- `Object.keys()` 키 배열 반환
- `Object.values()` 값 배열 반환
- `Object.entries()` 키/값 배열 반환
- `Object.fromEntries()` 키/값 배열을 객체로