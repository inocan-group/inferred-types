import { AsString, HasCharacters, IsNever, IsStringLiteral, NumberLike } from "../..";


/**
 * **IsInteger**`<T>`
 * 
 * Boolean operator which tests whether `T` is a **integer** representation of
 * a `NumberLike` type `T`.
 */
export type IsInteger<T> = [IsNever<T>] extends [true]
? false
: [T] extends [NumberLike]
  ? [IsStringLiteral<AsString<T>>] extends [true]
    ? [HasCharacters<AsString<T>, ".">] extends [true]
      ? false
      : true
  : boolean
: false;
