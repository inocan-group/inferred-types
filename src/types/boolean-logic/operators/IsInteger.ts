import { HasCharacters, IsNever, IsStringLiteral, NumberLike } from "inferred-types/dist/types/index";


/**
 * **IsInteger**`<T>`
 *
 * Boolean operator which tests whether `T` is a **integer** representation of
 * a `NumberLike` type `T`.
 */
export type IsInteger<T> = [IsNever<T>] extends [true]
? false
: [T] extends [NumberLike]
  ? [IsStringLiteral<`${T}`>] extends [true]
    ? [HasCharacters<`${T}`, ".">] extends [true]
      ? false
      : true
  : boolean
: false;
