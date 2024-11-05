import { Tuple } from "inferred-types/dist/types/index";
import { Or } from "../combinators";
import { IsFalse, IsNever } from "../operators";


type ShouldFail<TTest> = [IsNever<TTest>] extends [true]
? true
: [IsFalse<TTest>] extends [true]
? true
: false;

type Iterate<
  TTest extends readonly unknown[]
> = Or<{
  [K in keyof TTest]: ShouldFail<[TTest[K]]>
}>

/**
 * **Fail**`<TVal, TTest>`
 *
 * A branching utility which tests `TTest` for `false`, `never`, or `ErrorCondition`
 * and if matched will set the value to `never`. If there is _not_ a match then
 * `TVal` will be passed through.
 *
 * If you wish to have more than one test which might produce the failure
 * condition you can pass in a tuple of tests into `TTest` and if _any_ of
 * the tests fail then the condition fails.
 */
export type Fail<
  TVal,
  TTest
> = [TTest] extends [Tuple]
? [Iterate<TTest>] extends [true]
  ? never
  : TVal
: [ShouldFail<TTest>] extends [true]
  ? never
  : TVal;
