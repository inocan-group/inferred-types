import type { EmptyObject } from "src/base-types";

type MergeTypes<
    TTypes extends readonly any[],
    TResult = EmptyObject
> = TTypes extends [infer Head, ...infer Rest]
    ? MergeTypes<Rest, TResult & Head>
    : TResult;

type OnlyFirst<T, U> = T & { [K in keyof Omit<U, keyof T>]?: never };

type _OneOf<
    T extends readonly any[],
    TAll = MergeTypes<T>,
    TResult = never
> = T extends [infer Head, ...infer Rest]
    ? _OneOf<
        Rest,
        TAll,
    TResult | OnlyFirst<Head, TAll>
    >
    : TResult;

;

/**
 * **OneOf**`<T>`
 *
 * Creates an _exclusive_ union between types of `T`.
 */
export type OneOf<
    T extends readonly any[]
> = _OneOf<T>;
