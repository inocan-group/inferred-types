import type { IsUnion, WidenUnion } from "inferred-types/types";

/**
 * **IsString**
 *
 * Type utility which returns true/false based on whether `T` is a
 * string (wide or narrow).
 */
export type IsString<T> = [IsUnion<T>] extends [true]
  ? WidenUnion<T> extends string
    ? true
    : string extends WidenUnion<T>
      ? boolean
      : false
  : [T] extends [string] ? true : false;
