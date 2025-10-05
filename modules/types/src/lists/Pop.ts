import type {
    Chars,
    Concat,
    Decrement,
    DropVariadic,
    HasOptionalElements,
    IsGreaterThan,
    IsStringLiteral,
    IsVariadicArray,
    IsWideArray,
    IsWideType,
    MakeOptional,
    Tuple,
    TupleMeta,
    VariadicType
} from "inferred-types/types";

type _Pop<
    TVal extends Tuple,
> = TVal extends [...(infer Rest), unknown]
    ? Rest
    : [];

type AdjustVariadic<
    /** the list of elements with any variadic elements removed */
    TList extends readonly unknown[],
    /** the original array which we'll use to detect variadic properties */
    TOrigin extends readonly unknown[],
    /** the element which was just removed */
    TRemoved,
    TType = VariadicType<TOrigin> extends (infer Base)[]
        ? Base
        : never
> = IsVariadicArray<TOrigin> extends true
    ? TRemoved extends TType
        ? [...TList, ...TType[]]
        : [...TList, ...TType[]] | [...TList, TRemoved, ...TType[]]
    : TList;

/**
 * **Pop**`<TList>`
 *
 * Removes the last element of a list.
 * ```ts
 * // [1,2]
 * type T = Pop<[1,2,3]>;
 * ```
 *
 * - to provide additional utility, you can also pass
 * in a string literal and get back the literal with the last
 * character removed.
 * - when popping an empty tuple/array, the type remains `[]`
 */
export type Pop<
    TList extends readonly unknown[] | string,
> = TList extends readonly unknown[]
    ? IsWideArray<TList> extends true
        ? TList
        : DropVariadic<Required<TList>> extends [...infer NewList extends readonly [unknown, ...unknown[]], infer Removed]
            ? HasOptionalElements<TList> extends true
                ? TupleMeta<TList>["optionalElementCount"] extends infer Optional extends number
                    ? IsGreaterThan<Decrement<Optional>, 0> extends true
                        ? MakeOptional<NewList, Decrement<Optional>> extends infer Next extends readonly unknown[]
                            ? AdjustVariadic<NewList | Pop<Next>, TList, Removed>
                            : never
                        : NewList | Pop<NewList>
                    : NewList | Pop<NewList>
                : AdjustVariadic<NewList, TList, Removed>
            : []

    : TList extends string
        ? IsWideType<TList> extends true
            ? string
            : IsStringLiteral<TList> extends true
                ? TList extends string
                    ? TList extends ""
                        ? ""
                        : Chars<TList> extends readonly string[]
                            ? Concat<_Pop<Chars<TList>>>
                            : never
                    : never
                : string
        : _Pop<Exclude<TList, string>>;
