import type {
    AfterFirst,
    As,
    EmptyObject,
    ExpandRecursively,
    First,
    Push,
    Split,
    TrimEach
} from "inferred-types/types";

type DropEmptyRows<
    T extends readonly string[][],
    R extends readonly string[][] = []
> = T extends [
    infer Head extends readonly string[],
    ...infer Rest extends readonly string[][]
]
    ? Head extends [""]
        ? DropEmptyRows<Rest, R>
        : DropEmptyRows<Rest, As<Push<R, Head>, readonly string[][]>>
    : R;

type Multi<
    TCsv extends string,
    TRows extends readonly string[] = Split<TCsv, "\n">,
    TResult extends readonly string[][] = []
> = TRows extends readonly [
    infer Head extends string,
    ...infer Rest extends readonly string[]
]
    ? Split<Head, ","> extends infer Cols extends readonly string[]
        ? Multi<
            TCsv,
            Rest,
            As<Push<TResult, TrimEach<Cols>>, readonly string[][]>
        >
        : never
    : DropEmptyRows<
        TResult
    >;

type BuildKv<
    TCols extends readonly string[],
    TData extends readonly string[],
    TResult extends Record<string, string> = EmptyObject
> = TCols extends [
    infer Head extends string,
    ...infer Rest extends readonly string[]
]
    ? BuildKv<
        Rest,
        AfterFirst<TData>,
        TResult & Record<Head, First<TData>>
    >
    : As<ExpandRecursively<TResult>, Record<string, string>>;

type Kv<
    THead extends string,
    TRows extends readonly string[],
    TColNames extends readonly string[] = TrimEach<Split<THead, ",">>,
    TResult extends Record<string, string>[] = []
> = TRows extends readonly [
    infer Row extends string,
    ...infer Rest extends readonly string[]
]
    ? TrimEach<Split<Row, ",">> extends infer ColData extends readonly string[]
        // Skip empty rows (rows that become [""] after trimming)
        ? ColData extends readonly [""]
            ? Kv<THead, Rest, TColNames, TResult>
            : Kv<
                THead,
                Rest,
                TColNames,
                [
                    ...TResult,
                    BuildKv<TColNames, ColData>
                ]
            >
        : never
    : TResult;

/**
 * **FromCsv**`<T, [F]>`
 *
 * Takes a string containing CSV data and converts it into
 * either:
 *
 * 1. a multidimensional array of data in rows by columns format
 * 2. an array of key/value dictionaries where the _keys_ are the
 * column names for a given row
 *
 * The second output type will only work if the first row of data
 * has
 */
export type FromCsv<
    TCsv extends string,
    TFormat extends "[][]" | "KV[]" = "[][]"
>
    = TFormat extends "[][]"
        ? As<
            Multi<TCsv>,
            string[][]
        >

        : TFormat extends "KV[]"
            ? Split<TCsv, "\n"> extends infer Rows extends readonly string[]
                ? Kv<First<Rows>, AfterFirst<Rows>>
                : never
            : never;
