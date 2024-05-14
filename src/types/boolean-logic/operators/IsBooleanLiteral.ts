import type {  If, IsFalse, IsNever, IsTrue } from "src/types/index";

// [note on handling of boolean](https://stackoverflow.com/questions/74213646/detecting-type-literals-works-in-isolation-but-not-when-combined-with-other-lite/74213713#74213713)

/**
 * **IsBooleanLiteral**`<T>`
 *
 * Boolean type utility which detects whether `T`
 * is a boolean literal (aka, is `true` or `false`)
 */
export type IsBooleanLiteral<
  T
> = [IsNever<T>] extends [true]
  ? false
  : [IsTrue<T>] extends [true] 
    ? true
    : [IsFalse<T>] extends [true]
    ? true
    : false;

