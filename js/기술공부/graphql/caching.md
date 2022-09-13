## [Garbage collection and cache eviction](https://www.apollographql.com/docs/react/caching/garbage-collection)

- Apollo Client 3버전 부터 사용하지 않는 캐시데이터를 선택적으로 제거 할 수 있음.
- cache.gc 메서드는 대부분의 상황에 적합하다,
- cache.evict 메서드는 더 세말하게 제어해야 하는 상황에 사용하기 좋다.

이 메서드들은 ApolloClient가 아닌 InMemoryCache에서 사용 할 수 있다.

### [cache.gc()](https://www.apollographql.com/docs/react/caching/garbage-collection#cachegc)

- 참조 하지 않는 모든 object를 캐시에서 지운다.
- 참조하지 않는지 알 수 있는 방법으로는

  - 모든 root object(일반적으로 query, mutation)에 추적 전략을 사용하여 사용가능한 모든 하위 참조를 재귀적으로

    방문하고 방문하지 않는 정규화된 object는 모두 제거됨.

- 제거된 object의 id 목록을 리턴한다
- graphql 데이터를 정리하는 것 이외에도 캐시가 이전 캐시 결과의 변경되지 않는 부분을 기억하는데 메모리를 해제 가능

- **옵션들**

  ```js
  cache.gc({ resetResultCache: true }); // default false
  ```

  - 이름 그대로 result cache를 리셋하는 옵션
    - 결과 값에 대한 cache를 리셋하므로 캐시 읽기 속도가 느려짐 (매번 새로운 데이터를 읽기 때문)

  ```js
    cache.readFragment({
      ...,
      canonizeResults:true // default false
    })
  ```

  - canonized 기독교에서의 시성(성인으로 공표하다)

    google parent에서는 canonized를 정규화라고 해석해놓았음.(https://patents.google.com/patent/KR101584883B1/ko)

  - 사용 설정하게 되면

    - 깊이 있는 객체도 === (literally the same object) 이전/현재 값을 효율적으로 비교 할 수 있다.

      (flat하게 만들어서 deeply한 객체도 효율적으로 비교 가능하다는 것을 설명하는 것 같다)

    - readFragment 사용시 옵션을 켜놓았다면, cache.gc는 root object의 추적 전략에 쓰이는 메모리를 재설정 할 수 있다고 한다.

  ```js
  cache.gc({
    resetResultCache: true,
    resetResultIdentities: true,
  });
  ```

  - 메모리 사용 패턴이나 메모리 누수등을 조사하는데 유용할 수 있다.
  - heap의 스냅샷 또는 메모리 할당 시간대를 기록하기 전에 브라우저의 devtools를 사용해

    js의 gc를 강제로 수행하여 캐시에 의해 해제된 메모리가 완전히 수집되어 heap으로 반환되게 하는것이 좋다.

#### [configuring garbage collection](https://www.apollographql.com/docs/react/caching/garbage-collection#configuring-garbage-collection)

```js
cache.retain("my-object-id");
```

- retain을 사용하여 참조되지 않는 객체를 gc가 수집하지 않게 설정 할 수 있다.

```js
cache.release("my-object-id");
```

- release를 사용하여 나중에 보존된(?) 객체를 수집할 수 있다.

### [cache.evict()](https://www.apollographql.com/docs/react/caching/garbage-collection#cacheevict)

```js
cache.evict({ id: "my-object-id" });
```

- 제거할 필드아이디를 추가해 캐시된 객체에서 단일로 제거 할 수 있다.

```js
cache.evict({ id: "my-object-id", fieldName: "yearOfFounding" });
```

- 객체를 제거하면 간헐적으로 다른 캐시된 객체에 연결 할 수 없게되는데,
  하나 이상의 객체를 제거한 후 cache.gc를 호출해야 함.

### [Dangling references](https://www.apollographql.com/docs/react/caching/garbage-collection#dangling-references)

- evict로 캐시된 객체를 제거 할 때 제거된 객체에 대한 참조는 다른 캐시 객체에 남아 있을 수 있는데, apollo client는 기본적으로

  Dangling references를 유지함 (관계가 있는 캐시의 참조를 유지함) 참조된 객체가 나중에 캐시에 다시 기록될 수 있기 때문에,

  참조가 유용할 수 있음을 의미.

- 필드를 읽는 함수는 참조에 대한 동작을 사용자 정의할 수 있따. 참조된 객체가 없으면 정리(clean up)를 수행할 수 있다.
- 읽기 함수는 다음과 같다.

  - Filter the referenced object out of a list of available objects
    - 사용 가능한 객체 목록에서 참조된 객체가 있는 경우.
  - Set the field's value to null
    - 필드 값을 null로 설정할 때
  - Return a particular default value
    - 특정한 기본값을 반환할 때

- 모든 읽기 함수는 필드에 참조가 포함되어 있는 경우를 감지하는 canRead flag가 있다.

- 다음은 두 가지 읽기 함수(Query.ruler, Deity.offspring)의 예제이다.

```js
new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        ruler(existingRuler, { canRead, toReference }) {
          // If there is no existing ruler, Apollo becomes the ruling deity
          // Query.ruler에 대한 읽기 함수는 기존 규칙이 없는경우 기본룰로 (Apollo)를 반환합니다.
          return canRead(existingRuler)
            ? existingRuler
            : toReference({
                __typename: "Deity",
                name: "Apollo",
              });
        },
      },
    },

    // 위의 예와 같이 Dangling 참조를 하는 필드를 포함하는 일반적인 솔루션은 없다.
    // 커스터마이징한 함수(toReference)를 사용하는것이 유용하고 좋다.
    // 뒤에서 나오지만 toReference를 사용하여 __typename과 name를 기반으로  객체에 대한 캐시 참조를 생성할 수 있다.

    Deity: {
      keyFields: ["name"],
      fields: {
        offspring(existingOffspring: Reference[], { canRead }) {
          // Filter out any dangling references left over from removing
          // offspring, supplying a default empty array if there are no
          // offspring left.
          // 마찬가지로 기존 existingOffspring규칙이 없는 경우
          // Deity.offspring에 대한 읽기 기능은 캐시에 canRead를 만족하는 항목만 반환하도록 필터링.
          return existingOffspring ? existingOffspring.filter(canRead) : [];
        },
      },
    },

    // 위의 offspring 예제와 같이 Dangling 참조를 필터링 하는것은 너무 일반적임,
    // 목록 필드의 기본 읽기 함수가 자동으로 필터링을 수행함, 예제는 기본값이고 원한다면 커스터마이징이 가능함.
  },
});
```

---

## [Customizing the behavior of cached fields](https://www.apollographql.com/docs/react/caching/cache-field-behavior)

- 아폴로 클라이언트 캐시의 특정 필드를 읽고 쓰는 방법을 사용자 정의할 수 있습니다.

  필드 정책을 정의해야 하는데, 다음이 포함될 수 있습니다.

  - 필드의 캐시된 값을 읽을 때 수행될 작업을 지정하는 읽기 함수
  - 필드에 캐시된 값이 기록될 때 수행할 작업을 지정하는 병합 함수
  - 캐시가 불필요한 중복데이터를 저장하는 것을 방지할 수 있는 키 인수의 배열.

<br/>

- InMemoryCache를 생성할때 필드 정책을 제공함.

  다음 예제는 Person유형의 name필드에 대한 정책을 정의함.

```js
const cache = new InMemoryCache({
  typePolicies: {
    Person: {
      fields: {
        name: {
          read(name) {
            // Return the cached name, transformed to upper case
            // 캐시된 이름을 대문자로 변환하여 리턴
            return name.toUpperCase();
          },
        },
      },
    },
  },
});

// Person.name이 쿼리 될 때마다 캐시가 반환하는 읽기 함수를 정의
```

### [the read function](https://www.apollographql.com/docs/react/caching/cache-field-behavior#the-read-function)

- 필드에 대한 읽기 함수를 정의하는 경우 클라이언트가 필드에 대해 쿼리할 때마다 캐시가 작동

  반환 값으로 필드는 캐시된 값 대신 읽기 함수의 반환 값으로 채워짐!

- 첫 번째 매개 변수는 필드에 현재 캐시된 값이 있는 경우 제공함, 이걸 사용해 함수의 반환값을 결정할 수 있따.
- 두 번째 매개 변수는 FieldPolicy api 참조에 설명된 여러 속성과 헬퍼 함수에 대한 엑세스를 제공하는 객체임.

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Person: {
        fields: {
          name: {
            // name이 없으면 기본값으로 UNKNOWN NAME 넣어 반환하고
            // 있는 경우 캐시된 값이 반환됨.
            read(name = "UNKNOWN NAME") {
              return name;
            },
          },
        },
      },
    },
  });
  ```

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Person: {
        fields: {
          // If a field's TypePolicy would only include a read function,
          // you can optionally define the function like so, instead of
          // nesting it inside an object as shown in the example above.

          // 두 번째 인자에서 값을 받아 분기 처리 할 수 있음.
          name(name: string, { args }) {
            if (args && typeof args.maxLength === "number") {
              return name.substring(0, args.maxLength);
            }
            return name;
          },
        },
      },
    },
  });
  ```

