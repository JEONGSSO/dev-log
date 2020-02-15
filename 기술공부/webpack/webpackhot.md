# Webpack hot module

기존 webpack-dev-server를 사용하면 웹팩 설정에

   {hot: true}를 적어주면 되지만

serverside rendering 할때는

webpack-dev-middleware (wdm)과 webpack-hot-middleware(whm)를 사용해서

```js
   if (process.env.NODE_ENV !== 'production') {
   const webpack = require('webpack');
   const webpackConfig = require('../webpack.client.js');

   const webpackDevMiddleware = require('webpack-dev-middleware');
   const webpackHotMiddleware = require('webpack-hot-middleware');

   const compiler = webpack(webpackConfig);

   app.use(
      webpackDevMiddleware(compiler, {
         logLevel: 'silent',
         publicPath: webpackConfig.output.publicPath,
      }),
   );

   app.use(webpackHotMiddleware(compiler));
   }
```

webpack.client.js 에서

```js
const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true`;

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: [hotMiddlewareScript, './src/index.tsx'], // 설정

  ...

  module: {
     rules: {
        ....
     },

     ...

     plugins: {
        new webpack.HotmoduleReplacementPlugin(), //설정
        ...
     }
  }
```
구조에따라 다르게 핫모듈 미들웨어를 설정해주면 된다.

출처: https://medium.com/@minoo/react-typescript-ssr-code-splitting-환경설정하기-d8cec9567871