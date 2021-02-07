vite.js

https://vitejs.dev/

뷰 창시자인 에반유가 만든 차세대 번들러라고 한다.

rollup을 사용한다.

webpack 처럼 복잡한 설정이 필요없는것이 장점

```bash
  npm init @vitejs/app <project-name>
```

typescript 사용을 위해 tsconfig.json 생성

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "isolatedModules": true,
    "noEmit": true
  }
}
```

생성된 폴더로 들어가면 main.js가 있고

main.js를 main.ts로 변경

index.html main.js 를 main.ts로 변경

```ts
// main.ts

import { createApp } from "vue";

// vue파일 type Error가 뜬다
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(router).use(store).mount("#app");
```

IDE에서 .vue 파일에 대한 정의를 할 수 있게 root 폴더에 shims-vue.d.ts를 만듦

```ts
// shims-vue.d.ts

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, unknown>;
  export default component;
}
```

npm run dev를 실행해서 개발하면 된다.

https://dev.to/mrchoke/vue-3-vite-typescript-48pg
