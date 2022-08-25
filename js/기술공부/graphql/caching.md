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
