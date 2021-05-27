mobx ver 6

### 카운터 스토어 생성

```js
import { observable } from "mobx";

// 데코레이터를 써서 코드를 작성하면 바벨이 아래와 같이 변환시켜준다.
@observable counter = [{
  number: 0,
  increment() {
    this.number++;
  },
  decrement() {
    this.number--;
  },
}]

// 변환
counter = observable({
  number: 0,
  increment() {
    this.number++;
  },
  decrement() {
    this.number--;
  },
});

// @(데코레이터)가 계속 표준화 되지 않아서 mobx 6 부터 @ 사용을 권고하지 않는 것 같다.
// https://michel.codes/blogs/mobx6

// 작성할 때 변환된 구문을 사용하고자 한다.

// /src/stores/counter.js
const counter = observable({
  number: 0,
  increment() {
    this.number++;
  },
  decrement() {
    this.number--;
  },
  add10() {
    return this.number + 10;
  },
  get add100 () { // get이 있으면 mobx가 자동으로 computed 속성으로 추론한다
    console.log('Computing...')
    return this.number + 100;
  },
  get isZero() {
    console.log('Computing...');
    return this.number === 0;
  },
})

export { counter };
```

### 스토어 연결점 구성

```js
// /src/stores/useStore.js
import { counter } from "./counter";

export default () => {
  return {
    counter,
  };
};
```

### 컴포넌트에서 스토어 사용

```js
// /src/components/Counter.js

import React from "react";
import { observer } from "mobx-react";
import useStore from "@src/stores/useStore";

export default observer(() => {
  const { counter } = useStore();
  const add10 = counter.add10(); // 일반 함수는 메서드로 실행해줘야 함.

  // computed
  const add100 = counter.add100; // getter 함수라면 프로퍼티로 바로사용.

  // https://mobx.js.org/computeds-with-args.html#2-close-over-the-arguments
  const isZero = computed(() => counter.isZero()).get();

  return (
    <div>
      <button onClick={() => counter.decrement()}>-</button>
      <span role="display-count">{counter.number}</span>
      <button onClick={() => counter.increment()}>+</button>
      <div>{isZero}</div>
      <div>{add10}</div>
      <div>{add100}</div>
    </div>
  );
});
```

---

## 참초

https://mobx.js.org/computeds.html

https://mobx.js.org/computeds-with-args.html

https://michel.codes/blogs/mobx6

https://hyeok999.github.io/2020/04/16/mobx-hooks-market/

https://simsimjae.tistory.com/453
