const curriedRowsSomeMethod =
  <T1, T2 extends (...args: Parameters<T2>) => ReturnType<T2>>(array: T1) =>
  (method: keyof T1) =>
  (callbackFn: T2): ReturnType<T2> =>
    // @ts-expect-error array method type check todo
    array[method]?.(callbackFn);
