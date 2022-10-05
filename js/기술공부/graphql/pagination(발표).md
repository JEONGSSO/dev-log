# Cursor-based pagination

- 시작하기 전에 Core API를 읽은 것이 도움이 됩니다.

## 커서로 리스트 페이징 적용하기

- 페이지 목록 내의 숫자 오프셋은 신뢰성이 떨어진다. (리스트에 CRD가 일어났을때 순서보장이 어려움)
- 커서 아이디(고유한 식별자)를 사용하여 페이징을 적용하여 해결할 수 있다.

- 리스트가 중복 되지 않음을 보장하는 경우, 이 식별자는 고유 ID가 될 수 있으며,
- 목록의 마지막 객체의 ID를 사용하여 일부 제한 argument와 함꼐 추가 페이지를 요청 할 수 있다.

- 새로운 페이지 시작 직전에 항목을 식별하기 때문에 요청된 커서 ID(해당 커서 ID를 가지고 있는 요소)가 새 페이지에 나타나지 않습니다.

- 목록의 요소는 정규화된 참조개체일 수 있으므로 readField helper함수를 사용하여 병합 및 읽기 함수에 id를 넘겨야 함.

```js
function offsetFromCursor(items, cursor, readField) {
  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];
    if (readField("id", item) === cursor) {
      return i + 1;
    }
  }
  return -1;
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: ["type"],
          merge(existing, incoming, { args: { cursor }, readField }) {
            const merged = existing ? existing.slice(0) : [];
            // 캐시를 병합 할 때 offsetFromCursor 함수를 임의로 만들어 merged, cursor와 readField를 사용하여 offset을 계산
            let offset = offsetFromCursor(merged, cursor, readField);

            if (offset < 0) offset = merged.length;

            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },

          read(
            existing,
            { args: { cursor, limit = existing.length }, readField }
          ) {
            if (existing) {
              // 캐시된 리스트를 읽을때도 사용
              let offset = offsetFromCursor(existing, cursor, readField);

              if (offset < 0) offset = 0;

              return existing.slice(offset, offset + limit);
            }
          },
        },
      },
    },
  },
});
```

- id필드를 변경하지 않고 추가,제거 또는 이동할 수 있기 때문에 이 페이징 전략은 offset 기반 전략보다

  mutation에 더 유연하게 대처 할 수 있다.

- 그러나 이 전략은 병합 기능이 기존데이터에 새 페이지를 추가할 때(무한스크롤, fetchMore 같은 상황) 유용하게 사용 할 수 있다.

  커서가 기존 데이터의 중간에 있는 경우는 사용하기 어려운 전략이다. (데이터 덮어쓰기 주의해야 하기 때문)

## 변경점이 있는 id만 데이터 변경하고, 병합하기

```js
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: ["type"],

          // While args.cursor may still be important for requesting
          // a given page, it no longer has any role to play in the
          // merge function.
          merge(existing, incoming, { readField }) {
            const merged = { ...existing };
            incoming.forEach((item) => {
              merged[readField("id", item)] = item;
            });
            return merged;
          },

          // Return all items stored so far, to avoid ambiguities
          // about the order of the items.
          read(existing) {
            return existing && Object.values(existing);
          },
        },
      },
    },
  },
});
```

- 이렇게 동일한 ID필드를 가진 항목만 대체 할 수 있다.
- 그러나 이 방식은 다음페이지 요청시에 어떤 커서를 사용해야 하는지에 대해 생각해봐야함
  - 지금 같은 상황에서는 id필드를 다음 요청 커서로 사용할 수 있다.

## 커서를 항목과 별개로 유지

- 커서는 대부분 항목의 ID필드로 사용하지만 다르게 사용하는 방법도 있다.
- 리스트가 중복되거나 기준에따라 정렬 또는 필터링 될 수 있는 경우 커서는 리스트 내의 위치 뿐만 아니라

  리스트를 생성한 정렬 또는 필터링 위치도 알아야 할 수 있다.

```js
const MORE_COMMENTS_QUERY = gql`
  query MoreComments($cursor: String, $limit: Int!) {
    moreComments(cursor: $cursor, limit: $limit) {
      cursor   ${/*커서가 목록에 요소에 속하지 않으므로 커서는 목록과 별도로 사용됨 */}
      comments {
        id
        author
        text
      }
    }
  }
