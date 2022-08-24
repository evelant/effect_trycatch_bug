import * as T from "@effect/core/io/Effect";
import { pipe } from "@tsplus/stdlib/data/Function";

function willError() {
  console.log(`about to throw`);
  throw new Error(`ERROR`);
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
