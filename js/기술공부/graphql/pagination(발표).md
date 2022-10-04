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

### Setting keyArgs

## Supported values for keyArgs

### keyArgs array

### keyArgs function (advanced)

## Which arguments belong in keyArgs?

### Using all arguments

### Using no arguments

### Summary

## The @connection directive
