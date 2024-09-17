import { FindFirstIndex, FindLastIndex, IfAllLiteral, IsUnion, MaxLength, Slice, UnionToTuple } from "src/types/index";

/**
 * **RetainAfter**`<TStr, TBreak>`
 *
 * Receives a string `TStr` and _retains_ characters after
 * the first occurrence of `TBreak` is found.
 *
 * ### Example
 * ```ts
 * // "blue green"
 * type T = RetainAfter<"red blue green", " ">;
 * ```
 */
export type RetainAfter<
  TStr extends string,
  TBreak extends string
> = IfAllLiteral<
[TStr, TBreak],
TStr extends `${string}${TBreak}${infer REST}`
  ? IsUnion<REST> extends true
    ? MaxLength<UnionToTuple<REST>>
    : `${REST}`
  : TStr,
string
>


export type RetainAfterLast<
  TStr extends string,
  TBreak extends string
> = IfAllLiteral<
  [TStr, TBreak],
  TStr extends `${string}${TBreak}${infer REST}`
    ? `${REST}`
    : TStr,
  string
>
