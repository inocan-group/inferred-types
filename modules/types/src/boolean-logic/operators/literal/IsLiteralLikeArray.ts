import type {
    DropVariadic,
    IsAny,
    IsNever,
    IsVariadicArray
} from "inferred-types/types";

/**
 * **IsLiteralLikeArray**`<T>`
 *
 * Tests whether the _shape_ of the array has at least one fixed type
 * (aka, non-variadic).
 *
 * ```ts
 * // true
 * type T1 = IsLiteralLikeArray<[...string[], number]>;
 * type T2 = IsLiteralLikeArray<[string, number, ...boolean[]]>;
 * // false
 * type F1 = IsLiteralLikeArray<(string | number)[]>;
 * ```
 *
 * **Related:** `IsLiteralLikeTuple`
 */
export type IsLiteralLikeArray<T>
= [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : [T] extends [readonly unknown[]]
            ? [IsVariadicArray<T>] extends [true]
                ? number extends DropVariadic<T>["length"]
                    ? false
                    : true
                : [number] extends [T["length"]]
                    ? false
                    : true

            : false;
