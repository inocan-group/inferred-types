import type {
    If,
    IfAllLiteral,
    IsNever,
    IsTrue,
    IsUnion,
    MaxLength,
    UnionToTuple,
} from "inferred-types/types";

type _RetainAfter<
    TStr extends string,
    TBreak extends string,
    TInclude extends boolean = false,
> = IfAllLiteral<
    [TStr, TBreak],
    TBreak extends any
        ? TStr extends `${string}${TBreak}${infer Rest}`
            ? If<
                IsTrue<TInclude>,
      `${TBreak}${Rest}`,
      Rest
            >
            : never
        : never,
    string
>;

/**
 * **RetainAfter**`<TStr, TBreak, [TInclude]>`
 *
 * Receives a string `TStr` and _retains_ characters after
 * the first occurrence of `TBreak` is found.
 *
 * By default the first `TBreak` found will _not_ be included
 * in the returned string but you can set `TInclude` to true
 * to reverse this behavior.
 *
 * ### Example
 * ```ts
 * // "blue green"
 * type T = RetainAfter<"red blue green", " ">;
 * // " blue green"
 * type T2 = RetainAfter<"red blue green", " ", true>;
 * ```
 */
export type RetainAfter<
    TStr extends string,
    TBreak extends string,
    TInclude extends boolean = false,
> = IsNever<_RetainAfter<TStr, TBreak, TInclude>> extends true
    ? ""
    : IsUnion<_RetainAfter<TStr, TBreak, TInclude>> extends true
        ? MaxLength<UnionToTuple<_RetainAfter<TStr, TBreak, TInclude>>>
        : _RetainAfter<TStr, TBreak, TInclude>;

export type RetainAfterLast<
    TStr extends string,
    TBreak extends string,
    TInclude extends boolean = false,
> = IfAllLiteral<
    [TStr, TBreak],
    TStr extends `${string}${infer Break extends TBreak}${infer REST}`
        ? If<IsTrue<TInclude>, `${Break}${REST}`, `${REST}`>
        : TStr,
    string
>;
