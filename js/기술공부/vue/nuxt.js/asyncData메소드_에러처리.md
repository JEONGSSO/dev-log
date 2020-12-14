.nuxt/index.js
NuxtError에 들어가는 vue 파일에 error가 바인딩 됨.
```js

async asyncData({ query, params, error }) {
   error({statusCode: 404, message: 'Page Not Found'})
}

```