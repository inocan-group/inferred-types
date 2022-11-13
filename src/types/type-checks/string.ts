import { Narrowable } from "src/types";

/**
 * **IsString**
 *
 * Type utility which returns true/false based on whether `T` is a
 * string (wide or narrow).
 */
export type IsString<T> = T extends string ? true : false;

/**
 * **IfString**
 *
 * Type utility which determines if `T` is a _string_ (wide or narrow) and
 * returns `IF` type if it is, otherwise returns the type `ELSE`.
 */
export type IfString<
  T extends Narrowable, //
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsString<T> extends true ? IF : ELSE;
