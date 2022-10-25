/**
 * **MapTo**
 *
 * Maps from one type `I` to another `O[]`
 *
 * **Note:** because the output is an array you can easily support `1:1` and `1:M` mappings
 * but not a filtering operation (e.g., `1:0`); if you need this then use `MapToWithFiltering`
 * instead.
 */
export type MapTo<I extends {}, O extends {}> = (i: I) => O[];

/**
 * **MapToWithFiltering**
 *
 * Maps from one type `I` to another `(O | null)[]`
 *
 * **Note:** because the output is an array you can easily support `1:1` and `1:M` mappings
 * and the allowance of the conversion to result in a `null` value also means that filter
 * out an input value entirely is possible. If you don't need _filtering_ then use the
 * `MapTo` type instead.
 */

export type MapToWithFiltering<I extends {}, O extends {}> = (i: I) => O[] | null;
