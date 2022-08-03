## 트리플 A 테스트

```js
// Arrange
const numbers = [1, 2, 3];

// Act
const result = add(numbers);

// Assert
const expectResult = numbers.reduce((prev, current) => prev + current, 0);

expect(result).toBe(expectResult);
```

toThrow를 사용하여 에러가 났는지 또 에러의 원인을 정규식으로 검색도 가능

```ts
expect(result).toThrow(/not iterable/);
// throw의 에러 내용을 검색가능
```
