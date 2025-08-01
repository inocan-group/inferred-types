import type { HasVariadicTail, IsAny, IsEqual, IsNever, TupleMeta } from "inferred-types/types";

/**
 * **IsWideArray**`<T>`
 *
 * Boolean operator which returns `true` when `T` is a wide array type.
 * A wide array is one where the length is not fixed (e.g.,
 * `string[]`, `number[]`, `(string | number)[]`).
 */
export type IsWideArray<T> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false

        : T extends readonly unknown[]
            ? IsEqual<T["length"], number> extends true
                ? HasVariadicTail<T> extends true
                    ? false
                    : true
                : false
            : false;
