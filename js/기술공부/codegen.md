https://www.graphql-code-generator.com/docs/config-reference/codegen-config

```yml
schema: ${API_URL:http://localhost:3000} # 디폴트 값을 설정 해놓을 수 있다.
documents: ./src/**/*.graphql
generates:
  ./src/types.ts:
    plugins:
      - typescript
      - typescript-operations
```

package.json

```json
...
"scripts": {
  ...
  "codegen": "graphql-codegen --config codegen.yml -r dotenv/config",
  ...
}
...
```

dotenv 파일을 통해 schema의 API_URL 값을 변경 시킬 수 있다.

.env

```
#API_URL=http://localhost:4962
```
