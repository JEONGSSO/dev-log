### beforeAll

```js
beforeAll(() => {
  console.log("맨 처음 실행");
});
```

### afterAll

```js
afterAll(() => {
  console.log("it, test가 전부 끝난 후 실행");
});
```

### beforeEach (describe안에서)

```js
beforeEach(() => {
  console.log("it, test 전에 실행");
  console.log("공통적으로 사용해야 하는 변수들을 담을 때 ");
  render(<Login />); // it, test전에 초기 렌더링을 다시 해야 할 때 (초기화된 컴포넌트 테스트)
  // client.clearStore();
});
```

### afterEach (describe안에서)

```js
afterEach(() => {
  console.log("it, test 후에 실행");
  console.log("실행 후 사이드 이펙트가 있는 코드를 초기화 할 때");
});
```

### 가짜함수 만들기 jest.fn

```js
const mockFn = jest.fn();

// mockReturnValue 가짜 함수의 리턴값을 지정
mockFn.mockReturnValue("good");
console.log(mockFn()); // good

// mockResolvedValue promise 객체로 리턴값을 받을 수 있다.
mockFn.mockResolvedValue("good");
mockFn().then((res: string) => {
  console.log(res); // good
});

// mockImplementation
mockFn.mockImplementation((name) => `good ${name}`);
console.log(mockFn("Kim")); // good Kim

// toBeCalledWith === toHaveBeenCalledWith 어떤 인자와 같이 들어왔었는지 체크 가능
mockFn("bad");
mockFn("good");

expect(mockFn).toBeCalledWith("bad"); // expect!
expect(mockFn).toHaveBeenCalledWith("good"); // expect!
```

### spyOn (특정 함수의 리턴값과 인자를 확인 할 수 있다)

```ts
const calculator = {
  add: (a: number, b: number) => a + b;
}

const spyFn = jest.spyOn(calculator, 'add');
const add = calculator.add(2, 3);

expect(spyFn).toBeCalledWith(2, 3); // expect!
expect(add).toBe(5); // expect!

// mockImplementation 안의 동작까지도 재구성 가능
spyFn.mockImplementation((a: number, b: number) => a - b);
const sub = calculator.add(2, 3);

expect(sub).toBe(5); // fail!

expect(spyFn).toBeCalledWith(2, 3); // expect!
expect(sub).toBe(-1); // expect!
```

## 참조

---

https://www.daleseo.com/jest-fn-spy-on/
