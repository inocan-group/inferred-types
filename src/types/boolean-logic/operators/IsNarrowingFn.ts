import { AnyFunction, Not, IsEqual, LiteralFn } from "src/types/index";




/**
 * **IsNarrowingFn**`<TFn>`
 * 
 * A boolean operator which checks whether `TFn` uses generics
 * to narrow the input parameters. This is in contrast to a function
 * which takes literal types rather than _extending_ them.
 * 
 * **Related:** `NarrowingFn`, `IsLiteralFn`
 */
export type IsNarrowingFn<TFn> = TFn extends AnyFunction
? Not<IsEqual<
    LiteralFn<TFn>,TFn
  >>
: false;
