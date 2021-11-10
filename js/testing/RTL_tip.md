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

### waitFor

- waitFor는 수행한 작업과 단언문 전달 사이에 비결정적 시간이 있는 테스트를 위한 것 ex)버튼 클릭시 api call
- 검증하려는 작업과 단언문 사이에 비결정적 시간이 있는 경우에 대한 테스트를 위한 것
- dom이 변경될때 마다도 호출됨 (사이드 이펙트 여러 번 실행 가능성)
- 만약 graphql의 query에 값이 있다면 올바른 값이 들어가기전까지 undefined상태이고, 여러번 렌더링되는데 그 때 올바른 값이 들어갈 때를 기다려 줄 수 있는 방법으로 사용할 수 있다.
- 테이블에 전체선택 체크박스가 하나 있는데 row가 추가되고 row에 있는 checkbox를 사용해야 할 때 체크박스가 두개 이상일때를 기다려야 할 때 유용하게 사용 (row 개수가 없을 때 체크박스 disabled로 더 간단히 체크할 수 있다)

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
    // mock result data랑 errors랑 같이 사용하게 되면 errors가 우선순위가 높다
    // errors 테스트할때 data는 안써도 무방하다.
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
  // 배열이라서 컴포넌트 사용하는 여러가지 mocked 데이터를 추가 할 수 있다

  // 컴포넌트 자식들의 query도 여기에 적어주면 연결된다!!!
  {
    request: {
      query: childVariable,
      variables: {
        value,
      },
    },
    result: {
      data: { name: "자식 테스트" },
    },
  },
];
```

## mock작성시 정확하게 적은 것 같은데 fetch data가 계속 undefined라면

- lazy쿼리라면 해당쿼리를 실행했는지 확인
- query에 error를 console.log 찍어서 해당 에러를 파악하여 수정

## display 된 dom

- snapshot에 고스란히 나온다
- Role으로 찾을 수 있는 경우에 \*ByRole hidden 옵션으로 찾을 수 있다
