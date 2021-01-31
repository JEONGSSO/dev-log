```json
...

"scripts": {
    "test": "jest",
    "dev": "pm2 start src/app.ts --watch"
  },

...
```

여기서 만약에 Interpreter ts-node ~~ not Available 에러가 뜬다면

    pm2 install typescript

알아서 typescript와 ts-node를 설치 후 사용가능하게 해준다.

https://pm2.io/docs/runtime/integration/transpilers/
