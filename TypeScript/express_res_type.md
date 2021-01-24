```ts
// res: Response 에서 기존 Response 타입을 사용하면
// res.json 에서 Expected 0 arguments, but got 1. 에러가 난다

export const userInfo = async (req: Request, res: Response) => {
  const [ result ]: Array<Object> = await userServices.userInfo()
  return res.json(result) // Expected 0 arguments, but got 1.
}
```
그래서 @types/express 모듈을 받아 import 후 express에서 제공하는 Response 타입을 사용하면 된다

``` ts
import { Response } from 'express'

export const userInfo = async (req: Request, res: Response) => {
  const [ result ]: Array<Object> = await userServices.userInfo()
  return res.json(result)
}
```

https://stackoverflow.com/questions/58567145/types-for-req-and-res-in-express