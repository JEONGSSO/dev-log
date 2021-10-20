```ts
const MutatedProduct = (obj: typeof productValues) => {
  return (Object.keys(obj) as Array<keyof typeof obj>).reduce((prev, curr) => {
    if (values[curr] === data?.[curr]) return prev;

    return {
      ...prev,
      [curr]: values[curr],
    };
  }, {});
};
```

변경된 값만 obj에 담기
