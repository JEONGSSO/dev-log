웹팩 빌드 후 번들의 정보를 알려주는 라이브러리이다.

https://www.npmjs.com/package/webpack-bundle-analyzer

nuxt를 사용하고 있어

nuxt.config에서

```js

export default {
  build: {
    analyze: true,
    // or
    analyze: {
      analyzerMode: 'static'
    }
  }
}

```

```bash

npm nuxt build -a를 실행하면 끝

```

