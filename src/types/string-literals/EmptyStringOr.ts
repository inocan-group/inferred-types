import { TupleToUnion , EmptyString } from "src/types";

/**
 * **EmptyStringOr**`<T>`
 * 
 * A type utility to build a union between an empty string
 * _or_ the string literal `T`.
 */
export type EmptyStringOr<T extends string | readonly string[]> = 
  T extends readonly string[]
    ? EmptyString | TupleToUnion<T & readonly string[]>
    : EmptyString | (T & string);  
