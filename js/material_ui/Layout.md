## [Box](https://next.material-ui.com/components/Box)

- 기본적으경 감싸는 역할을 한다
- div가 디폴트 값으로 지정 됨.
- 그냥 div넣을 곳에 넣는다는 느낌으로 사용하면 될 것 같다.

```jsx
<Box component="span">
  {" "}
  // span으로 변경
  <Button>button</Button>
</Box>
```

1. use React.cloneElement()
   - react의 클론 요소 메서드를 사용할 수 있다

```jsx
<Box color="text.primary" clone>
  <Button />
</Box>
```

2. use render props
   - props를 사용하여 렌더링 값으로 이용할 수 있다.

```jsx
<Box color="text.primary" clone>
  {(props) => <Button {...props} />}
</Box>
```

2. use render props
   - props를 사용하여 렌더링 값으로 이용할 수 있다.

```jsx
<Box color="text.primary" clone>
  {(props) => <Button {...props} />}
</Box>
```

## [Container](https://next.material-ui.com/components/container)

- 컨테이너는 콘텐츠를 수평으로 중앙에 배치하는 기본적인 배치요소이다.

1. Fluid

- maxWidth를 지정하여 너비 지정할 수 있다

2. Fixed

- 뷰포트로 동적인 크기를 수용하는 대신 고정된 크기의 설계하는 경우 Fixed 프로퍼티 사용가능

## [Grid](https://next.material-ui.com/components/grid)

- 디스플레이 그리드 사용하지 않고 플렉스 박스를 이용한 그리드 배치 레이아웃
- 12열 그리드 레이아웃을 기반으로 함
- 당연히 디스플레이 그리드 처럼 상하좌우 배치 커스텀하여 사용할 수 있다

1. xs

   - 얼마만큼의 간격을 가질지 정할 수 있다.
   - 1 ~ 12까지의 정수 기입 가능.
   - ```jsx
     <Grid container>
       <Grid xs={8}>1</Grid>
       <Grid xs={4}>2</Grid>
       <Grid xs={10}>3</Grid>
       <Grid xs={2}>4</Grid>
     </Grid>
     ```

2. spacing

- 그리드의 gap속성과 같다, 간격을 나누어주는 속성
- spacing={1} === 8px
  ```jsx
  <Grid container spacing={2}>
    <Grid xs={8}>1</Grid>
    <Grid xs={4}>2</Grid>
  </Grid>
  ```

3. Responsive value

   - 크기에따라 값 변경 가능

```jsx
<Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {Array.from(Array(6)).map((_, index) => (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <Item>xs=2</Item>
      </Grid>
    ))}
  </Grid>
</Box>
```

4. row & column spacing

   - 가로세로 각각 간격을 지정해줄 수 있다

```jsx
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
```

5. Interactive

   - 플렉스 요소 배치하는것 처럼 적용 가능

```jsx
  <Grid
    container
    direction="row"
    justifyContent="space-evenly"
    alignItems="baseline"
  >
```

6. auto-layout

- xs에 값을 넘기지 않거나, "auto"로 넘기면 grid 1fr적용이 된다

7.  중첩 그리드

- 전체 부모 컨테이너 안에 컨테이너 item을 넣어 적용할 수 있다.

```jsx
<Grid container spacing={1}>
  <Grid container item spacing={3}>
    <FormRow />
  </Grid>
  <Grid container item spacing={3}>
    <FormRow />
  </Grid>
  <Grid container item spacing={3}>
    <FormRow />
  </Grid>
</Grid>
```

8. 컬럼

- 총 몇 칸을 컬럼으로 지정할지 기입 가능

```jsx
  <Grid container spacing={2} columns={16}>
```

9. css 그리드 적용가능!!

```jsx
<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
  <Box gridColumn="span 8">
    <Item>xs=8</Item>
  </Box>
  <Box gridColumn="span 4">
    <Item>xs=4</Item>
  </Box>
  <Box gridColumn="span 4">
    <Item>xs=4</Item>
  </Box>
  <Box gridColumn="span 8">
    <Item>xs=8</Item>
  </Box>
</Box>
```

10. system props

- 여러가지 css 속성을 적용 가능하다.

```jsx
  <Grid item p={2} > // 패딩 16
```

## Stack

- 스택처럼 수직으로 쌓는것이 기본 값

  ```jsx
  <Stack spacing={2}>
    <Item>Item 1</Item>
    <Item>Item 2</Item>
    <Item>Item 3</Item>
  </Stack>

  // direction으로 방향 지정가능
  <Stack direction="row" spacing={2}>
  ```

1. Dividers

   - 칸막이 가능

```jsx
<Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={2}
  mt={2} // marginTop
  mb={3} // marginBottom
  pb={4} // paddingBottom 등등 ..
>
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Item 3</Item>
</Stack>
```

2. 반응형 값

```jsx
<div>
  <Stack
    direction={{ xs: "column", sm: "row" }} // 크기가 클땐 row 작을땐 컬럼
    spacing={{ xs: 1, sm: 2, md: 4 }}
  >
    <Item>Item 1</Item>
    <Item>Item 2</Item>
    <Item>Item 3</Item>
  </Stack>
</div>
```
