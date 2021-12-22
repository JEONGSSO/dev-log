## Unexpected token 'export'

ts 구문이 있는 js 파일들이 있을 수 있는데 그럴때 npm에 올라갈때 컴파일되어 올라가지 않는 파일이 있을때 무시하는 구문을 추가해야한다.
transformIgnorePatterns를 추가 하는 것으로 수정 할 수 있다.

```ts
...
"jest": {
    "transformIgnorePatterns": [
      "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ]
  }
  ...
```

### 참조

https://stackoverflow.com/questions/49263429/jest-gives-an-error-syntaxerror-unexpected-token-export
