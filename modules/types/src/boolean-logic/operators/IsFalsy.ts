import type { ExtendsSome, If } from "inferred-types/types";

/**
 * **IsFalsy**`<T>`
 *
 * Boolean operator which tests whether `T` is _falsy_.
 */
export type IsFalsy<T> = If<
    ExtendsSome<T, ["", false, null, undefined, 0, -0, typeof Number.NaN]>,
    true,
    false
>;
