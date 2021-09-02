# Disallows member access on any typed variables (`no-unsafe-member-access`)

Despite your best intentions, the `any` type can sometimes leak into your codebase.
Member access on `any` typed variables is not checked at all by TypeScript, so it creates a potential safety hole, and source of bugs in your codebase.

any타입인 값을 사용하여 프로퍼티에 접근 하는것을 체크할지 설정하는 룰

## Rule Details

This rule disallows member access on any variable that is typed as `any`.

```ts
// incorrect
declare const anyVar: any;
declare const nestedAny: { prop: any };

// correct
declare const properlyTyped: { prop: { a: string } };

// warning
properlyTyped[anyVar];

// warning
anyVar.a;
anyVar.a.b;
anyVar["a"];
anyVar["a"]["b"];

// warning
nestedAny.prop.a;
nestedAny.prop["a"];

// pass
properlyTyped.prop.a;
properlyTyped.prop["a"];

const key = "a";

// warning
nestedAny.prop[key];
// pass
properlyTyped.prop[key];

// Using an any to access a member is unsafe
const arr = [1, 2, 3];

// warning
arr[anyVar];
nestedAny[anyVar];

// pass
arr[1];
let idx = 1;
arr[idx];
arr[idx++];
```

## Running eslint

```bash
4:1   warning  Unsafe member access .a on an `any` value        @typescript-eslint/no-unsafe-member-access
5:1   warning  Unsafe member access .a on an `any` value        @typescript-eslint/no-unsafe-member-access
6:1   warning  Unsafe member access ['a'] on an `any` value     @typescript-eslint/no-unsafe-member-access
7:1   warning  Unsafe member access ['a'] on an `any` value     @typescript-eslint/no-unsafe-member-access
9:1   warning  Unsafe member access .a on an `any` value        @typescript-eslint/no-unsafe-member-access
10:1   warning  Unsafe member access ['a'] on an `any` value     @typescript-eslint/no-unsafe-member-access
13:1   warning  Unsafe member access [key] on an `any` value     @typescript-eslint/no-unsafe-member-access
17:5   warning  Computed name [anyVar] resolves to an any value  @typescript-eslint/no-unsafe-member-access
18:11  warning  Computed name [anyVar] resolves to an any value  @typescript-eslint/no-unsafe-member-access
```
