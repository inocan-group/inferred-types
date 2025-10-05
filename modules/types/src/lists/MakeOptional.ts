import type { Increment, IsGreaterThan, Subtract } from "inferred-types/types";

type Process<
    TInput extends readonly unknown[],
    TReq extends number,
    TIndex extends number = 1,
    TOutput extends { required: readonly unknown[]; optional: readonly unknown[] } = { required: []; optional: [] }
> = TInput extends readonly [infer Head extends unknown, ...infer Rest extends readonly unknown[]]
    ? IsGreaterThan<TIndex, TReq> extends true
        ? Process<Rest, TReq, Increment<TIndex>, { required: TOutput["required"]; optional: [...TOutput["optional"], Head] }>
        : Process<Rest, TReq, Increment<TIndex>, { required: [...TOutput["required"], Head]; optional: TOutput["optional"] }>
    : [
        ...TOutput["required"],
        ...Partial<TOutput["optional"]>
    ];

/**
 * **MakeOptional**`<T>`
 *
 * Take a tuple `T` and makes the last `U` elements _optional_ with the
 * `?` optional modifier.
 *
 * ```ts
 * // [ string, number, string? ]
 * type Test = MakeOptional<[string, number, string], 1>;
 * ```
 *
 * **Note:**
 * - the mix of optional vs. required elements in `T` has no bearing on
 * the outcome.
 */
export type MakeOptional<
    T extends readonly unknown[],
    U extends number
> = Subtract<Required<T>["length"], U> extends infer Req extends number
    ? number extends Req
        ? never
        : Process<Required<T>, Req>
    : never;

export type MakeRequired<
    T extends readonly unknown[],
    U extends number
> = Process<Required<T>, U>;
