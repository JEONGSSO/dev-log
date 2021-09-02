# Disallows the use of require statements except in import statements (`no-var-requires`)

In other words, the use of forms such as `var foo = require("foo")` are banned. Instead use ES6 style imports or `import foo = require("foo")` imports.

require를 사용하여 모듈을 가져오는 것을 금지, import를 사용하여 모듈을 가져오는것을 권장

## Rule Details

```ts
var foo = require("foo"); //warning
import foo = require("foo"); // pass

const foo = require("foo"); //warning
require("foo"); // pass

let foo = require("foo"); //warning
import foo from "foo"; // pass
```

## Running eslint

```bash
  38:11  warning  Require statement not part of import statement  @typescript-eslint/no-var-requires
  39:13  warning  Require statement not part of import statement  @typescript-eslint/no-var-requires
  40:11  warning  Require statement not part of import statement  @typescript-eslint/no-var-requires
```

## When Not To Use It

If you don't care about TypeScript module syntax, then you will not need this rule.

## Compatibility

- TSLint: [no-var-requires](https://palantir.github.io/tslint/rules/no-var-requires/)