`;

// 사용하는 부분
function CommentsWithData() {
  const { data, loading, fetchMore } = useQuery(MORE_COMMENTS_QUERY, {
    variables: { limit: 10 },
  });

  if (loading) return <Loading />;

  return (
    <Comments
      entries={data.moreComments.comments || []}
      onLoadMore={() =>
        fetchMore({
          variables: {
            cursor: data.moreComments.cursor,
          },
        })
      }
    />
  );
}
```

- moreComments의 구현은 다음과 같다.

```js
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        moreComments: {
          merge(existing, incoming, { readField }) {
            const comments = existing ? { ...existing.comments } : {};
            incoming.comments.forEach((comment) => {
              comments[readField("id", comment)] = comment;
            });
            return {
              cursor: incoming.cursor,
              comments,
            };
          },

          read(existing) {
            if (existing) {
              return {
                cursor: existing.cursor,
                comments: Object.values(existing.comments),
              };
            }
          },
        },
      },
    },
  },
});
```

- 커서가 쿼리의 일부로 저장되고 반환되기 때문에 커서의 모호성(ambiguity)이 줄어듬(리스트가 sort되어 cursor로 사용하는 id의 순서가 바뀐다던지 하는 경우)

## Relay-style cursor pagination

- InMemoryCache field policy api는 페이징을 자유롭게 할 수 있다.

- read또는 merge 함수가 가지는 유연성이 없는 graphQL 클라이언트를 설계하는 경우 페이지 분할을 표준화 할 가능성이 높다.
- Relay와 최대한 호환되도록 Relay 연결 규격을 채택함.
- Relay 연결을 사용하는것은 커서와 비슷하지만 쿼리 응답 형식이 달라 관리하는 방법이 다르다.

```js
const COMMENTS_QUERY = gql`
  query Comments($cursor: String) {
    comments(first: 10, after: $cursor) {
      edges {
        node {
          author
          text
        }
      }
      ${/* pageInfo 커서와 next페이지가 있는지 여부가 있음*/}
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

function CommentsWithData() {
  const { data, loading, fetchMore } = useQuery(COMMENTS_QUERY);

  if (loading) return <Loading />;

  const nodes = data.comments.edges.map((edge) => edge.node);
  const pageInfo = data.comments.pageInfo;

  return (
    <Comments
      entries={nodes}
      onLoadMore={() => {
        // hasNextPage 유무에따른 작업
        if (pageInfo.hasNextPage) {
          fetchMore({
            variables: {
              cursor: pageInfo.endCursor,
            },
          });
        }
      }}
    />
  );
}
```

- Relay 패아징은 read 및 merge 함수를 사용하여 아폴로에서 구현 가능

  위의 예제의 edges와 pageInfo를 하나의 재사용 가능한 헬퍼함수로 추상화 할 수 있음을 의미

```js
import { relayStylePagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        comments: relayStylePagination(),
      },
    },
  },
});
```

https://github.com/apollographql/apollo-client/blob/main/src/utilities/policies/pagination.ts#L95

헬퍼 함수 relayStylePagination 만들어 두었음.

https://relay.dev/docs/guides/graphql-server-specification/#further-reading

실제로 Relay에서 edges, pageInfo를 사용하는 예제

- relayStylePagination는
  - Apollo Client를 사용하여 릴레이 pagination api를 사용 할 때 relayStylePagination는 처음으로 고려해볼만한 좋은 헬퍼함수이다.
  - relayStylePagation함수는 Args를 무시하고, 사용가능 데이터를 반환하는 read 함수로 필드 정책을 생성함.
  - fetchMore에서 relayStylePagation를 더 쉽게 사용 가능함.
  - Non-paginated read function임
    - offset, limit 인수를 무시하도록 선택할 수 있고
    - 캐시에 있는대로 전체 목록을 반환함.

# Key arguments in Apollo Client

- keyArgs 구성과 관련된 고려 사항에 대해 알아보기 전에 Corepagation API를 읽는 것이 좋습니다.

- Apollo Client 캐시는 단일 스키마 필드에 대해 여러 항목을 저장할 수 있습니다.

```graphql
type Query {
  # Returns whichever User object corresponds to `id`
  user(id: ID!): User
}
```

```js
{
  'ROOT_QUERY': {
    'user({"id":"1"})': {
      '__ref': 'User:1' // storage key
    },
    'user({"id":"2"})': {
      '__ref': 'User:2' // storage key
    }
  }
}
```

- 위에 표시된 것처럼 각 항목의 storage key에는 해당 인수 값이 포함됩니다.

  즉, 필드의 인수가 쿼리 간에 다르면 storage key도 다르고, 고유한 캐시 항목을 생성합니다.

- 인수가 없으면 storage key 해당필드 이름만 됨 ex) '\_\_ref': 'User'

- 캐시는 데이터를 날리지 않고 서로 다른 인수 조합(id 1, 2)에 대해 반환된 값을 병합할 수 있는지 여부를 알 수 없다.
- 그러므로 캐시는 ID 1과 2의 User에 대한 쿼리 결과를 병합해서는 안된다.

### [Pagination issues](https://www.apollographql.com/docs/react/pagination/key-args#pagination-issues)

- 페이지 목록과 관련된 arguments 특정 arguments로 인해 캐시가 별도의 항목을 저장해서는 안된다.

```graphql
type Query {
  feed(offset: Int, limit: Int, category: Category): [FeedItem!]
}
```

- offset 및 limit arguments를 사용하면 클라이언트가 가져올 페이지를 지정할 수 있다.

```graphql
# First query
query GetFeedItems {
  feed(offset: 0, limit: 10, category: "SPORTS")
}

