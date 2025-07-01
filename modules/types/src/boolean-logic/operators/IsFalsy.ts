import type { IsTruthy, Not } from "inferred-types/types";

/**
 * **IsFalsy**`<T>`
 *
 * Boolean operator which tests whether `T` is _falsy_.
 */
export type IsFalsy<T> = Not<IsTruthy<T>>;
