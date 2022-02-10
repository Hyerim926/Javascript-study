# 숫자, 수학 method
1. 10진수 -> 2진수/16진수로 변환하는 방법
   - `toString()`
   ```javascript
    let num = 10;
   
    num.toString(); // 10
    num.toString(2); // 1010, 2진수 변환
   ```
2. Number
3. Math [코드]()
- `Math.ceil` 올림
- `Math.floor` 내림
- `Math.round` 반올림
- 소수점 자릿수
  - `round` 메소드 활용
  - `toFixed()` 실 자리수보다 큰 경우에는 남은 자리수를 `0`으로 채워 반환함. 또한, 이는 문자열 반환이기때문에 `number`메소드로 숫자로 변환해야함
- `isNaN()` 숫자인지 아닌지 판단
- `parseInt` 문자를 숫자로 변환. 숫자있는 곳까지만 인식해서 반환. 만약 첫 글자로 숫자가 없다면 `NaN` 반환
- `parseFlaot` 부동숫자를 반환
- `Math.random()` 0~1 사이 무작위 숫자 생성
- `Math.max()` `Math.min()` 최대값과 최소값
- `Math.abs()`절대값
- `Math.pow(n, m)` 제곱
- `Math.sqrt()` 제곱근 