# Second query
query GetFeedItems {
  feed(offset: 10, limit: 10, category: "SPORTS")
}
```

- 인수 값이 다르기 때문에 별도로 캐시됨.
- 즉, 두번째 쿼리가 완료되어 반환된 리스트가 첫번째 리스트 뒤에 추가되지 않고 덮어씀

```js
{
  'ROOT_QUERY': {
    // First query
    'feed({"offset":"0","limit":"10","category":"SPORTS"})': [
      {
        '__ref': 'FeedItem:1'
      },
      // ...additional items...
    ],
    // Second query
    'feed({"offset":"10","limit":"10","category":"SPORTS"})': [
      {
        '__ref': 'FeedItem:11'
      },
      // ...additional items...
    ]
  }
}
```

- 캐시 storage key에 offset또는 limit이 포함되지 않도록 해야함
- 우리는 캐시가 두 쿼리 결과를 단일 캐시 항목으로 병합하길 원한다.
- 이 경우를 처리하기 위해 필드에 대한 주요 arguments를 설정 할 수 있다.

### Setting keyArgs

- keyArgs는 해당 필드에 캐시 storage key에 포함된 graphQL 필드에 대한 arguments 입니다.
- 특정 필드에 대한 캐시 필드 정책을 정의하여 override 할 수 있다.

```js
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: ["category"], // category
        },
      },
    },
  },
});
```

- 이렇게 keyArgs를 지정하면 feed는 keyArgs배열을 포함한다.

  이는 캐시가 storage key에 포함해야 하는 모든 인수의 이름을 포함한다.

- keyArgs를 예제와 같이 설정한 후에는 Sports feed에 대한 단일 캐시 엔트리가 생성됩니다(스토리지 키에는 오프셋과 제한이 없음).

```js
{
  'ROOT_QUERY': {
    'feed({"category":"SPORTS"})': [ // offset, limit이 없이 sports만
      {
        '__ref': 'FeedItem:1'
      },
      // ...additional items from first query...
      {
        '__ref': 'FeedItem:11'
      },
      // ...additional items from second query...
    ]
  }
}
```

### 중요: 쿼리와 같은 페이지 목록 필드에 대해 keyArgs를 정의한 후. feed 또한 필드에 대한 merge 함수를 정의해야 합니다. 그렇지 않으면 두 번째 쿼리에 의해 반환된 목록이 첫 번째 목록과 병합되는 대신 덮어씁니다.

## Supported values for keyArgs

- keyArgs에는 다음과 같은 값이 들어갈 수 있다.
  - false (필드에 key arguments가 없다는 뜻)
  - argument, 지시어 및 변수 이름의 배열
  - 함수

### keyArgs array

- 캐시된 필드의 storage key는 배열에 포함된 모든 인수, 지시어 및 변수의 값을 사용합니다.

```js
// arguments 이름
// category와 id는 필드의 두 arguments입니다.
["category", "id"];

