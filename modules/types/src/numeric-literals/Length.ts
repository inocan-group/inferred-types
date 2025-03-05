import type {
    IsWideType,
    StripLeading,
} from "inferred-types/types";


type _Length<
    T extends string,
    TCount extends number[] = []
> = T extends `${string}${infer Tail}`
? _Length<Tail, [...TCount, 0]>
: TCount["length"];

/**
 * Utility type which returns the length of:
 *
 * - an _array_ (provides the number of elements)
 * - an _object_ (provides the number of keys)
 * - a _string_ (provides the number of chars)
 * - a _number_ (it will provide the number of digits, excluding `-` if present)
 *
 * ```ts
 * type Three = Length<[ "a", "b", "c" ]>;
 * ```
 */
export type Length<
    T extends readonly any[] | string | number,
> = T extends readonly any[]
    ? T["length"]
    : IsWideType<T> extends true
    ? number
    : T extends number
            ? _Length<StripLeading<`${T}`, "-">>
        : T extends string
            ? _Length<T>
            : never;



