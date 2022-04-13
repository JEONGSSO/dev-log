## GraphQL 기반의 플랫폼인 Apollo 간단 정리

### 글로벌 저장소와 캐시 등을 제공하는 Apollo는 Client 와 Server로 나뉘어 있다.

client는 React뿐만 아니라, 앵귤러, 뷰, ios, 안드로이드 등 다양한 환경에서 사용할 수 있다고 한다.
server는 Node.js 기반의 HTTP 서버로 작동한다.

client와 server를 이용해 GraphQL 기반의 데이터를 용이하게 관리할 수 있다.

apollo와 React Router v4 사용시 SSR 프로세스

![SSR-Process](https://d2.naver.com/content/images/2019/01/helloworld-201811-apollo_03.png)

1. React Router v4에서 라우팅 경로에 맞는 컴포넌트를 렌더링한다.
2. 컴포넌트를 렌더링할 때, Apollo Client를 통해 필요한 리소스를 받은 후 HTML코드로 변환.
3. 서버에서 받은 HTML코드로 클라이언트 렌더링 시작.

redux와 universal Router사용시보다 장점을 찾아보면

- 라우팅 경로에 상관없이 컴포넌트별로 필요 리소스만 가져올 수 있다.
- 리소스를 불러오는 시간이 긴 컴포넌트는 렌더링 후, 클라이언트 렌더링 실행할 때 가져오게 할 수 있다.
- 라우팅 경로에 의존성이 사라져 재사용 가능한 컴포넌트가 생긴다.
- 내부에 분기가 없는 하나의 라우터 코드로 클라이언트 렌더링과 서버 렌더링을 실행가능
- redux에서 action과 reducer없이도 필요한 리소스를 컴포넌트에서 사용할 수 있다.

---

## Apollo Hooks란

Apollo client로 React개발할 때 GraphQl API를 호출할 수 있는 새로운 방법.

기존 react-apollo에서는 <Query/>, <Mutation/> 과 같은 고차 함수 컴포넌트(HOC)를 사용해 제공했으나
React 16.8버전에서 react hooks가 나오게 되면서 많은 라이브러리들(redux, react-router, ...)이 hooks를 사용해 새로운 표현법을 만들고있다.

---

## apollo Client 사용법

```bash
npm i apollo-boost graphql graphql-tag
```

- Apollo Boost

  - apollo-client: js앱을 위한 상태관리 라이브러리 GraphQL 쿼리를 작성하면 데이터를 요청하고, 상태에 따라 UI를 업데이트하거나, 캐싱처리를 맡는다.
  - apollo-cache-inmemory: apollo에서 권장하는 캐시 옵션.
  - apollo-link-http: 데이터를 가져오기 위한 원격 저장소를 지정하는곳.
  - apollo-link-error: 오류처리를 위한 apollo 링크를 지정하는곳.

- graphql(npm)은 GraphQL스펙을 js언어로 만든것이고,
- graphql-tag은 GraphQL 쿼리를 파싱해주는 템플릿 리터럴 태그입니다.

---

## apollo Client 만들기

```js
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const client = new ApolloClient({
  link: createHttpLink({ uri: "https://countries.trevorblades.com" }),
  cache: new InMemoryCache(),
});
```

---

## GraphQL API 사용

```js
// query()메소드는 query와 variables를 인자로 받는데, query엔 gql템플릿 리터럴 쿼리를 할당한다.
// variables는 지금 사용하고 있지 않기 때문에 이번 예제에서는 생략

(async function () {
  const { loading, error, data } = await client.query({
    // query엔 gql템플릿 리터럴 쿼리를 할당한다.
    // 주의할 점은 query()는 Promise 객체를 리턴한다.
    // 그래서
    query: gql`
      query {
        continents {
          name
          code
        }
      }
    `,
  });

  console.log(loading);
  console.log(error);
  console.log(data);
})(); //IIFE
```

---

## apollo hooks 사용하기

```bash
$ npm i @apollo/react-hooks
```

redux Provider처럼 가장 최상위 컴포넌트에 ApolloProvider를 감싸준다. )CRA는 App.js

```js
// App.js

import React from "react";
import { ApolloProvider } from '@apollo/react-hooks';
import CustomComponenet from "./CustomComponenet";

function App () {
   return (
      <ApolloProvider>
         <CustomComponenet>
      </ApolloProvider>
   )
}
```

```jsx
// CustomComponenet.js

import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_CONTINENTS = gql`
  query {
    continents {
      code
      name
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_CONTINENTS); //useQuery에 넘김
  if (loading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러!</p>;
  }
  return (
    <ul>
      {data.continents.map((code, name) => {
        <li key={code}>{name}</li>;
      })}
    </ul>
  );
};
```

[여기서](https://www.apollographql.com/docs/react/api/react-hooks) apollo hooks api확인 가능

출처 : https://d2.naver.com/helloworld/2838729
https://www.daleseo.com/graphql-apollo-client/
https://www.daleseo.com/graphql-react-apollo-hooks/
