import type { Narrowable, Unset } from "src/literals";

/**
 * **RuntimeTakeFunction**`<T,E>`
 *
 * A `take` function which tries to take the _head_ of the string
 * for the token/thing it wants to extract. It returns either:
 *
 * - `Unset`
 *     - returns an `Unset` type when this take function didn't find
 *     anything to work with at the HEAD of the parse string.
 *
 * - `[T, string]`
 *     - a tuple is returned when the take function finds and extracts
 *      the token/thing it was looking for
 *
 * - `Error` | `E`
 *     - an error is returned when the take function finds
 *      the _block_ it is looking for but that block is malformed
 *      in some manner
 *     - it is encouraged that you use the runtime utilities for
 *     creating the take functions because that allows setting
 *     the allowed error types for the take function.
 */
export type RuntimeTakeFunction<
    T = Narrowable,
    E extends Error = Error
> = <
    TParseStr extends string
>(input: TParseStr) => Unset | [T, string] | E;
