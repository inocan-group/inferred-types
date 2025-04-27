import type { FalsyValue} from "inferred-types/types";

/**
 * **IsFalsy**`<T>`
 *
 * Boolean operator which tests whether `T` is _falsy_.
 */
export type IsFalsy<T> =T extends FalsyValue
    ? true
    : false
