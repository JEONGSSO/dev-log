### fetching

- 쿼리
  - 최신화 업데이트 하기
    - 폴링 시간을 적어 최신화 가능

notifyOnNetworkStatusChange 플래그가 있는데
true로 설정하면 networkStatus를 받을 수 있다.

```js
function DogPhoto({ breed }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
    }
  );

if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
```

- errorPolicy 설정

  - none (default)
    - 기본적으로 data는 null이고 error를 가져옴
  - all
    - error를 가져오고 data도 가져올 수 있으면 가져옴

- 뮤테이션
  - reset
    - mutation error가 되었을때 다시 호출할 수 없는데 그때 상태를 리셋해줌
    - called 및 다른 상태들을 리셋해줌

### 기본적으로 \_\_typename과 id를 조합해 캐시되는 아이디로 사용함 같은 아이디가 있으면 overwrite
