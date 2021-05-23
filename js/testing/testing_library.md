Testing Library 간단 사용법

사용자의 입장에서 테스트 해볼 수 있는 라이브러리

| 이름    | 에러 발생 여부 | 비고                                                     |
| ------- | -------------- | -------------------------------------------------------- |
| get\*   | O              | DOM 반환                                                 |
| query\* | X              | DOM 반환                                                 |
| find\*  | O              | Promise 반환 (최대 대기시간 4500ms 이후에도 없으면 에러) |

---

## [쿼리 우선 순위](https://testing-library.com/docs/queries/about/#priority)

1. getByLabelText
2. getByPlaceholderText
3. getByText
4. getByDisplayValue
5. getByAltText
6. getByTitle
7. getByRole
8. getByTestId

---

## screen과 render 반환 함수 어떤것을 사용해야 할까?

```js
import { render, screen } from "@testing-library/react";

const { getByText } = render(<Login />);

getByText("text");
screen.getByText("text");

// 위에 두개는 같다 라이브러리 개발자 kent C.Dodds는 screen을 더 추천

// 이유는 구조분해 하여 반환값을 바꿀때 매번 바꿔주어야 한다고 번거롭다는 이야기 같다.
```

https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen

---

## [ByRole](https://testing-library.com/docs/queries/byrole)

**DOM에서 일치하는 role을 찾아 반환 (웬만하면 getByRole 사용 권장)**

```js
<div>
  <button role="tab" aria-selected="true">Native</button>
  <button role="tab" aria-selected="false">React</button>
  <button role="tab" aria-selected="false">Cypress</button>
</div>

getByRole('tab', { selected: true }) // Native Element Select

<div>
  <button>sign in</button>
</div>

screen.getByRole('button') // 암묵적으로 button에는 ARIA button role이 있다

<input name="title" />

screen.getByRole('input', {name: /title/i})

```

## [ByLabelText](https://testing-library.com/docs/queries/bylabeltext)

**label이 있는 input의 label 내용으로 input을 선택**

```js
<label for="username-input">Usernameeeee</label>
<input id="username-input" />

<label>Usernameeeee <input /></label>

<label>
  <span>Usernameeeee</span>
  <input />
</label>

screen.getByLabelText("Usernameeeee");
// textContent가 "Usernameeeee"인 label의 input을 선택함
```

---

## [ByPlaceholderText](https://testing-library.com/docs/queries/byplaceholdertext)

**placeholder의 내용으로 선택**

```js
<input placeholder="이메일을 입력해주세요." />;

screen.getByPlaceholderText("이메일을 입력해주세요.");
```

---

## [ByText](https://testing-library.com/docs/queries/bytext)

**textContent의 내용으로 선택**

```js
<span>굿굿굿</span>;

screen.getByText(/굿굿굿/i);
```

---

## [ByDisplayValue](https://testing-library.com/docs/queries/bydisplayvalue)

**일치하는 input, textarea, select의 value로 선택**

```js
<input type="text" value="good" />;

screen.getByDisplayValue("good");
```

---

## [ByAltText](https://testing-library.com/docs/queries/byalttext)

**일치하는 alt로 선택**

```js
<img src="good" alt="imageee" />;

screen.getByAltText("imageee");
```

---

## [ByTitle](https://testing-library.com/docs/queries/bytitle)

**일치하는 title로 선택**

```js
<span title="Delete" id="2"></span>
<svg>
  <title>Close</title>
  <g><path /></g>
</svg>

screen.getByTitle('Delete');
screen.getByTitle('Close');
```

---

## [ByTestId](https://testing-library.com/docs/queries/bytestid)

**일치하는 data-testid로 선택 (최후의 수단으로 사용하길 권장)**

```js
<div data-testid="good">bad</div>;

screen.getByTestId("good");
```

---

```js
import React from "React";

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { Login } from "../index";

describe("login test", () => {
  it("로그인 성공 테스트", async () => {
    const email = "test@naver.com";
    const password = "test1234";

    render(<Login />); // 렌더링 함수

    const emailElem = screen.getByTestId("email"); // getByTestId :: data-testid="email"을 찾는 함수
    const passwordElem = screen.getByTestId("password");

    fireEvent.keyUp(emailElem, { target: { value: email } }); // event 발생
    fireEvent.keyUp(passwordElem, { target: { value: password } });

    const buttonElem = queryByRole("button"); // queryByRole :: 해당 엘리먼트의 역할로 찾는 함수
    fireEvent.click(buttonElem);

    await waitFor(() => {
      // 동기적으로 실행할 때 사용
      const loginSuccessElem = screen.getByText("로그인 성공!"); // getByText :: textContent가 "로그인 성공!"인 엘리먼트를 찾음
      expect(loginSuccessElem).toBeInTheDocument(); // jest-dom 포함 메소드
    });
  });
});
```

---

## 참초

[공홈](https://testing-library.com/docs/)

[벨로퍼트님 자료](https://velog.io/@velopert/react-testing-library)

[GROWNFRESH님 자료](https://grownfresh.tistory.com/283)
