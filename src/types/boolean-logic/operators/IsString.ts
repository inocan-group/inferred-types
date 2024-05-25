import { IsUnion } from "./IsUnion";

/**
 * **IsString**
 *
 * Type utility which returns true/false based on whether `T` is a
 * string (wide or narrow).
 */
export type IsString<T> = IsUnion<T> extends true
? [string] extends [T]
  ? boolean
  : false
: [T] extends [string] ? true : false;
