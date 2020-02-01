```js
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const client = () => {
  return new ApolloClient({
    cache: new InMemoryCache().restore({}), // 데이터스키마 정의해주면 됨
    uri: 'https://countries.trevorblades.com'
  });
};

import App from './App';

import './static/css/main.scss';

const render = App =>
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
  );

render(App);
```

express ssr로 불러왔을 때 client를 못찾는 문제가 있었다.

apollo document apollo-boost에는 ssrMode 옵션을 뺀것 같다.
예전 버전에 있던 apollo-client 모듈에 ssrMode: true 옵션을 설정해주거나

@apollo-react-ssr 모듈을 사용하면 될 것 같다.
