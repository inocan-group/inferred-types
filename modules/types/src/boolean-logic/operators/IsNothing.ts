import type { Nothing } from "inferred-types/types";

/**
 * **IsNothing**`<T>`
 *
 * Boolean operator which tests whether `T` is _nothing_ (aka.,
 * `null` or `undefined`).
 */
export type IsNothing<T> = [T] extends [Nothing]
  ? true
  : false;
