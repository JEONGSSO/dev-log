# Disallows member access on any typed variables (`no-unsafe-member-access`)

Despite your best intentions, the `any` type can sometimes leak into your codebase.
Member access on `any` typed variables is not checked at all by TypeScript, so it creates a potential safety hole, and source of bugs in your codebase.

## Rule Details

This rule disallows member access on any variable that is typed as `any`.

```ts
// bad
declare const anyVar: any;
declare const nestedAny: { prop: any };

// good
declare const properlyTyped: { prop: { a: string } };

// bad
anyVar.a;
anyVar.a.b;
anyVar["a"];
anyVar["a"]["b"];

nestedAny.prop.a;
nestedAny.prop["a"];

// good
properlyTyped.prop.a;
properlyTyped.prop["a"];

// bad
const key = "a";
nestedAny.prop[key];

// good
const key = "a";
properlyTyped.prop[key];

// Using an any to access a member is unsafe
// bad
const arr = [1, 2, 3];
arr[anyVar];
nestedAny[anyVar];

// good
const arr = [1, 2, 3];
arr[1];
const idx = 1;
arr[idx];
arr[idx++];
```
