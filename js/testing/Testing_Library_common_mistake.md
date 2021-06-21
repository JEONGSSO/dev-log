## testing library 사용시 실수 했던 내용들

1. screen 사용하지 않은 것

   ```js
   // ❌
   const { getByRole } = render(<Example />); // getByRole 말고도 추가되거나 지워질때 불편함
   const errorMessageNode = getByRole("alert");

   // ✅
   render(<Example />);
   const errorMessageNode = screen.getByRole("alert");
   ```

2. 알맞은 검증자 사용하기 (에러 메시지가 다르다)

   ```js
   const button = screen.getByRole("button", { name: /disabled button/i });

   // ❌
   expect(button.disabled).toBe(true);
   // error message:
   //  expect(received).toBe(expected) // Object.is equality
   //
   //  Expected: true
   //  Received: false

   // ✅
   expect(button).toBeDisabled();
   // error message:
   //   Received element is not disabled:
   //     <button />
   ```

3. 불필요하게 감쌀 필요 없다

   ````js
   // ❌
   act(() => {
     render(<Example />)
   })
   const input = screen.getByRole('textbox', {name: /choose a fruit/i})
   act(() => {
     fireEvent.keyDown(input, {key: 'ArrowDown'})
   })
   // ✅
   render(<Example />)
   const input = screen.getByRole('textbox', {name: /choose a fruit/i})
   fireEvent.keyDown(input, {key: 'ArrowDown'})```
   ````

4. 적절한 쿼리 사용하기 (대부분의 경우 getByRole 사용하기)

   ```js
   // ❌
   // assuming you've got this DOM to work with:
   // <label>Username</label><input data-testid="username" />
   screen.getByTestId("username");
   // ✅
   // change the DOM to be accessible by associating the label and setting the type
   // <label for="username">Username</label><input id="username" type="text" />
   screen.getByRole("textbox", { name: /username/i });
   ```

5. findBy\*는 promise를 리턴한다(waitFor 대체 가능)

   ```js
   // ❌
   const submitButton = await waitFor(() =>
     screen.getByRole("button", { name: /submit/i })
   );
   // ✅
   const submitButton = await screen.findByRole("button", { name: /submit/i });
   ```

6. waitFor 빈 콜백으로 사용하지 않기

   ```js
   // ❌
   await waitFor(() => {});
   expect(window.fetch).toHaveBeenCalledWith("foo");
   expect(window.fetch).toHaveBeenCalledTimes(1);
   // ✅
   await waitFor(() => expect(window.fetch).toHaveBeenCalledWith("foo"));
   expect(window.fetch).toHaveBeenCalledTimes(1);
   ```

7. waitFor 안에 사이드 이펙트 구문 사용하기

   부작용이 여러번 실행될 가능성이 있기 때문

   ```js
   // ❌
   await waitFor(() => {
     fireEvent.keyDown(input, { key: "ArrowDown" });
     expect(screen.getAllByRole("listitem")).toHaveLength(3);
   });
   // ✅
   fireEvent.keyDown(input, { key: "ArrowDown" });
   await waitFor(() => {
     expect(screen.getAllByRole("listitem")).toHaveLength(3);
   });
   ```
