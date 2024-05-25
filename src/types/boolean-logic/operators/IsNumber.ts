import { IsUnion } from "./IsUnion";

/**
 * **IsNumber**`<T>`
 * 
 * Boolean type utility testing whether `T` is a numeric type.
 */
export type IsNumber<T> = IsUnion<T> extends true
? [number] extends [T]
  ? boolean
  : false
: [T] extends [number] ? true : false;
