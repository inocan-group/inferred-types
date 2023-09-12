import { IsString } from "src/types";

/**
 * **IfString**`<T,TRUE,FALSE>`
 *
 * Type utility which determines if `T` is a _string_ (wide or narrow) and
 * returns `TRUE` type if it is, otherwise returns the type `FALSE`.
 */
export type IfString<
  T, //
  TRUE,
  FALSE
> = IsString<T> extends true ? TRUE : IsString<T> extends false ? FALSE : TRUE | FALSE;
