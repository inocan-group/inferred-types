import type {
    Chars,
    Concat,
    IsGreaterThan,
    Subtract,
    TakeFirst,
    TakeLast
} from "inferred-types/types";

type PositiveOfNegative<T extends number> = `${T}` extends `-${infer N extends number}`
    ? N
    : never;

export type DropLeading<
    TList extends readonly unknown[],
    TStart extends number,
    TDepth extends readonly unknown[] = [],
> = TDepth["length"] extends TStart
    ? TList
    : number extends TStart
        ? TList
        : TDepth["length"] extends 64
            ? TList
            : TList extends readonly [unknown, ...infer Rest]
                ? DropLeading<Rest, TStart, [...TDepth, unknown]>
                : never;

export type DropTrailing<
    TList extends readonly unknown[],
    TStart extends number,
> = Subtract<TList["length"], TStart> extends infer Keep extends number
    ? number extends TStart
        ? TList
        : TakeFirst<TList, Keep>
    : [];

export type TruncateAtLen<
    TList extends readonly unknown[],
    TLen extends number | undefined,
> = TLen extends number
    ? number extends TLen
        ? TList
        : `${TLen}` extends `-${string}`
            ? DropTrailing<TList, PositiveOfNegative<TLen>>
            : TakeFirst<TList, TLen>
    : TList;

type ProcessList<
    TList extends readonly unknown[],
    TStart extends number,
    TLen extends number | undefined,
> = TList extends readonly unknown[]
    ? number extends TStart
        ? TruncateAtLen<TList, TLen>
        : `${TStart}` extends `-${string}`
            ? TakeLast<TList, PositiveOfNegative<TStart>>
            : IsGreaterThan<TStart, TList["length"]> extends true
                ? TLen extends number
                    ? []
                    : never
                : TruncateAtLen<DropLeading<TList, TStart>, TLen>
    : never;

type ProcessChars<
    TList extends readonly string[],
    TStart extends number,
    TLen extends number | undefined,
> = ProcessList<TList, TStart, TLen> extends readonly string[]
    ? ProcessList<TList, TStart, TLen> extends infer Result extends readonly string[]
        ? Concat<Result>
        : never
    : never;

/**
 * **Slice**`<TList, TStart, TLen>`
 *
 * Provides a slice of a tuple or a string.
 *
 * - negative indexes for `TEnd` can be used
 * - `TStart` defaults to 0
 * - `TLen` defaults to the all the remaining elements
 * but can be any amount; if you use negative values this
 * will drop that many values off the end of the tuple
 *
 * **Related:** `SliceArray`, `SliceString`
 */
export type Slice<
    TList extends readonly unknown[] | string,
    TStart extends number,
    TLen extends number | undefined = undefined,
> = [TList] extends [string]
    ? SliceString<TList, TStart, TLen>
    : [TList] extends [readonly unknown[]]
            ? SliceArray<TList, TStart, TLen>
            : never;

/**
 * **SliceArray**<TList, TStart, [TLen]>
 *
 * Slices an array.
 *
 * - negative indexes for `TEnd` can be used
 * - `TStart` defaults to 0
 * - `TLen` defaults to the all the remaining elements
 * but can be any amount; if you use negative values this
 * will drop that many values off the end of the tuple
 *
 * **Related:** `Slice`, `SliceArray`
 */
export type SliceString<
    TStr extends string,
    TStart extends number,
    TLen extends number | undefined = undefined
> = Chars<TStr> extends infer Characters extends readonly string[]
    ? IsGreaterThan<TStart, Characters["length"]> extends true
        ? ""
        : ProcessChars<Characters, TStart, TLen>
    : never;

/**
 * **SliceArray**<TList, TStart, [TLen]>
 *
 * Slices an array.
 *
 * - negative indexes for `TEnd` can be used
 * - `TStart` defaults to 0
 * - `TLen` defaults to the all the remaining elements
 * but can be any amount; if you use negative values this
 * will drop that many values off the end of the tuple
 *
 * **Related:** `Slice`, `SliceString`
 */
export type SliceArray<
    TList extends readonly unknown[],
    TStart extends number,
    TLen extends number | undefined = undefined
> = ProcessList<[...TList], TStart, TLen> extends infer Result extends readonly unknown[]
    ? Result extends readonly (TList[number])[]
        ? Result
        : never
    : never;
