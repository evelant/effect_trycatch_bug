`T.tryCatch` doesn't seem to work at all. This example program:

```ts
import * as T from "@effect/core/io/Effect";
import { pipe } from "@tsplus/stdlib/data/Function";

function willError() {
  console.log(`about to throw`);
  throw new Error(`ERROR THAT SHOULD BE CAUGHT`);
}
const test = pipe(
  T.tryCatch(willError, (err) => {
    console.log(`caught the error`, err);
    return err;
  }),
  T.tapError((err) => {
    console.log(`passed on the error`, err);
    return T.unit;
  })
);

T.unsafeRunSync(test);
```

when run results in

```
about to throw
/Users/imagio/dev/effect_trycatch_bug/node_modules/@effect/core/io/Runtime/definition.js:79
        throw tsplus_module_10.squashWith(tsplus_module_9.identity)(exit.cause);
        ^

Error: ERROR
    at ISync.effect (/Users/imagio/dev/effect_trycatch_bug/index.js:7:11)
    at FiberContext.runUntil (/Users/imagio/dev/effect_trycatch_bug/node_modules/@effect/core/io/Fiber/_internal/context.js:947:63)
    at FiberContext.run (/Users/imagio/dev/effect_trycatch_bug/node_modules/@effect/core/io/Fiber/_internal/context.js:1249:17)
    at Runtime.unsafeRunSyncExit (/Users/imagio/dev/effect_trycatch_bug/node_modules/@effect/core/io/Runtime/definition.js:100:15)
    at Object.Runtime.unsafeRunSync (/Users/imagio/dev/effect_trycatch_bug/node_modules/@effect/core/io/Runtime/definition.js:76:25)
    at Object.<anonymous> (/Users/imagio/dev/effect_trycatch_bug/index.js:12:3)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
```
