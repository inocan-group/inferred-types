import { IsHexadecimal, IsStringLiteral } from "inferred-types/dist/types/index"

/**
 * **IsHexadecimal**`<T>`
 *
 * Ensures that `T` is a valid hexadecimal and converts to **never**
 * otherwise.
 */
export type IsCssHexadecimal<T> = T extends string
? IsStringLiteral<T> extends true
  ? T extends `#${infer Rest}`
    ? IsHexadecimal<Rest>
    : false
  : boolean
: false;
