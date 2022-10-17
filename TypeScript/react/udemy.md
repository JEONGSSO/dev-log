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
  todos: Todo[];
  onDeleteTodo: (todoId: string) => void;
};

const TodoList = ({ todos, onDeleteTodo }: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <p>{todo.text}</p>
          <button onClick={onDeleteTodo}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
```

```tsx
// NewTodo.tsx
import React, { useRef } from "react";

type NewTodoProps = {};

const NewTodo = ({}: NewTodoProps) => {
  const inputElem = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // Definite Assignment Assertions current가 렌더링 된 후에야 실행이 가능한 코드이므로 HTMLInputElement를 확신할 수 있기에 적용
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

```tsx
// App.tsx

export type Todo = { id: string; todo: string };

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([{ id: 1, todo: "todo" }]);

  const todoAddHandler = (todo: string) => {
    setTodos((prev) => [...prev, { id: Math.random.toString(), todo: todo }]);
  };

  const todoAddHandler = (todoId: string) => {
    setTodos.filter((todo) => todo.id !== todoId);
  };

  return (
    <div>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList todoItem={todos} onDeleteTodo={todoAddHandler} />
    </div>
  );
};
```
