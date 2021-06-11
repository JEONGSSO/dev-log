ref를 여러 엘리먼트에 적용하여 사용해야되는 상황이어서 구글링.

```js
const App = (props) => {
  const itemsRef = useRef([]);
  // you can access the elements with itemsRef.current[n]

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, props.items.length);
  }, [props.items]);

  return props.items.map((item, i) => (
    <div key={i} ref={(el) => (itemsRef.current[i] = el)}>
      ...
    </div>
  ));
};
```

itemsRef에 인덱스로 엘리먼트를 순서대로 저장하고

itemsRef.current[n]으로 사용을 하면 된다.

---

## 참조

https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
