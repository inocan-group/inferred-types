import type { IsEqual, TypedFunction } from "inferred-types/types";

/**
 * **ReturnsTrue**`<T>`
 *
 * Type utility which indicates whether the _return value_ of `T` is
 * a `false` value. Possible values are `true`, `false`, or `boolean`.
 *
 * Note: any non-functions passed in as `T` are removed from the result set
 */
export type ReturnsFalse<T> = T extends TypedFunction
    ? ReturnType<T> extends false
        ? true
        : IsEqual<ReturnType<T>, boolean> extends true ? boolean : false
    : false;
