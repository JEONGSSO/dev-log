# Graph Ql (gql)

Structed Query Language(sql) 과 마찬가지로 쿼리 언어.

### sql: **데이터베이스 시스템에 저장된 데이터**를 효율적으로 가져오는것이 목적

```sql
SELECT plot_id, species_id, sex, weight, ROUND(weight / 1000.0, 2) FROM surveys;
```

### gql: **클라이언트가 데이터를 서버로**부터 효율적으로 가져오는 것이 목적

```javascript
   {
      hero {
         name
      }
   }
```
## Graph Ql의 구조?

### 쿼리 / 뮤테이션
   쿼리와 뮤테이션 응답 내용의 구조는 상당히 직관적!

   굳이 쿼리와 뮤테이션을 나누는데 내부적으로 들어가면 차이가 없다고 한다.

   쿼리는 데이터 읽기(R)
   뮤테이션은 변조(CUD)하는데 사용한다는 개념적인 규약만 정해놓은 것 뿐.

```
요청
   {
      hero {
         name
      }
   }
```

```
응답
   {
      "hero": {
         "name": "deadPool"
      }
   }
```

### schema
       - 요청을 받았을 때 어떤 속성을 어떤 타입으로 반환할지에 대한 정의

### Resolver
         - 실제로 데이터를 반환하는 부분
         - rest api의 Controller부분과 비슷.
         - Resolver에서 원하는 데이터만을 쿼리로 작성해 요청을 보내면
         - Resolver에서 데이터를 응답으로 반환합니다.

## Graph Ql이 좋은이유 ?
1. 서버사이드 gql app은 gql로 작성된 쿼리를 입력 받아 처리한 결과를 다시 **클라이언트로** 돌려준다.

2. gql는 어떠한 특정 DB나 플랫폼에 종속적이지 않고, 네트워크 방식에도 종속적이지 않다.

3. **REST API** (URL을 자원으로 사용하는 API)는 GET, POST, URL 등등... 다양한 endpoint를 가지고 있다. **gql**은 디폴트 값으로 /graphql 을 사용한다고 한다

4. Data Overfetching의 문제가 해소된다: 필요한 데이터만 쏙쏙 골라쓸 수 있다.

5. schema와 resolver를 한 번 짜놓으면 백엔드 개발자에게 API요청을 안해도 된다.
6. redux에서 매번 하는 loading, error, success 처리가 간편하게 수행됨.
7. PlayGround 라는 GUI 환경에서 많은 것을 직관적으로 확인할 수 있고, 이것저것 실험 해볼 수 있다.
   
## Graph Ql의 어려움
1. 캐시를 제어하고 최신화 하는데에 어려움을 겪을 수 있다. https://www.apollographql.com/docs/apollo-server/performance/caching/
   해결법




### 출처
   https://tech.kakao.com/2019/08/01/graphql-basic/

   https://velog.io/@jayson/project-%EA%B0%9C.%EA%B3%A0.%EC%88%98-%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0

   https://medium.com/@han7096/graphql-%EA%B3%BC-apollo%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EB%A9%B0-%EC%A4%91%EA%B0%84-%EC%A0%95%EB%A6%AC-42981522b188