- 필드에 매개변수가 많을 경우 객체로 감싸서 반환해야 함.

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Person: {
        fields: {
          fullName: {
            //
            read(
              full_name = {
                first_name: "UNKNOWN FIRST_NAME",
                last_name: "UNKNOWN LAST_NAME",
              }
            ) {
              return { ...full_name };
            },
          },
        },
      },
    },
  });
  ```

  ```graphql
  query personWithFullName {
    fullName {
      first_name
      last_name
    }
  }
  ```

- 스키마에 정의되지 않은 필드에 대한 읽기 함수를 정의 할 수 있음.

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Person: {
        fields: {
          userId() {
            return localStorage.getItem("loggedInUserId");
          },
        },
      },
    },
  });
  ```

  - 로컬로만 정의된 필드를 쿼리하려면 해당 필드에 @client를 써 서버에 요청하지 않게 할 수 있음

  ```js
  const GET_PRODUCT_DETAILS = gql`
    query ProductDetails($productId: ID!) {
      product(id: $productId) {
        name
        price
        isInCart @client
      }
    }
  `;
  ```

- 읽기 함수의 다른 사용법은?

  - 소숫점을 가까운 정수로 반올림 하는 등 클라이언트의 요구에 맞게 캐시된 데이터 변환
  - 동일한 객체에 있는 하나 이상의 스키마 필드에서 로컬 전용(@client) 필드 파생
    - ex) 생년월일에서 년도만 빼서 파생
  - 여러 객체에 걸쳐 하나 이상의 스키마 필드에서 로컬 전용 필드 파생

- 읽기 기능에 옵션들의 전체목록은 [FieldPolicy API reference](https://www.apollographql.com/docs/react/caching/cache-field-behavior#fieldpolicy-api-reference)에 있는데

  모든 옵션을 사용하지는 않지만 캐시에서 필드를 읽을때 유용하게 사용할 수 있는 옵션들이 있을것.
