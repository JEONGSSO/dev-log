# emotion js

## styled-component와 비교되는 라이브러리.

---
## composition 기능

```jsx
import { jsx, css } from '@emotion/core'

render(
  <div>
    <style>
      {`
        .danger {
          color: red;
        }
        .base {
          background-color: lightgray;
          color: turquoise;
        }
      `}
      >
    </style>
    <p className="base danger">What color will this be?</p>
  </div>
)
```

p태그의 class를 base와 danger를 주면 빨간색으로 나올 것 같지만 클래스 base의 색상이 출력된다.
기존에는 !important를 사용해서 처리했었다,

emotion에서는

```js
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const danger = css`
  color: red;
`

const base = css`
  background-color: darkgreen;
  color: turquoise;
`

render(
  <div>
    <div css={base}>This will be turquoise</div>
    <div css={[danger, base]}>
      This will be also be turquoise since the base styles
      overwrite the danger styles.
    </div>
    <div css={[base, danger]}>This will be red</div> //이처럼 순서를 하고싶은대로 배치해 css적용 가능.
  </div>
)
```

### mixin 처럼 사용할 수 있다.

```js
const button = css`
  border: 2px solid black;
  font-size: 20px;
`;

const whiteButton = css`
  ${button}
  label: white-button;
  background-color: white;
  color: black;
`;

const blackButton = css`
  ${button}
  label: black-button;
  background-color: black;
  color: white;
`;
```

css in js는 next.js에서도 권장할만큼 ssr 구현시에도 좋다.
styled-component와 비교해서 emotion js를 고른이유는 더 용량이 적고, 더 사용자가 많은 emotion js를 골랐다.

이모션 홈페이지: https://emotion.sh/docs/introduction