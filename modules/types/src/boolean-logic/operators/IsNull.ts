import type { IsAny,  IsNever } from "inferred-types/types";

/**
 * **IsNull**`<T>`
 *
 * Type utility which returns a boolean flag based on whether the given
 * type is **null**.
 */
export type IsNull<T> = IsNever<T> extends true ? false
  : [IsAny<T>] extends [true] ? boolean
  : [T] extends [null] ? true
  : [Extract<T, null>] extends [never] ? false
  : boolean;

