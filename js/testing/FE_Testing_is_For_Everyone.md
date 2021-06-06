## 프론트 엔드에서 테스트

사이트에서 보는 내용과 그들이 사용하는 기능이 의도한 대로 작동하는지 검증

## 유닛 테스트

- 범위: 함수의 기능을 테스트.

  - 유닛 테스트는 테스트를 위한 가장 기본적인 구성요소.
  - **단일 책임 원칙**을 지킨 함수일수록 테스트가 쉬울것이다.
  - API 테스트에 특히 유용한 테스트 하드코딩 or mock 데이터를 사용하면 일관된 실행을 예측할 수 있다.

    ```js
    const sayHello = (name = "human") => {
      return `Hello ${name}`;
    };
    ```

    이렇게 작은 것도 테스트 해야는가?

    - 로직을 작성할 때 도움이 되는 엣지 케이스(함수 인자의 정상 범위)를 발견 할 수 있다.
    - 다른 코드에서 이 함수에 의존할 수 있으며 다른 사람이 수정할 경우, 테스트가 실패할 것이다.

    ```js
    describe("sayHello function", () => {
      it("should return the proper greeting when a user doesn't pass a name", () => {
        expect(sayHello()).toEqual("Hello human!");
      });

      it("should return the proper greeting with the name passed", () => {
        expect(sayHello("Evgeny")).toEqual("Hello Evgeny!");
      });
    });
    ```

## 통합 테스트

- 범위: 구성요소와 유닛의 상호작용 테스트.

  예를 들어 리액트에서 컴포넌트를 단위를 테스트 하는 경우 밑 코드처럼 적용해 볼 수 있겠다.

  ```js
  export const Greeting = () => {
    const [showGreeting, setShowGreeting] = useState(false);

    return (
      <div>
        <p role="greeting-paragraph">{showGreeting && sayHello()}</p>
        <button onClick={() => setShowGreeting(true)}>Show Greeting</button>
      </div>
    );
  };
  ```

  ```js
  describe("<Greeting />", () => {
    it("shows correct greeting", () => {
      const screen = render(<Greeting />);
      const greeting = screen.getByRole("greeting-paragraph");
      const button = screen.getByRole("button");

      expect(greeting.textContent).toBe("");
      fireEvent.click(button);
      expect(greeting.textContent).toBe("Hello human!");
    });
  });
  ```

## End-to-end(E2E) 테스트

- 범위: 실제 브라우저에서 수행할 작업, 클릭, 및 입력 등 최종사용자가 경험할 상호작용을 테스트.

  - 통합 테스트와 비슷하지만 **E2E테스트는 실제 DOM으로 브라우저 환경에서 실행 됨**, 실제 API를 사용하여 작업을 테스트.
  - 유닛, 통합 테스트로 커버할 수 있는 것이 좋지만, **실제 환경에서 예기치 않는 동작에 직면할 때** 좋은 테스트 방법이다.
  - [Cypress](https://www.cypress.io/)를 사용하여 E2E 테스트를 진행

    ```js
    describe("Greetings functionality", () => {
      it("should navigate to greetings page and confirm it works", () => {
        cy.visit("http://localhost:3000"); // URL접속

        cy.get("#greeting-nav-button").click();
        cy.get("#greetings-input").type("Evgeny", { delay: 400 });

        cy.get("#greetings-show-button").click();
        cy.get("#greeting-text").should("include.text", "Hello Evgeny!");
      });
    });
    ```

    테스트가 실제 브라우저에서 상호작용하는 모습을 지켜 볼 수 있다(딜레이가 없으면 매우 빠르게 지나감),

## 접근성 및 퍼포먼스 확인

- 범위: 프로그램의 성능 및 안정성 테스트, 인터페이스 접근성 표준

  크롬 개발자 도구 lightHouse에서 접근성 및 퍼포먼스 수치를 확인 할 수 있다.

  - 접근성: 눈이 불편하신 분들의 접근성을 염두에 둔 표준을 테스트
  - 퍼포먼스: 로딩속도, 번들 크기, 특정 기능의 속도등을 테스트

## 시각적 회귀 테스트

- 범위: 코드의 변경으로 발생하는 시각적 구조들을 테스트

  페이지나 구성 요소의 스크린샷을 찍어 변경 이후 스크린샷과 비교한다.

  [Percy](https://percy.io/)라는 도구로 버튼을 입력 하단으로 이동시켜 인사말 단락에 레이아웃을 일부러 깨트림

  ```js
  describe("Greetings functionality", () => {
    it("should navigate to greetings page and confirm everything is there", () => {
      cy.visit("http://localhost:3000");
      cy.get("#greeting-nav-button").click();
      cy.get("#greetings-input").type("Evgeny", { delay: 400 });
      cy.get("#greetings-show-button").click();
      cy.get("#greeting-text").should("include.text", "Hello Evgeny!");

      // Percy test
      cy.percySnapshot(); // HIGHLIGHT
    });
  });
  ```

https://css-tricks.com/front-end-testing-is-for-everyone/