// subfields 이름
// details내부의 name과 date를 keyArgs 추가하기
["details", ["name", "date"]];

// Directive(지시어) 이름 (@과 사용)
// 하나 이상의 인수가 있는 지시어 이름(선택사항)
// 필드에 적용할 수 있는 지시어이며 type인수를 가지고 있습니다.
["@units", ["type"]];

// 변수 이름 ($과 사용)
["$userId"];
```

### keyArgs function (advanced)

- keyArgs에 사용자 지정 함수를 제공하여 필드의 storage key와 다른 형식을 정의 할 수 있다.
- FieldPolicy API reference에서 심화 학습 가능

## Which arguments belong in keyArgs?

- keyArgs에 포함할 필드의 arguments를 결정할때 모든 arguments가 있는 것(all arguments)과 없는 것(no arguments)을 고려하여 시작하면 도움이 됨.
- 이렇게 해놓으면 argument를 추가하거나 제거할 때 용이함.

### Using all arguments

- 모든 arguments가 키 arguments인 경우(default)
- 필드에 대한 arguments가 값의 모든 고유한 조합은 고유한 캐시 항목을 생성함.
- 즉, arguments값을 변경하면 storage key가 달라지므로 별도로 저장됨

```js
{
  'ROOT_QUERY': {
    // First query
    'feed({"offset":"0","limit":"10","category":"SPORTS"})': [
      {
        '__ref': 'FeedItem:1'
      },
      // ...additional items...
    ],
    // Second query
    'feed({"offset":"10","limit":"10","category":"SPORTS"})': [
      {
        '__ref': 'FeedItem:11'
      },
      // ...additional items...
    ]
  }
}
```

- 이 방법을 사용하면 필드의 모든 arguments가 이전 캐시값과 일치하지 않는 한 캐시된 값을 반환 할 수 없다.
- 즉 First query, Second query의 arguments가 다르므로 storage key의 값이 달라져 First query 반환된 캐시값을 가져올 수 없음.
  - 단점 캐시가 일치하는 경우의수가 많이 감소됨
  - 장점 arguments가 달라지는게 맞을 경우 잘못된 값을 반환하는것을 방지

### Using no arguments

- keyArgs에 false를 설정한 경우 필드의 storage key는 필드 이름일뿐 argument값은 추가되지 않는다.
- 즉, 쿼리가 해당 필드의 값을 반환할 때마다 덮어쓰게됨

- 이러한 기본동작을 커스텀 해야할 경우 argument 값을 사용하여 덮어쓰지 않게 merge 및 read 함수로 캐싱값 변경가능

```graphql
type Query {
  feed(offset: Int, limit: Int, category: Category): [FeedItem!]
}
```

- 아깐 위 예제에 keyArgs category를 설정하여 서로 다른 카테고리의 feed 항목을 별도 유지했다.
- keyArgs를 false로 설정한 후 다음과 같이 merge와 read 함수를 사용하여 동일하게 만들 수 있다.

```js
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: false,

          read(existing = {}, { args: { offset, limit, category } }) {
            return existing[category]?.slice(offset, offset + limit);
          },

          merge(existing = {}, incoming, { args: { category, offset = 0 } }) {
            const merged = existing[category]
              ? existing[category].slice(0)
              : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            existing[category] = merged;
            return existing;
          },
        },
      },
    },
  },
});
```

- 위 코드에서 merge 및 read 함수에 전달된 existing 값은 feedItem[]다.
- 이 방식은 keyArgs를 category로 설정하는 것과 같으므로 동작 상 다를것 없다면 위에꺼 쓰자.

### Summary

- 필드의 데이터를 저장하고 검색하는 로직의 arguments가 다른값에 동일하고 고유한 필드 값이 서로 논리적으로 독립적이면 keyArgs를 쓰자.
- 기존 필드 데이터를 제한, 필터링, 정렬 또는 가공하는 인수는 일반적으로 keyArgs에 속하지 않는다.
  - 이런값을 키 Args에 저장하면 Storage key가(고유 값) 다양해져 캐시가 제 역할을 못할수 있기 때문에 지양한다.
- 일반적으로 read 및 merge 함수는 캐시된 필드 데이터로 거의 모든 작업을 처리 가능, keyArgs는 코드 복잡성이 적은 유사 기능을 제공하기 때문에 read 및 merge의 자유로움 보다 KeyArgs의 제한적이고 선언적인 API를 사용하는것이 좋다.

## The @connection directive

- connection directive는 아폴로가 지원하는 Relay에서 영감을 받음.
- 그러나 @connection를 사용하면 서버에 보내는 모든 쿼리에 포함해야 하지만 keyArgs로 구성하면 동일한 효과를 얻을 수 있어 keyArgs를 추천한다.

```js
const FEED_QUERY = gql`
  query Feed($category: FeedCategory!, $offset: Int, $limit: Int) {
    feed(category: $category, offset: $offset, limit: $limit) @connection(
      key: "feed",
      filter: ["category"]
    ) {
      edges {
        node { ... }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
```

