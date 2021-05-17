폰트를 적용 할 때

```css
@font-face {
  font-family: YoonGothicPro;
  font-weight: 600;
  src: url("../fonts/YoonGothicPro760.eot"),
    url("../fonts/YoonGothicPro760.eot?#iefix") format("embedded-opentype"), url("../fonts/YoonGothicPro760.woff")
      format("woff");
  unicode-range: U+AC00-D79D, U+0030-0039, U+0041-005A, U+0061-007A, U+4E00-9FA0; /* 이 폰트의 범위를 정의 */
  font-display: swap;
}
```

## font-display (IE 미지원)

- block
  - 폰트가 로딩이 되지 않으면 해당 글자가 보이지않는 상태 **로딩되면 글자와 폰트를 보여줌**
- swap
  - 기존 폰트로 적용되다가 폰트가 **로딩되면 폰트 전환**
- fallback
  - 100ms 동안 글자가 보이지 않는다 그 후 **2초안에 로딩이 되면 폰트 전환** (캐시 저장됨)
- optional
  - 100ms 동안 글자가 보이지 않는다 그 후 **네트워크 상태 파악하여 폰트 전환** (상황에 따라 적용) (캐시 저장됨)

https://d2.naver.com/helloworld/4969726
