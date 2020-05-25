```js

fs.readdirSync(`${__dirname}/routes/`)
    .reduce((preRoutes, nextRoutes) => {
        const routes = require(`${__dirname}/routes/${nextRoutes}`).Routes
        return [...preRoutes, ...routes]
    }, [])
    .forEach((r) => {
        const { endpoint: e, method: m, controller: c } = r
        router[m](e, c)
    })

app.use('/', router)

```

next 처럼 파일 구조에 따라 엔드포인트를 동적으로 구성한 것.
사수분의 코드