import { RemoveNever } from "../containers";
import { NumberLike } from "../numeric-literals";
import { AsNumber } from "../type-conversion";


/**
 * **AsNumericArray**`<T>`
 *
 * Converts into a numeric array:
 *
 * - `number` values are proxied through
 * - `${number}` values are converted to a number
 * - all other types are converted to `never` and removed
 */
export type AsNumericArray<T> = T extends readonly unknown[]
? RemoveNever<{
  [K in keyof T]: T[K] extends NumberLike
    ? AsNumber<T[K]>
    : never
}>
: never;
