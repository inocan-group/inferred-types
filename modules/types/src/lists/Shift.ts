import type {
    AsArray,
    AsString,
    Chars,
    Concat,
    IsUndefined,
    Tuple,
} from "inferred-types/types";

type _Shift<TList extends Tuple> //
    = TList extends [unknown, ...(infer Tail)]
        ? Tail
        : undefined;

type _ShiftChar<TList extends Tuple> //
    = TList extends [unknown, ...(infer Tail)]
        ? Tail
        : never;

/**
 * **Shift**`<T>`
 *
 * Removes the first element of a list, returning the rest.
 * ```ts
 * // [2,3]
 * type T = Shift<[1,2,3]>;
 * ```
 *
 * - to provide additional utility, you can also pass
 * in a string literal and get back the literal with the first
 * character removed.
 * - if there is nothing left in Tuple or an empty string is passed in as input
 * then the output will _undefined_.
 */
export type Shift<
    T extends undefined | string | readonly unknown[],
> = IsUndefined<T> extends true
    ? undefined
    : [] extends T
        ? undefined
        : T extends readonly unknown[]
            ? _Shift<AsArray<T>>
            : string extends T
                ? string
                : T extends string
                    ? T extends ""
                        ? undefined
                        : _Shift<AsArray<Chars<AsString<T>>>> extends readonly string[]
                            ? Concat<_Shift<AsArray<Chars<AsString<T>>>>>
                            : undefined
                    : never;
