import type { DropVariadic, IsAny, IsEqual, IsNever } from "inferred-types/types";

/**
 * **IsWideArray**`<T>`
 *
 * Boolean operator which returns `true` when `T` is a wide array type.
 * A wide array is one where the length is not fixed (e.g.,
 * `string[]`, `number[]`, `(string | number)[]`).
 *
 * - `any` and `never` types return `false`
 * - `unknown` returns `boolean`
 */
export type IsWideArray<T> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : T extends readonly unknown[]
            ? IsEqual<T["length"], number> extends true
                ? number extends DropVariadic<T>["length"]
                    ? true
                    : false
                : false
            : false;
