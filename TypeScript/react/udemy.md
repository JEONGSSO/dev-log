## CRA 설정하는 방법

```bash
npx create-react-app app --typescript
```

- 명령어를 통해 기본적으로 설치해줌

- todo list를 한번 만들어보자

```tsx
// TodoList components
import React from "react";

type TodoListProps = {
  todos: {
    id: number;
    text: string;
  };
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
```

```tsx
// NewTodo.tsx
import React, { useRef } from "react";

type NewTodoProps = {
  todos: {
    id: number;
    text: string;
  };
};

const NewTodo = () => {
  const inputElem = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = inputElem.current!.value;
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label />
        <input ref={inputElem} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  );
};

export default NewTodo;
```
