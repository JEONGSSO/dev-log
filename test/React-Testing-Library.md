# React-Testing-Library

enzyme과 자주 언급되는 리액트 테스트 라이브러리

## Enzyme과의 비교

- Behavior Driven Test(행위 주도 테스트)
  - 실제로 dom을 그려서 테스트(마크업으로 테스팅)

- Implementation Driven Test(구현 주도 테스트)
  - react 가상 dom 테스트(컴포넌트로 테스팅)
---
## 간단 사용법

### 자주 사용하는 두가지는 Dom에 컴포넌트를 렌더링 해주는 render()함수와, 특정 이벤트를 발생키져누는 fireEvent 객체가 있다.

```js
import {render, fireEvent} from "@testing-library/react";

//구조분해할당 (Destructuring) 으로 가져오기 
const {const { getByText, getByLabelText, getByPlaceholderText } = render(<YourComponent />)}

```

### 정적 컴포넌트 테스팅

```js
import React from "react";
import { render } from "@testing-library/react";

function NotFound({ path }) {
  return (
    <>
      <h2>Page Not Found</h2>
      <p>해당 페이지({path})를 찾을 수 없습니다.</p>
    </>
  );
}


describe("<NotFound />", () => { //jest 
  it("renders header", () => { //jest
    const { getByText } = render(<NotFound path="/abc" />);
    const header = getByText("Page Not Found"); // Page Not Found가 담겨있는 엘리먼트를 찾아서 담는다.
    expect(header).toBeInTheDocument(); //jest-dom의 toBeInTheDocument() 함수를 이용해서 h2 엘리먼트가 존재하는지 확인. 
  });
});

// 이 테스팅 코드를 통해 제대로 렌더링 되고 있는지 테스트 가능.

//getByText()쿼리 함수는 스트링, 정규식도 인자로 받을 수 있다.

```

---
## 동적 컴포넌트 테스팅

이메일과 패스워드를 전송하는 폼을 가진 예제


```js
import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>
          이메일
          <input
            type="email"
            placeholder="user@test.com"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </label>
        <button disabled={!email || !password}>로그인</button>
      </form>
    </>
  );
}

describe("<LoginForm />", () => {
  it("enables button when both email and password are entered", () => {
    const { getByText, getByLabelText } = render(
      <LoginForm onSubmit={() => null} />
    );

    const button = getByText("로그인");
    const email = getByLabelText("이메일");
    const password = getByLabelText("비밀번호");

    expect(button).toBeDisabled();

    fireEvent.change(email, { target: { value: "user@test.com" } });
    fireEvent.change(password, { target: { value: "Test1234" } });

    expect(button).toBeEnabled();
  });
});

it("submits form when buttion is clicked", () => {
  const obSubmit = jest.fn(); // 가짜함수 mock function 생성
  const { getByText, getByLabelText } = render(
    <LoginForm onSubmit={obSubmit} />
  );

  const button = getByText("로그인");
  const email = getByLabelText("이메일");
  const password = getByLabelText("비밀번호");

  fireEvent.change(email, { target: { value: "user@test.com" } }); // 타겟 체인지 이벤트
  fireEvent.change(password, { target: { value: "Test1234" } });

  fireEvent.click(button);

  expect(obSubmit).toHaveBeenCalledTimes(1);
});

```



출처 : https://www.daleseo.com/react-testing-library/

https://www.daleseo.com/jest-fn-spy-on/