### createEvent

    fireEvent에 없는 이벤트를 만들때 사용할 수 있다. timestamp 등등의 이벤트?

### \*ByRole label과 같이 사용했을때의 label의 for와 input의 id가 같은 label의 textNode를 찾음

```tsx
const handleChange = () => {
  console.log("call handleChange");
};

const inputElem = screen.getByRole("textbox", {
  name: /username/i,
}) as HTMLInputElement;

// 얘를 찾음
<label htmlFor="asd">
  username
  <input id="asd" name="zzzz" onChange={handleChange}></input>
</label>;
```

### fireEvent, userEvent input 입력 차이

```ts
const inputElem = screen.getByRole("textbox", {
  name: /username/i,
}) as HTMLInputElement;

fireEvent.change(inputElem, { target: { value: "아무거나입력" } });

// input test (136 ms)
// onChange callback function 1번 실행됨
// 즉 한번 입력에 6글자를 씀

userEvent.type(inputElem, "아무거나입력");
// input test (167 ms)
// onChange callback function 6번 실행됨
```

### waitfor

- waitFor는 수행한 작업과 단언문 전달 사이에 비결정적 시간이 있는 테스트를 위한 것 ex)버튼 클릭시 api call
- 검증하려는 작업과 단언문 사이에 비결정적 시간이 있는 경우에 대한 테스트를 위한 것
- dom이 변경될때 마다도 호출됨 (사이드 이펙트 여러 번 실행 가능성)
- 만약 graphql의 query에 값이 있다면 올바른 값이 들어가기전까지 undefined상태이고, 여러번 렌더링되는데 그 때 올바른 값이 들어갈 때를 기다려 줄 수 있는 방법으로 사용할 수 있다.

### apollo mock data

```tsx
const mocks: MockedResponse[] = [
  {
    request: {
      query: gqlVariable,
      variables: {
        email,
        password,
      },
    },
    result: {
      data: { name: "김" },
      errors: [
        {
          name: "login",
          message: "이메일 또는 패스워드 확인요",
        },
      ],
    },
  },
];

// mock result data랑 errors랑 같이 사용하게 되면 errors가 우선순위가 높다
// errors 테스트할때 data는 안써도 무방하다.
```

### mockData 제대로 적은 것 같은데 undefined만 뜨는 경우

사용하는 곳에서 error를 콘솔로 찍어보면 예상 variables의 값들을 확인 할 수 있다.
