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

- release를 사용하여 나중에 보존된(?) 개체를 수집할 수 있다.

### [cache.evict()](https://www.apollographql.com/docs/react/caching/garbage-collection#cacheevict)
