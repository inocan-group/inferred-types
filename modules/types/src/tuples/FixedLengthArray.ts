import type { AsNumber } from "inferred-types/types";
import type { NumberLike } from "types/numeric-literals";

type MapItemType<T, I> = { [K in keyof T]: I };

type Shift<T extends readonly unknown[][]> = T extends readonly [
    unknown[],
    ...infer Rest extends unknown[][]
]
    ? Rest
    : [];

type GrowExpRev<
    T extends unknown[],
    N extends number,
    P extends unknown[][]
> = T["length"] extends N
    ? T
    : [...T, ...P[0]][N] extends undefined
        ? GrowExpRev<[...T, ...P[0]], N, P>
        : GrowExpRev<T, N, Shift<P>>;

type GrowExp<
    T extends unknown[],
    N extends number,
    P extends unknown[][],
    L extends number = T["length"]
> = L extends N
    ? T
    : L extends 8192
        ? unknown[]
        : [...T, ...T][N] extends undefined
            ? GrowExp<[...T, ...T], N, [T, ...P]>
            : GrowExpRev<T, N, P>;

type Process<
    T,
    N extends number,
> = number extends N
    ? T[]
    : N extends 0
    ? []
    : GrowExp<[unknown], N, []> extends infer R extends readonly unknown[]
        ? MapItemType<R, T>
        : never;

/**
 * **FixedLengthArray**`<TType,TLen,[TOpt]>`
 *
 * Creates a fixed length `TLen` array of a given type `T`.
 *
 * - if `TOpt` is set to true then it will add an optional
 * continuation of the type to unlimited length
 *
 * **Related:** `NumericSequence`
 */
export type FixedLengthArray<
    TType,
    TLen extends NumberLike,
    TExtends extends boolean = false,
> = TExtends extends true
    ? AsNumber<TLen> extends infer Len extends number
        ? Process<TType, Len> extends infer Fixed extends readonly unknown[]
            ? number extends Len
                ? TType[]
                : [...Fixed, ...TType[]]
            : never
        : never
    : AsNumber<TLen> extends infer Len extends number
        ? Process<TType, Len>
        : never;
