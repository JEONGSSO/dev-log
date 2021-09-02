# Prefer usage of `as const` over literal type (`prefer-as-const`)

This rule recommends usage of `const` assertion when type primitive value is equal to type.

변수의 값과 변수의 타입이 같은 경우에 const를 assertion 사용하는것을 권장

## Rule Details

Examples of **incorrect** code for this rule:

```ts
let bar: 2 = 2;
let foo = <"bar">"bar";
let foo = { bar: "baz" as "baz" };
```

Examples of **correct** code for this rule:

```ts
let foo = "bar";
let foo = "bar" as const;
let foo: "bar" = "bar" as const;
let bar = "bar" as string;
let foo = <string>"bar";
let foo = { bar: "baz" };
```

## Running eslint

```bash
  34:10  warning  Expected a `const` assertion instead of a literal type annotation  @typescript-eslint/prefer-as-const
  35:12  warning  Expected a `const` instead of a literal type assertion             @typescript-eslint/prefer-as-const
  36:27  warning  Expected a `const` instead of a literal type assertion             @typescript-eslint/prefer-as-const
```

## When Not To Use It

If you are using TypeScript < 3.4
