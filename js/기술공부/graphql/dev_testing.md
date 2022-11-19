## 개발자도구

- [GraphOS](https://www.apollographql.com/docs/graphos/)

  - 협업을 위한 apollo 플랫폼
  - graphql을 위한 여러가지 도구들을 포함함.
  - 스키마의 어떤 부분이 자주 사용되는지 누가 사용하는지 알 수 있음.

- apollo client 개발자 도구 확장 기능
  - 서버에 쿼리를 보내거나 어떤 데이터가 로드되었는지 확인 가능.
  - 쿼리 검사기 (watch)
  - mutation 검사기
  - 캐시 검사기

## 타입스크립트 사용

### useQuery

```ts
const GET_ROCKET_INVENTORY = gql(/* GraphQL */ `
  query GetRocketInventory($year: Int!) {
    rocketInventory(year: $year) {
      id
      model
      year
      stock
    }
  }
`);

const { loading, data } = useQuery(GET_ROCKET_INVENTORY, {
  variables: { year: 2019 },
});
```

### useMutation

```ts
const SAVE_ROCKET = gql(/* GraphQL */ `
  mutation saveRocket($rocket: RocketInput!) {
    saveRocket(rocket: $rocket) {
      model
    }
  }
`);

const [saveRocket, { error, data }] = useMutation(SAVE_ROCKET, {
  // variables are also typed!
  variables: { rocket: { model, year: +year, stock: +stock } },
});
```

### useSubscription

```ts
const LATEST_NEWS = gql(/* GraphQL */ `
  subscription getLatestNews {
    latestNews {
      content
    }
  }
`);

const { loading, data } = useSubscription(LATEST_NEWS);
```

## [Testing React components](https://www.apollographql.com/docs/react/development-testing/testing)

### The MockedProvider component

- ApolloProvider 대신 MockProvider를 감싸서 테스트를 진행 할 수 있다.
  - 네트워크 통신을 직접하는것이 아닌 모킹데이터를 사용

```tsx
<MockedProvider mocks={mocks} addTypename={false}>
  <Component name="Buck" />
</MockedProvider>
```

- addTypename는 \_\_typename을 예상해서 테스트하지 않는 이상 false로 두고 쓰면 된다.

### EZStorage SignIn 테스트 코드 보기

### Testing error states

- 네트워크 오류
  - request 밖에있는 error 테스트
  ```ts
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: "Buck" },
    },
    error: new Error("An error occurred"),
  };
  ```
- GraphQL 오류
  - request 내부에 errors 테스트
  - PrintedInvoices.test 코드 보기

### Testing with the cache

```tsx
const cache = new InMemoryCache({
  // ...configuration options...
})

<MockedProvider mocks={mocks} cache={cache}>
  <DeleteButton />
</MockedProvider>,
```

### Testing local state

MockedProvider는 다음과 같이 자체 ApolloClient 인스턴스를 생성합니다.

```tsx
const { mocks, addTypename, defaultOptions, cache, resolvers, link } =
  this.props;

const client = new ApolloClient({
  cache: cache || new Cache({ addTypename }),
  defaultOptions,
  link: link || new MockLink(mocks || [], addTypename),
  resolvers,
});
```

- 저번시간에 배운 @client 필드로 수행할 작업을 MockProvider에 알려주어야 apollo client 인스턴스가 제대로 동작함.
- 그렇게 client에 있는 상태를 cache로 넘겨주면 됨.

```tsx
<MockedProvider mocks={mocks} cache={cache}>
```

## Mocking schema capabilities

- 서버에서 질의되기 전에 클라이언트에서 4개의 방법으로 테스트 작성이 가능하다

```ts
type Rocket {
  id: ID!
  name: String
  type: String
  description: String # field not yet supported
}
```

1. 클라이언트 측에서 스키마를 정의하는 방법 (권장)

- 위에서 아직 지원되지 않는 description 필드를 추가

```tsx
const typeDefs = gql`
  extend type Rocket {
    description: String
  }
`;
```

```tsx
// 그 다음 ApolloClient를 인스턴스화 할때 typeDefs를 추가
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  typeDefs,
});
```

2. read 함수 정의

- 클라이언트에서 아직 Rocket.description 필드를 모르기때문에 캐시를 사용하여 함수 정의 가능

```tsx
const cache = new InMemoryCache({
  typePolicies: {
    Rocket: {
      fields: {
        description: {
          read() {
            // Read function for Rocket.description
            // 임의 문자열
            return "Placeholder rocket description";
          },
        },
      },
    },
  },
});
```

3. @client 지시어 사용하여 쿼리하기

```tsx
export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
        description @client
      }
    }
  }
`;
```

- @client 지시어를 포함하여 서버로 보내는 쿼리에 description를 포함하지 않도록 지시함

- useQuery를 사용하여 GET_LAUNCH_DETAILS를 사용하면 description 필드 포함 완성!

4. 추후 서버에서 질의가 되었다면 해야할 일

- @client 지시어를 쿼리에서 제거합니다.
- field에 read 함수를 제거하거나 임의 문자열 대신 캐시된 값을 사용하게 수정
