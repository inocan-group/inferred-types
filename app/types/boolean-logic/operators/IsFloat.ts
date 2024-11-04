import { HasCharacters, IsNever, IsStringLiteral, NumberLike } from "src/types/index";


/**
 * **IsFloat**`<T>`
 *
 * Boolean operator which tests whether `T` is a **float** representation of
 * a `NumberLike` type `T`.
 *
 * **Warning:** when using numeric values like `1.0` the `.0` portion is lost before
 * making the comparison so it is not possible to mark this as a float value.
 * However, the string literal version of `"1.0"` **is** marked as a float.
 */
export type IsFloat<T> = [IsNever<T>] extends [true]
? false
: [T] extends [NumberLike]
  ? [IsStringLiteral<`${T}`>] extends [true]
    ? [HasCharacters<`${T}`, ".">] extends [true]
      ? true
      : false
  : boolean
: false;


