```html
<ul id="name" className="good">
  <li>a</li>
  <li>b</li>
</ul>
```

```js

React.createElement(
  type, // element (array도 사용가능하게되어 사람들이 박수를 쳤다고 한다.)
  [props], // 변경할 값들
  [...children] ReactElement
)

React.createElement(
  'ul',
  {id:'name', className:'good'},
  [...children] // li들
)

// ul이라는 임의의 함수를 만들어서 만들어주고 변경 될 때 이벤트 리스너로 다시 재 실행
// 이벤트 리스너는 리액트에서 만들어 준다.
const ul = (props) => {
  // 간략한 예제임
  return React.createElement('ul', props, [...children])
}


```

버추얼돔을 메모리에 실행콘텍스트에 올림
버추얼돔에 key가 없을 경우 임의로 key를 generate하여 list구조에서 map구조로 바꿈

map은 해시테이블이기 때문에 검색하지 않고 바로 유니크한 아이디를 찾아 버추얼돔에 있는 임의의 함수(위에서는 ul)
를 실행해 그 부분만 변경한다.

그래서 비교적 적은 비용으로 DOM을 그릴 수 있는 것.
