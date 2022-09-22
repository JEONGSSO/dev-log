## [Garbage collection and cache eviction](https://www.apollographql.com/docs/react/caching/garbage-collection)

- Apollo Client 3버전 부터 사용하지 않는 캐시데이터를 선택적으로 제거 할 수 있음.
- cache.gc 메서드는 대부분의 상황에 적합하다,
- cache.evict 메서드는 더 세밀하게 제어해야 하는 상황에 사용하기 좋다.

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

### [the merge function](https://www.apollographql.com/docs/react/caching/cache-field-behavior#the-merge-function)

- 필드에 대해 merge function을 정의하는 경우 필드 쓰기가 발생하면 새 값이 원래 들어오는 값 대신 병함 함수의 반환 값으로 설정됨.

#### [merging arrays](https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-arrays)

- merge function의 일반적인 사용사례, 필드에 쓰는 방법을 정의하는 것

  기본적으로 필드의 기존 배열은 들어오는 배열로 완전히 대체됨.

  즉, 쓰고자 하는 배열로 완전히 바뀌어 기존 배열을 사용할 수 없음.

```js
const cache = new InMemoryCache({
  typePolicies: {
    Agenda: {
      fields: {
        tasks: {
          // merge function을 사용하여 existing 기존 값과 incoming을 합치는 등의 역할을 기대할 수 있음.

          // 캐시가 되어있지 않을때를 대비해 existing를 빈 배열로 기본 값 설정.
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});
```

- merge function을 들어오는 배열을 기존 배열로 직접 push할 수 없고, 잠재적인 오류를 방지하기 위해 **새 array**를 반환해야 함
- development 모드에서 apollo client는 object.freeze를 사용하여 기존 데이터(캐시된 값)의 의도하지 않은 수정을 방지함.

#### [Merging non-normalized objects](https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects)

- merge function을 사용하여 캐시에서 정규화 되지 않은 중첩 개체를 지능적(intelligently)으로 결합 가능.
- 정규화 되지 않은 중첩객체가 동일하게 정규화된 부모내에 중첩된다고 가정할 때

  ```graphql
  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Author { # Has no key fields
    name: String!
    dateOfBirth: String!
  }

  type Query {
    favoriteBook: Book!
  }
  ```

  - Book은 id필드를 가지고 있기 때문에 정규화할 수 있다.
  - 하지만 Author는 id필드가 없고, 특정 인스턴스를 고유하게 식별할 수 있는 필드도 없다.
  - 따라서 Author를 정규화할 수 없으며 두 개의 서로 다른 Author 개체가 실제로 동일한 Author를 나타내는 지도 알 수 없다.

  -

  ```graphql
  query BookWithAuthorName {
    favoriteBook {
      id
      author {
        name
      }
    }
  }

  query BookWithAuthorBirthdate {
    favoriteBook {
      id
      author {
        dateOfBirth
      }
    }
  }
  ```

- 위의 두가지 쿼리를 순서대로 실행한다고 가정해보자.

- 첫 번째 쿼리가 반환되면 apollo client는 다음과 같은 Book 객체를 캐시에 씀.

  ```js
  {
    "__typename": "Book",
    "id": "abc123",
    "author": {
      "__typename": "Author",
      "name": "George Eliot"
    }
  }
  ```

- author 객체는 정규화 할 수 없으므로(고유 식별자가 없음) 상위 객체 내에 중첩됨.

- 즉, 두번째 쿼리가 반환되면 캐시된 Book객체가 다음으로 업데이트 됨.

  ```js
    {
      "__typename": "Book",
      "id": "abc123",
      "author": {
        "__typename": "Author",
        "dateOfBirth": "1819-11-22"
        // "name": "George Eliot" override됨
      }
    }

    // 두 쿼리에 대해 author객체가 동일한 author인지 확인이 안되서 병합하는 대신 덮어씀 (그리고 warning log를 기록함)
  ```