@connection없이 위와 완전히 동일한 쿼리는 아래에와 같이 쓸 수 있다.

- Relay 사용방법

  ```js
  const FEED_QUERY = gql`
    query Feed($category: FeedCategory!, $offset: Int, $limit: Int) {
      feed(category: $category, offset: $offset, limit: $limit) {
        edges {
          node { ... }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;
  ```

- 그리고 field policy에서 아래처럼 설정한다.

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            keyArgs: ["category"],
          },
        },
      },
    },
  });
  ```

- 그런데 feed에서 category처럼 keyArgs로 사용할 수 있는 arguments가 없다면
- @connection을 사용하는것이 타당한 방법이다. 아래 예제

```js
const FEED_QUERY = gql`
  query Feed($offset: Int, $limit: Int, $feedKey: String) {
    feed(offset: $offset, limit: $limit) @connection(key: $feedKey) { 
      edges {
        node { ... }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
```

- $feedKey 변수에 다른 값을 사용하여 쿼리를 실행하면 해당 결과는 캐시에 별도로 저장된다(argument가 변하니까).
- 일반적으로는 동일한 목록에 저장됨
- 이렇게 keyArgs를 구성할때는 @connection 지시어를 사용해서 InMemoryCache에게 알랴줌.

```js
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: ["@connection", ["key"]],
        },
      },
    },
  },
});
```

- 위처럼 사용하게 될때 아래처럼 저장됨

```js
expect(cache.extract()).toEqual({
  ROOT_QUERY: {
    __typename: "Query",
    'feed:{"@connection":{"key":"some feed key"}}': { edges, pageInfo },
    'feed:{"@connection":{"key":"another feed key"}}': { edges, pageInfo },
    'feed:{"@connection":{"key":"yet another key"}}': { edges, pageInfo },
    // ...
  },
});
```

- keyArgs의 key와 @connection의 key는 @connection로 설정한 keyArgs만 고려됨을 의미.
- @connection에만 키 전달하는것이 적잘하지만 @connection이 아닌 keyArgs로 포함해야 한다면 직접 keyArgs를 써야함

```js
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: ["someArg", "anotherArg", "@connection", ["key"]],
        },
      },
    },
  },
});
```

- 만약 keyArgs에 없는 arguments가 들어갔을경우 필드키 생성에서 자동으로 생략됨.
- 모든 경우를 생각하지말고 지시어나 arguments에 keyArgs를 많이 적어주는 것이 안전하다 (사용할 것만 쓰라는말인듯).

- keyArgs 배열이 원하는 필드키를 지정하기에 충분하지 않다면 함수를 전달 할 수 있다.
- keyArgs 및 @connection은 페이징 처리된 필드보다 더 많은 경우에 유용하다.
- relayStylePagination는 keyArgs가 false로 구성되어 있어 relayStylePagination에 인자를 전달하여 keyArgs를 재구성 할 수 있다.

```js
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: relayStylePagination(["type", "@connection", ["key"]]),
      },
    },
  },
});
```

- relayStylePagination에 인자를 전달하여 keyArgs를 커스텀 할 수 있다.
