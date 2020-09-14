# JSON Web Token 이하 JWT

api 서버에서 로그인 할 때 토큰을 발급받아
해당 토큰을 로컬 스토리지 또는 쿠키에 저장을 해놓고
ajax요청시에 header에 토큰을 넣어 인증하는 방식

로그인 완료 후 클라이언트단에서는 로그인이 유지가 되는데
새로고침 즉, 서버단에서는 로그인이 풀리는 현상이 있었다.

```js
// plugins/axios.js

// @nuxt/axios에서 제공하는 onRequest를 사용해서 요청시에 무조건 헤더에 토큰을 넣어주는 방식으로 처리를 한다.
export default function ({$axios, app}) {
   $axios.onRequest((config) => {
    const token = app.$cookies.get('token')
    if (token) {
      config.headers.common['Auth'] = `Bearer ${token}`
    }
  })
}
```

```js
//nuxt.config.js

// 설정파일에 작성한 axios 파일을 넣으면 서버 렌더링시에도 header에 토큰을 담아 통신 할 수 있다.

...

plugins: [
    '~/plugins/axios',
   ...
]

...


```