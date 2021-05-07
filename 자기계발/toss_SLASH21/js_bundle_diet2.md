### 번들 사이즈를 보는 웹팩 라이브러리들

- webpack Analyse (사용하기 복잡, 어려움)
- webpack Visualizer(기능이 적음)
- webpack Bundle Analyer(추천)

### 라이브러리 중복 줄이기

1. 패키지 매니저로 용량 줄이기

```bash
# 중복된 node_modules 제거 하기
npm dedupe

# yarn은 알아서 중복 제거해준다고 하지만 완벽하지는 않음
yarn dedupelicate 라이브러리를 통해 중복 제거하는것을 추천

# yarn2에서는 yarn dedupe명령어가 생김
yarn dedupe
```

2. 라이브러리 tree-shaking으로 용량 줄이기

   webpack의 alias기능을 사용하여

   라이브러리를 lodash만 이용하도록 할 수 있음

```js
// 모든 파일이 다 import 됨
import { map } from "lodash";

// babel-plugin-lodash을 사용하여 변환

// 해당 파일만 import 됨
import _map from "lodash/map";
```

3. 더 가벼운 라이브러리 사용하기 [bundle phobia](https://bundlephobia.com)

   - 라이브러리 크기, 속도등을 확인하기 쉽다
   - 비슷한 라이브러리의 크기 비교
   - 함수별로 용량을 얼마나 차지하는지 확인 가능

4. 트리 쉐이킹

   - 라이브러리에서 사용하고자 하는부분만 번들에 포함시키는 것
   - webpack은 rollup에 비해 side effect 판단을 어려워함
   - webpack은 프로덕션 빌드에서 terser라는 라이브러리를 사용하여 side effect 판단(pure annotation)하여 코드를 지움
   - babel Pure Annotation을 붙여주고, ts는 안 붙여주기 때문에 ts사용시에 babel로 컴파일하는 것을 추천
   - 리액트 컴포넌트 라이브러리를 만들때 babel-plugin-transform-react-pure annotations 덕분에 편함
   - webpack-cli를 사용하면 stats 옵션을 사용
   - next에선 webpack-stats-plugin을 추가하여 사용하면 json 포맷으로 저장할 수 있다

5. Chunks

   - 청크를 사용하고 각각 용도에 맞는 구역(?)을 나누어 사용

     - 쉽게 바뀌지 않을 라이브러리 (react, next)
     - 모든 페이지에서 사용하는 코드를 모아둔 common chunks
     - 2페이지 이상 공유하는 코드를 모아둔 shared chunks
     - 특정 페이지 에서만 사용하는 chunks

   - dynamic import
     - webpack magic comment를 사용하면 prefetch를 사용하여 사용자 경험 상승
