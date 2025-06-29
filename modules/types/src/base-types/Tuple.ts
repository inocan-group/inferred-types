import type { FixedLengthArray } from "inferred-types/types";

export type TupleRange = [required: number, optional: number];

type _Tuple<
    TType = unknown,
    TLength extends number | TupleRange | `${number}+` = 0,
> = 0 extends TLength
    ? TType extends unknown[]
        ? Readonly<TType>
        : readonly TType[]
    : TLength extends number
        ? Readonly<FixedLengthArray<TType, TLength>>
        : TLength extends TupleRange
            ? Readonly<[
                ...FixedLengthArray<TType, TLength[0]>,
                ...FixedLengthArray<TType | undefined, TLength[1]>,
            ]>
            : TLength extends `${infer Num extends number}+`
                ? Num extends number
                    ? Readonly<[
                        ...FixedLengthArray<TType, Num>,
                        ...TType[],
                    ]>
                    : never
                : never;

/**
 * **Tuple**`<TType,TLength>`
 *
 * As a default, a **Tuple** is represented as a readonly array of _unknown_ properties.
 *
 * - by expressing `TType` you can state either a constant type _or_ a list of types
 * - by expressing `TLength` it will make the tuple a fixed length (assuming that `TType`
 * is set to a constant value rather than as a list)
 * ```ts
 * // readonly unknown[]
 * type T1 = Tuple;
 * // readonly [string, string, string, string]
 * type T2 = Tuple<string, 4>;
 * ```
 */
export type Tuple<
    TType = unknown,
    TLength extends number | TupleRange | `${number}+` = 0,
> = _Tuple<TType, TLength> extends readonly unknown[]
    ? _Tuple<TType, TLength>
    : never;