- 하지만 사실상 출판된 책의 author(저자)는 변하지 않기 때문에 개발자 판단하에 Book을 merge function을 이용해서

  name과 dateOfBirth를 병합하여 캐시하라고 할 수 있다.

  ## 여기부터

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Book: {
        fields: {
          author: {
            // mergeObjects 헬퍼 함수를 사용해 들어오는 Author객체의 값을 병합하여 리턴시킴.
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            },
          },
        },
      },
    },
  });
  ```

- 이 병합 함수는 정규화 되지 않은 객체 필드 수에 관계없이 이 필드를 재사용 할 수 있다.
- 이 함수의 정의는 매우 흔한 사용 사례이기 때문에 숏컷으로 다음과 같이 사용할 수 있다.

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Book: {
        fields: {
          author: {
            // Short for options.mergeObjects(existing, incoming).
            merge: true,
          },
        },
      },
    },
  });
  ```

- 캐시가 동일한 ID를 가진 두 Book 객체의 author 객체를 안전하게 병합 할 수 있다.

##### [Configuring merge functions for types rather than fields(필드가 아닌 유형에 대한 병합 함수 구성하기)](https://www.apollographql.com/docs/react/caching/cache-field-behavior/#configuring-merge-functions-for-types-rather-than-fields)

- Apollo Client 3.3버전 부터 Author객체를 보유할 수 있는 여러 필드에 대해 일일히 구성할 필요 없고,
- 대신 Author 유형 정책에 통합적으로 구성할 수 있다.

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Book: {
        fields: {
          // No longer necessary!
          // author: {
          //   merge: true,
          // },
        },
      },

      Author: {
        merge: true,
      },
    },
  });
  ```

- 이렇게 Book 밖으로 Author를 꺼내 동작은 동일하지만 알아서 숏컷 병합을 수행함
- Author가 Book외에 다른 많은 필드에 사용될 수 있는 경우 더 간단하고 쉽게 관리할 수 있다.

- merge true일때 병합 가능한 객체는 동일한 상위 객체의 동일한 필드를 차지하는 기존 객체와 병합됨 (단, \_\_typename이 동일한경우만)
- \_\_typename이 동일하지 않은경우도 사용자 정의 병합 함수를 작성해서 원하는대로 할 수 있음

##### [Merging arrays of non-normalized objects(정규화 되지 않은 객체의 배열 병합)](https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-arrays-of-non-normalized-objects)

- 한 책에 여러명의 Author가 있을경우를 가정하면?

  ```graphql
  query BookWithAuthorNames {
    favoriteBook {
      isbn
      title
      authors {
        name
      }
    }
  }

  query BookWithAuthorLanguages {
    favoriteBook {
      isbn
      title
      authors {
        language
      }
    }
  }
  ```

- 이런 경우 favoriteBook authors 필드는 더 이상 단일 객체가 아니라 배열이므로
- 교체로 인한 데이터 손실을 방지 하기위해 사용자 지정 병합 함수를 적절하게 쓰는것이 중요하다.

# \#

```js
const cache = new InMemoryCache({
typePolicies: {
  Book: {
    fields: {
      authors: {
        // readField 헬퍼 함수는 author.name직접 접근하는것보다 강력함
        // author가 캐시의 다른 위치에 있는 데이터를 참조하는 가능성도 포함하기 때문이다.
        // 이 경우 Author 유형으로 keyFields를 지정할 수 있다.
        merge(existing: any[], incoming: any[], { readField, mergeObjects }) {
          const merged: any[] = existing ? existing.slice(0) : [];
          const authorNameToIndex: Record<string, number> = Object.create(null);
          if (existing) {
            existing.forEach((author, index) => {
              authorNameToIndex[readField<string>("name", author)] = index;
            });
          }
          incoming.forEach(author => {
            const name = readField<string>("name", author);
            const index = authorNameToIndex[name];
            if (typeof index === "number") {
              // Merge the new author data with the existing author data.
              merged[index] = mergeObjects(merged[index], author);
            } else {
              // First time we've seen this author in this array.
              authorNameToIndex[name] = merged.length;
              merged.push(author);
            }
          });
          return merged;
        },
      },
    },
  },
},
```

- 기존 값을 들어오는 값으로 덮어쓰는 대신 중복된 author이름을 확인하여 반복되는 작성자 객체의 필드를 병합함.
- 예제에서 볼 수 있듯이 병합 함수는 상당히 복잡해질 수 있는데 재사용 가능하게 헬퍼 함수로 추출할 수 있다

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Book: {
        fields: {
          authors: {
            merge: mergeArrayByField < AuthorType > "name",
          },
        },
      },
    },
  });
  ```

- 추상화하여 내부 구현이 얼마나 복잡한지는 상관없고, 일관되게 유지할 수 있다.

# \#

#### [Handling pagination(페이징 처리)](https://www.apollographql.com/docs/react/caching/cache-field-behavior/#handling-pagination)

- 필드가 배열을 담고있을때 너무 양이 많다면 페이징처리가 유용하다.
- 일반적으로 쿼리에는 다음과같은 지정 인수(argument)가 있다.

  - numeric offset또는 시작 ID를 사용해 배열에서 시작할 위치를 지정할 수 있다.
  - 단일 페이지에서 반환할 최대 요소 수(PageSize)

- 필드에 대한 페이징 처리를 구현하는 경우
- 읽기 및 병합 함수를 구현하는 경우 페이지 지정 인수를 염두에 두는것이 중요

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Agenda: {
        fields: {
          tasks: {
            merge(existing: any[], incoming: any[], { args }) {
              const merged = existing ? existing.slice(0) : [];
              // existing.slice(0)는 [...existing] 과 같음
              // Insert the incoming elements in the right places, according to args.
              // args에 들어오는 값을 올바른 위치에 삽입해야함
              const end = args.offset + Math.min(args.limit, incoming.length);
              for (let i = args.offset; i < end; ++i) {
                merged[i] = incoming[i - args.offset];
              }
              return merged;
            },

            read(existing: any[], { args }) {
              // If we read the field before any data has been written to the
              // cache, this function will return undefined, which correctly
              // indicates that the field is missing.
              // 데이터가 캐시에 기록되기 전에 필드를 읽으면
              // 함수는 정의되지 않은 상태로 반환됨. 이는 필드가 누락됨을 나타냄
              const page =
                existing &&
                existing.slice(args.offset, args.offset + args.limit);
              // If we ask for a page outside the bounds of the existing array,
              // page.length will be 0, and we should return undefined instead of
              // the empty array.
              // 범위를 벗어난 페이지를 요청 받으면 빈배열대신 undefined을 리턴해야 한다.
              if (page && page.length > 0) {
                return page;
              }
            },
          },
        },
      },
    },
  });
  ```

- 위의 예제에서 보듯이 읽기 함수는 역방향으로 동일한 인수를 처리하여 병합 함수와 같이 잘 협력해야 한다.
- 주어진 페이지가 args.offset이 아닌 특정 id이후에 시작되도록 하려면 readField 헬퍼 함수를 사용하여 기존 id를 검사하여 다음과 같이 병합 및 읽기 기능을 구현 할 수 있다.

```js
const cache = new InMemoryCache({
  typePolicies: {
    Agenda: {
      fields: {
        tasks: {
          merge(existing: any[], incoming: any[], { args, readField }) {
            const merged = existing ? existing.slice(0) : [];
            // Obtain a Set of all existing task IDs.
            const existingIdSet = new Set(
              merged.map((task) => readField("id", task))
            );
            // Remove incoming tasks already present in the existing data.
            incoming = incoming.filter(
              (task) => !existingIdSet.has(readField("id", task))
            );
            // Find the index of the task just before the incoming page of tasks.
            const afterIndex = merged.findIndex(
              (task) => args.afterId === readField("id", task)
            );
            if (afterIndex >= 0) {
              // If we found afterIndex, insert incoming after that index.
              merged.splice(afterIndex + 1, 0, ...incoming);
            } else {
              // Otherwise insert incoming at the end of the existing data.
              merged.push(...incoming);
            }
            return merged;
          },

          read(existing: any[], { args, readField }) {
            if (existing) {
              const afterIndex = existing.findIndex(
                (task) => args.afterId === readField("id", task)
              );
              if (afterIndex >= 0) {
                const page = existing.slice(
                  afterIndex + 1,
                  afterIndex + 1 + args.limit
                );
                if (page && page.length > 0) {
                  return page;
                }
              }
            }
          },
        },
      },
    },
  },
});
```

- readField의 첫 번째 인자로 key를 지정하고 두 번째 인자로 객체를 넘겨 키 값을 확인하고, 참조된 캐시가 있는지도 확인해주기 때문에 해당 상황에 적극 활용할 것

#### [Specifying key arguments(주요 인수 지정)](https://www.apollographql.com/docs/react/caching/cache-field-behavior/#specifying-key-arguments)

- 필드가 argument를 허용하는 경우
- 이 배열은 필드 값을 계산하는 데 사용되는 주요 인수를 나타냄

  ```js
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          monthForNumber: {
            keyArgs: ["number"],
          },
        },
      },
    },
  });
  ```

  - monthForNumber에 숫자 argument가 주어지면 이 필드는 특정 월의 세부 정보를 반환한다.

    number 인수는 필드의 결과를 계산할 때 사용되므로 주요인수다.

  - 키가 아닌 인수(keyArgs)의 예로는 엑세스 토큰이 있는데, 쿼리를 인증하는데에는 사용되지만 결과를 계산하는데는 사용되지 않음

  - 기본적으로 캐시는 특정 필드를 쿼리할 떄 제공하는 모든 고유한 인수 값의 조합에 대해 별도의 값을 저장함.

  - 필드의 키 인수(keyArgs)를 지정 하면 캐시는 키를 제외한 인수들이 필드의 값에 영향을 미치지 않는다.

    monthForNumber필드로 두 개의 다른 쿼리 실행 시 동일한 number 인수를 전달하지만 엑세스 권한은 다름.

    토큰 인수는 두 호출 모두 모든 키 인수에 정확히 동일한 값을 사용하기 때문에 두번째 실행시 첫번째 값을 덮어씀.

  - keyArgs의 동작에 더 제어가 필요한 경우 배열 대신 함수를 전달해서 사용자 정의 함수를 만들 수 있따. KeyArgsFunction를 보면 잘 나와있음.

### [FieldPolicy API reference](https://www.apollographql.com/docs/react/caching/cache-field-behavior/#fieldpolicy-api-reference)

- 이제까지 배웠던 API들의 레퍼런스

# \#

## [Advanced topics on caching in Apollo Client](https://www.apollographql.com/docs/react/caching/advanced-topics/)

- apollo client에서 캐시를 사용 할때 특별한 사례와, 고려 사항에 대해 서술함.

### [Bypassing the cache](https://www.apollographql.com/docs/react/caching/advanced-topics/#bypassing-the-cache)

- 쿼리의 응답이 한 번뿐인 토큰일 경우 특정 작업에 캐시를 사용하지 않는 경우가 있는데

  ```js
  const { loading, error, data } = useQuery(GET_DOGS, {
    fetchPolicy: "no-cache",
  });
  ```

  - 결과를 캐시에 기록하지 않고 서버에 요청을 보내기 전에 캐시 확인도 하지 않음.

# \#

### [Persisting the cache](https://www.apollographql.com/docs/react/caching/advanced-topics/#persisting-the-cache)

- AsyncStorage 또는 localStorage를 사용하는 경우에 InMemoryCache를 유지 및 재수화(rehydrate, 원상 복구)할 수 있다.

  - apollo-cache-persist을 사용하면 됨.
  - 사용하려면 캐시와 스토리지 제공자를 persistCache(apollo-cache-persist 메소드)에 제공

    기본적으로 캐시의 내용은 비동기식으로 즉시 복원되고 짧은 디바운스 간격으로 캐시에 쓸 때마다 유지됨.

  - persistCache은 기본적으로 비동기이며 Promise를 반환함.
  - 자세히는 라이브러리 docs 확인

# \#

### [Resetting the cache](https://www.apollographql.com/docs/react/caching/advanced-topics/#resetting-the-cache)

- 사용자가 로그아웃 하는 경우와 같이 캐시를 완전히 리셋해야 할때가 있는데
- client.resetStore를 사용하여 리셋할 수 있으며, 새로 고치므로 비동기임.

```js
export default withApollo(
  graphql(PROFILE_QUERY, {
    props: ({ data: { loading, currentUser }, ownProps: { client } }) => ({
      loading,
      currentUser,
      resetOnLogout: async () => client.resetStore(),
      // 활성 되지 않은 캐시를 리셋하려면 client.clearStore()를 사용함.
    }),
  })(Profile)
);
```

# \#

### [Responding to cache resets](https://www.apollographql.com/docs/react/caching/advanced-topics/#responding-to-cache-resets)

- client.resetStore가 호출될 때마다 실행할 콜백함수를 등록 할 수 있다.

  여러 콜백을 등록하려면 여러번 호출하세요, 캐시가 재설정 될 때마다 모든 콜백이 array에 push되고 동시에 실행됨

  ```js
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { withClientState } from "apollo-link-state";

  import { resolvers, defaults } from "./resolvers";

  const cache = new InMemoryCache();
  // apollo client의 로컬 상태 관리 기능을 사용하고 아무곳에서나 client.resetStore를 호출 할때 유용함
  const stateLink = withClientState({ cache, resolvers, defaults });

  const client = new ApolloClient({
    cache,
    link: stateLink,
  });

  client.onResetStore(stateLink.writeDefaults);
  ```

- react 컴포넌트 내에서 호출 할수도 있는데, 캐시가 재설정 된 후 UI를 강제로 다시 렌더링 하는 경우에 유용함.

  ```js
  import { withApollo } from "@apollo/react-hoc";

  export class Foo extends Component {
    constructor(props) {
      super(props);
      // client.onResetStore의 반환 값은 콜백을 취소할 수 있는 함수가 반환됨
      this.unsubscribe = props.client.onResetStore(() =>
        this.setState({ reset: false })
      );
      this.state = { reset: false };
    }
    componentDidUnmount() {
      this.unsubscribe();
    }
    render() {
      return this.state.reset ? <div /> : <span />;
    }
  }

  export default withApollo(Foo);
  ```

# \#

## 상속이 있다

### [TypePolicy inheritence](https://www.apollographql.com/docs/react/caching/advanced-topics/#typepolicy-inheritence)

- class를 상속하거나 Object.create에 의해 생성된 프로토 타입 체인을 처리하는 것으로부터 확장 합니다.
- 상속은 강력하고 다음과 같은 이유로 apollo client와 잘 맞음

  - InMemoryCache possibleTypes 해당 정보를 제공하기 위해 추가 구성이 필요하지 않음.
  - 상속을 통해 받은 supertype은 keyFields 및 개별 필드 정책을 포함하여 모든 하위유형에 기본 구성값을 제공할 수 있으며,

    이 하위 유형은 다른 것을 원하는 하위유형에 의해 선택적 재정의 가능.

  - 단일 하위 유형은 여러개의 슈퍼 유형을 가질 수 있으며, 클래스 또는 프로토타입의 단일 상속 모델을 사용하여 모델링하기 어려움.

  - 개발자는 클라이언트 전용 슈퍼타입을 다음과 같이 추가할 수 있다.

    스키마가 슈퍼유형에 대해 아무것도 모르는 경우에도 재사용하는 방법으로 유형을 매핑함.

  - possibleTypes맵은 현재 조각 일치 목적으로만 사용되며 상속을 올바르게 사용하는 경우 dry코드를 줄여줌

  - InMemoryCache의 상속은 작동 방식은 다음과 같다.

  ```js
  const cache = new InMemoryCache({
    possibleTypes: {
      Reptile: ["Snake", "Turtle"],
      Snake: ["Python", "Viper", "Cobra"],
      Viper: ["Cottonmouth", "DeathAdder"],
    },

    typePolicies: {
      Reptile: {
        // Suppose all our reptiles are captive, and have a tag with an ID.
        // 파충류들이 생포되어 있고 ID를 가진 꼬리표가 있다고 가정
        keyFields: ["tagId"],
        fields: {
          // 이름 관련은 파충류 하위 유형 간에 공유할 수 있다.
          scientificName: {
            merge(_, incoming) {
              return incoming.toLowerCase();
            },
          },
        },
      },

      Snake: {
        fields: {
          venomous(status = "unknown") {
            return status;
          },
        },
      },
    },
  });
  ```

### [Refetching queries after a mutation](https://www.apollographql.com/docs/react/caching/advanced-topics/#refetching-queries-after-a-mutation)

- 뮤테이션 진행 후 refetch
- update이후 캐시를 업데이트 하기 위한 업데이트 함수를 작성하는 것이 복잡할 수 있다.

  mutation이 수정된 필드를 반환하지 않는 경우엔 refetch가 불가능할 수 있다.

- mutation이 완료 된 후 특정 쿼리를 실행하기 위해 refetchQueries를 사용할 수 있다.

# \#

### [Cache redirects](https://www.apollographql.com/docs/react/caching/advanced-topics/#cache-redirects)

- 쿼리가 캐시에 이미 있는 데이터를 다른 참조로 요청하는 경우도 있다.
- 예를들어 목록 보기와 세부정보 보기가 동일한 데이터를 사용하고 있다고 가정.

  ```graphql
  query Books {
    books {
      id
      title
      abstract
    }
  }
  ```

- 리스트에서 하나의 항목을 골라 상세보기 진입 후

  ```graphql
  query Book($id: ID!) {
    book(id: $id) {
      id
      title
      abstract
    }
  }
  ```

- 이런 경우 두 번째 쿼리의 데이터가 이미 캐시에 있을 수 있다는 것을 알지만, 그 데이터를 다른 쿼리로 가져오기 때문에

  apollo client는 동일하다는 것을 모름, 동일하다는것을 알려주기 위해 필드 정책 읽기 함수를 정의할 수 있음

  ```js
  import { ApolloClient, InMemoryCache } from "@apollo/client";

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            book: {
              read(_, { args, toReference }) {
                // toReference 헬퍼 함수를 사용하여 __typename과 id를 기반으로 Book객체에 대한 캐시 참조를 생성하고 반환함.
                return toReference({
                  __typename: "Book",
                  id: args.id,
                });
              },
            },
          },
        },
      },
    }),
  });
  ```

- 이제 쿼리에 Book 필드가 포함 될때마다 위의 읽기 함수가 실행되고 apollo client는 이 참조를 사용하여 캐시에서 찾고 있으면 반환함.

  없으면 네트워크를 통해 쿼리를 실행함

- NOTE: 네트워크 요청을 방지하려면 쿼리의 요청된 모든 필드가 캐시에 이미 있어야 함.

  상세보기의 쿼리가 실행 전 목록 보기의 쿼리에 없는 Book 필드를 가져오면 캐시가 불완전하다고 간주해 네트워크 요청을하고 전체 쿼리를 실행함

# \#

### [Pagination utilities](https://www.apollographql.com/docs/react/caching/advanced-topics/#pagination-utilities)

- fetchMore

  - fetchMore를 사용하여 쿼리의 캐시된 결과를 후속 쿼리에서 반환한 데이터로 업데이트 가능
  - 대부분의 경우 무한 스크롤, 이미 데이터가 있을때 더 많은 데이터를 로드하는 상황을 처리하는데 사용함.

- @connection directive

  - 기본적으로 페이지 지정 쿼리는 다른 쿼리와 동일하지만 fetchMore를 호출하여 동일한 캐시 키를 업데이트 함.
  - 이러한 쿼리는 초기 쿼리와 매개 변수 모두에 의해 캐시되므로 나중에 캐시에서 페이지화된 쿼리를 사용할때 문제가 발생함
  - 이런 문제를 해결하기 위해 1.6버전 이후에 나온 @connection를 사용함

```js
const query = gql`
  query Feed($type: FeedType!, $offset: Int, $limit: Int) {
    feed(type: $type, offset: $offset, limit: $limit)
      @connection(key: "feed", filter: ["type"]) {
      ...FeedEntry
    }
  }
`;
```

- 저장소 키를 지정하는 키 매개 변수를 제공하고, 옵션으로 filter매게 변수를 포함하여 키에 포함 할 인수 이름들로 사용할 수 있음.

- 위의 쿼리를 사용하면 여러개의 fetchMore를 사용하더라도 각 피드 업데이트의 결과는 항상 스토어의 피드 키가 가장 마지막 값으로 업데이트 됨.

- 이제 안정적인 저장소 키를 얻었으므로, 쓰기 작업을 쉽게 사용할 수 있다.

  저장소 업데이트를 하기위해서 쿼리를 만듬. 이 경우는 피드를 지웁니다.

  ```js
  client.writeQuery({
    query: gql`
      query Feed($type: FeedType!) {
        feed(type: $type) @connection(key: "feed", filter: ["type"]) {
          id
        }
      }
    `,
    variables: {
      type: "top",
    },
    data: {
      feed: [],
    },
  });
  ```

- 저장 키에는 type인수만 사용하므로 offset이나 limit을 사용할 필요가 없다.
