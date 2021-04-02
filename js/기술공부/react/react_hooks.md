# react-hook 이란?

ReactConf 2018에서 발표된
class가 없는 함수형 컴포넌트에서
life Cycle과 state를
사용할 수 있는 새로운 기능입니다.

### useState

```js
import React, { useState } from "react";

const Info = () => {
  const [id, setId] = useState(""); //''이 초기값
};
```

---

### useEffect

```js
import React, { useEffect } from "react";

useEffect(() => {
  console.log("didmount");
}, []);

useEffect(() => {
  console.log("didUpdate");
}, [id]);

useEffect(() => {
  console.log("didmount");
  return () => {
    console.log("unmount");
  };
}, []);
```

---

### useReducer

```js
import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const InfoReducer = ({}) => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    pw: "",
  });

  const { name, pw } = state;

  const handleId = (e) => {
    dispatch(e.target);
  };
  const handlePw = (e) => {
    dispatch(e.target);
  };

  return (
    <div>
      <input type="text" name="name" value={name} onChange={handleId} />
      <input type="text" name="pw" value={pw} onChange={handlePw} />
      <div>{name}</div>
      <div>{pw}</div>
    </div>
  );
};

export default InfoReducer;
```

---

### useContext

```js
//Provider.js

import React, { useState } from "react";
import cusContxt from "./cusContxt";

const Provider = ({ children }) => {
  const useLogin = () => {
    setLogin((prevState) => {
      return {
        ...prevState,
        login: true,
      };
    });
  };
  const useLogout = () => {
    setLogin((prevState) => {
      return {
        ...prevState,
        login: false,
      };
    });
  };

  const initialState = {
    login: true,
    useLogin,
    useLogout,
  };

  const [login, setLogin] = useState(initialState);

  return <cusContxt.Provider value={login}>{children}</cusContxt.Provider>;
};

export default Provider;
```

```js
// cusContxt

import { createContext } from "react";

const cusContxt = createContext({
  login: false,
  useLogin: () => {},
  useLogout: () => {},
});

export default cusContxt;
```

리덕스 Provider 와 같이
사용하고자 하는 컴포넌트에 감싸준다.

```jsx
<Provider>
  <App />
</Provider>
```

```jsx
//App.js
import React, {useContext} from 'react';

import cusContxt from './cusContxt'

const {login} = useContext(cusContxt);

이제 context login 상태관리 가능.

```

### useContext

```js
const UserContext = React.createContext();

const Content = () => {
  const context = React.useContext(UserContext);

  return (
    <section className={`name-${context.name}`}>
      <button onClick={context.switchName}>Switch Name</button>
    </section>
  );
};

function App() {
  const [name, setName] = React.useState("kim");
  const switchName = () => {
    name === "kim" ? setName("lee") : setName("kim");
  };
  return (
    <UserContext.Provider value={{ name, switchName }}>
      <Content />
    </UserContext.Provider>
  );
}
```
