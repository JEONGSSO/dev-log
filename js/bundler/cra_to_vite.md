CRA에서 바이트로 마이그레이션

webpack의 느린 속도 때문에 다른 번들러로 이주하면서 겪었던 이야기

1. esbuild
   - 알고있는 빌드 도구 중에서 가장빠른것으로 알고 있음.
   - go언어를 이용하여 매우 빠른속도 자랑
   - prod 레벨에서 사용하기는 아직 어려운것으로 보인다 (22.3.23)
2. [snowpack](https://ui.toast.com/weekly-pick/ko_20220127#snowpack)
3. vite

- vue 개발자인 evan you가 만든 번들러
- vue3에 기본적으로 사용되는 번들러라 vue 친화적이지만 react, svelte등 많은 프레임워크에서 사용가능하도록 기능이 추가되고 있다.
- prod 빌드시 rollup을 사용하여 비교적 검증된 편
  - rollup 설정을 커스터마이징하여 사용 할 수 있다.
- 개발 서버로 의존성을 esbuild로 관리하여 사전 번들링을 진행하여 로컬서버를 3초도 안되어서 사용가능하다
- 아직 ssr을 지원하지 않는것으로 보임

그래서 vite를 선택하여 진행하고자 한다.

---

## 참조

https://engineering.ab180.co/stories/webpack-to-vite
https://velog.io/@sehyunny/is-it-time-to-say-goodbye-to-webpack
