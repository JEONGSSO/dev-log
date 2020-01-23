# Express 사용해서 리액트 SSR 구현하기


## client
express에서 js파일을 스트링으로 내리기 위해 리액트에서 제공하는 renderToString을 사용해 문자열로 만들어준다.

```js
//client/index.jsx

import React from 'react';
import { hydrate } from 'react-dom'; // hydrate 메소드는 html 구조를 불러오고나서  JS이벤트를 채워주는 메소드
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from '/client/App';

const preloadedState = window.__STATE__
delete window.__STATE__
const store = initializeStore(preloadedState) //initializeStore 함수는 따로 만들어야한다.

const render = (Component) =>  //사용방법은 ReactDom.render 메소드와 같다.
hydrate(
    <BrowserRouter>
      <Provider store={store}> //서버단에서 가져온 상태들을 다시 넣어준다.
        <Component />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  )
render(App);

```

```jsx
//client/App.jsx //본격적으로 이 파일을 renderToString 한다.

import React from 'react';
import Helmet from 'react-helmet'; // 각 컴포넌트마다 title을 설정할 수 있다.


export default () => 
<div>
   <Helmet>
      <title>React Helmet :: App</title>
   </Helmet>
   GOOD
</div>

```

## server
express에서 js파일을 스트링으로 내리기 위해 리액트에서 제공하는 renderToString을 사용해 문자열로 만들어준다.
밑의 코드는 redux까지 붙여서 작성한 예시 동작안됨.

```js
//server/index.js
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from 'client/App';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

async function getInitialProps(store) {
  try {
    await Promise.all([
      // non-promise values will be ignored, but the evaluation will be done asynchronously
      store.dispatch(fetchData()),
    ])
  } catch (e) {
    console.error(e)
  }
  return {}
}

const Head = () => 
<>
   <title>SSR APP</title>
   <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
   <meta httpEquiv="Imagetoolbar" content="no" />
   <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
   <meta name="autocomplete" content="off" />
   <meta name="author" content="lol.gg" />
   <meta charSet="UTF-8" name="viewport" content="width=1903,minimum-scale=0.1"/>
</>

const renderFullPage = (html, preloadedState, js) =>
`
   <!doctype html>
   <html>
   <head>
      ${renderToString(<Head />)}
   </head>
   <body>
      <div id="root">${html}</div>
      <script>
         window.__STATE__ = ${serialize(preloadedState)}
      </script>
      ${js} /* 렌더 하고자하는 js파일 */
      </body>
   </html>
`

app.get('/' (req, res) => { // 루트 경로로 들어왔을 때  
    const store = initializeStore();
    getInitialProps(store).then(() => {
      try {
        const html = renderToString(
          <StaticRouter location={req.url}>
            <Provider store={store}>
              <App />
            </Provider>
          </StaticRouter>
        )
        const preloadedState = store.getState()
        res.send(renderFullPage(html, preloadedState)) //App 컴포넌트를 renderToString으로 만든 renderFullPage를 리턴해주면 된다.
      } catch (error) {
        console.error('SERVER.JS DATA PRELOADED ERROR', error)
      }
    })
})

app.listen(port, `on port ${port}`);

```