import { Nothing } from "inferred-types/dist/types/index";

/**
 * **IsNothing**`<T>`
 *
 * Boolean operator which tests whether `T` is _nothing_ (aka.,
 * `null` or `undefined`).
 */
export type IsNothing<T> = [T] extends [Nothing]
? true
: false;
