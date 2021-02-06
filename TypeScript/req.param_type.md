```ts
const { idx }: string = req.params;
```

Type 'ParamsDictionary' is not assignable to type 'string'.ts(2322)
Property 'idx' does not exist on type 'String'.

req.params의 타입이 Dictionary<String> 처럼 되어있어 밑에 예제처럼 설정해야 한다.

```ts
const { idx }: { idx?: string | undefined } = req.params;
```

https://jamong-icetea.tistory.com/308
