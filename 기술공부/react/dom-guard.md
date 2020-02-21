특정 페이지에 들어갈 때 로그인이 필요하거나 인증후 들어가야하는 페이지가 있다.

그런 페이지를 Hoc를 이용해 비 로그인 상태일 때, Redirect시켜주는 간단한 예제

codesandbox에서 간단히 실행 Dependency는 react-router-dom 설치

```
//index.js

import React from "react";
import ReactDOM from "react-dom";
import { LandingPage, Home } from "./component/Landing.page";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NotFoundPage from "./component/NotFoundPage";
import ProtectedRoute from "./component/Protected.route";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <ProtectedRoute path={"/app"} component={LandingPage} />
        <Route path={"*"} component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

> Switch 기존 Switch 문을 생각하면 편하다, 위에서 아래로 매치되는게 있으면 하나만 선택해 주는역할  
>    스위치가 없다면 path \*과 다른 컴포넌트가 같이 보인다.

component 폴더 생성

component폴더 안에 간단한 인증절차를 만들 수 있는 auth.js 생성

```
class auth {
  constructor() {
    this.authenticated = false;
  }

  login(callback) {
    this.authenticated = true;
    callback();
  }

  logout(callback) {
    this.authenticated = false;
    callback();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new auth();

```

페이지를 보여줄 LandingPage 컴포넌트 생성

```
import React from "react";
import { Link } from "react-router-dom";

import auth from "./auth";

const LandingPage = props => (
  <div>
    <Link to={"/"}>Home</Link>
    <hr />
    <button
      onClick={() => {
        auth.logout(() => {
          props.history.push("/"); //auth.logout 메소드의 callback()으로 들어감
        });
      }}
    >
      logout
    </button>
  </div>
);

const Home = props => (
  <div>
    <Link to={"/app"}>App</Link>
    <hr />
    <button
      onClick={() => {
        auth.login(() => {
          props.history.push("/app"); //auth.logout 메소드의 callback()으로 들어감
        });
      }}
    >
      login
    </button>
  </div>
);

export { LandingPage, Home };

```

HOC로 로그인을 판단해줘 라우팅을 해주는 WithProtectedRoute생성

HOC는 with를 붙이는 네이밍이 보편적으로 쓰이고, with + 실제로 주입 될 props명을 적어주는게 좋다.

```
import React from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "./auth";

const WithProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) { //로그인 상태 판단
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/not",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default WithProtectedRoute;

```

컴포넌트를 주입받아 분기 후 컴포넌트를 리턴해주거나, 다른페이지로 이동시켜주는 행동을 한다.

로그인버튼을 누르면 app라우팅이 정상적으로 동작하지만, 위에 Link App을 누르거나, 주소 app을 입력하면

NOT FOUND 페이지로 이동한다.

출처:

[https://www.youtube.com/watch?v=Y0-qdp-XBJg](https://www.youtube.com/watch?v=Y0-qdp-XBJg)
