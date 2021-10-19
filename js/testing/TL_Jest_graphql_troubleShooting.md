Modal컴포넌트 테스트 중에 에러 메시지 출력

    Warning: An update to Componenet inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped into act(...):

    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */

    This ensures that you're testing the behavior the user would see in the browser
    // 이렇게 하면 사용자가 브라우저에서 볼 수 있는 화면을 테스트 할 수 있다.

"messageParent" can only be used inside a worker

메시지 expect함수에서 제대로 예상 값과 출력값을 입력했는지 확인
