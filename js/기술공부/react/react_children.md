## React.Children.toArray()

```tsx
function Box({ children }) {
  console.log(children);
  console.log(React.Children.toArray(children));
  return children;
}

const fruits = [
  { id: 1, name: "apple" },
  { id: 2, name: "kiwi" },
];

export default function App() {
  return (
    <Box>
      <div name="banana">banana</div>
      {fruits.map((fruit) => (
        <div key={`${fruit.id}_${fruit.name}`} name={fruit.name}>
          {fruit.name}
        </div>
      ))}
    </Box>
  );
}
```

```ts
// console.log(children);
[
  Object1, // banana
  [
    Object2, // apple
    Object3, // kiwi
  ],
];
```

```ts
// console.log(React.Children.toArray(children));
[
  Object1, // banana
  Object2, // apple
  Object3, // kiwi
],
```

```tsx
const Box = ({ children }) => {
  console.log(children); // // children이 없으면 undefined, 하나라면 object, 여러개라면 array를 출력
  console.log(React.Children.toArray(children));

  return React.Children.toArray(children).slice(0, 2); // 이렇게 두개만 사용해서 렌더링 조작할 수 있다.
};

const App = () => <Box />;
```

또 다른 한 가지의 차이점은
toArray는 고유한 key를 만들어준다.

```ts
// toArray
{
  0: Object
  type: "div"
  key: null
  ref: null
  props: Object
  _owner: FiberNode
  _store: Object
}
```

```ts
// toArray
[
  {
    0: Object
    type: "div"
    key: ".0" // key를 만들어줌
    ref: null
    props: Object
    _owner: FiberNode
    _store: Object
  }
]
```

Children.toArray()는 1차원 배열로 변환하는 과정에서 렌더링 최적화를 위해 고유한 key값을 부여한다.
https://reactjs.org/docs/react-api.html#reactchildrentoarray

Children.toArray()가 다르게 동작하는 경우가 있는데,

```tsx
import React from "react";
import "./styles.css";

function Box({ children }) {
  console.log(React.Children.toArray(children));
  return children;
}

const fruits = [
  { id: 1, name: "apple" },
  { id: 2, name: "kiwi" },
];

export default function App() {
  return (
    <Box>
      <React.Fragment>
        <div name="banana">banana</div>
        <div name="melon">melon</div>
      </React.Fragment>
      {fruits.map((fruit) => {
        return (
          <div key={fruit.id} name={fruit.name}>
            {fruit.name}
          </div>
        );
      })}
    </Box>
  );
}
```

```ts
[
  Object1, // banana & melon
  Object2, // apple
  Object3, // kiwi
];
```

Fragment 및 빈 태그는 flatten하게 처리하지 않는 문제가 있다고 한다.

---

## 참조

https://fe-developers.kakaoent.com/2021/211022-react-children-tip/
