import type { IsBoolean, TypedFunction } from "inferred-types/types";

/**
 * **ReturnsBoolean**`<T>`
 *
 * Type utility which indicates whether the _return value_ of `T` is
 * a `false` value. Possible values are `true`, `false`, or `boolean`.
 *
 * Note: any non-functions passed in as `T` are always a **false** value
 */
export type ReturnsBoolean<T> = T extends TypedFunction
    ? IsBoolean<ReturnType<T>>
    : false;
