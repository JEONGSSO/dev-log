## 번들크기 70% 줄어듬

### Switch -> Routes로 변경됨

### Route exact가 삭제되었고, \*를 exact가 아닌경우 라우팅 시 사용해야함 ex) "/invoices/\*"

```tsx
// v5

const match = useRouteMatch();

...
<Switch>
    <Route path={`${match.path}/me`}>
    <OwnUserProfile />
  </Route>
  <Route path={`${match.path}/:id`}>
    <UserProfile />
  </Route>
</Switch>

// v6
<Routes>
  {/* Route Component -> Element로 변경 */}
  <Route path="/" element={<Home />} />
  <Route path="users/*" element={<Users />} />
</Routes>
```

### useHistory -> useNavigate

```tsx
const history = useHistory();

const navigate = useNavigate();

// push
history.push;
navigate(to);

// replace
history.replace;
navigate(to, { replace: true });

// go
history.go(1);
navigate(1);

// back
history.go(-1);
navigate(-1);
```

### useRoutes를 사용해서 BrowserRouter안의 자식들 생성가능

```tsx
const element = useRoutes([
  // These are the same as the props you provide to <Route>
  { path: "/", element: <Home /> },
  { path: "dashboard", element: <Dashboard /> },
  {
    path: "invoices",
    element: <Invoices />,
    // Nested routes use a children property, which is also
    // the same as <Route>
    children: [
      { path: ":id", element: <Invoice /> },
      { path: "sent", element: <SentInvoices /> },
    ],
  },
  // Not found routes work as you'd expect
  { path: "*", element: <NotFound /> },
]);
```

---

### 참조

https://reactrouter.com/docs/en/v6/upgrading/v5#upgrade-to-react-router-v6

https://velog.io/@soryeongk/ReactRouterDomV6
