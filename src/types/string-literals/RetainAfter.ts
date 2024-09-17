import { FindFirstIndex, FindLastIndex, If, IfAllLiteral, IsTrue, IsUnion, MaxLength, Slice, UnionToTuple } from "src/types/index";

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
  TInclude extends boolean = false
> = IfAllLiteral<
[TStr, TBreak],
TStr extends `${string}${TBreak}${infer REST}`
  ? IsUnion<REST> extends true
    ? If<IsTrue<TInclude>, `${TBreak}${MaxLength<UnionToTuple<REST>>}`, `${MaxLength<UnionToTuple<REST>>}`>


    : If<IsTrue<TInclude>, `${TBreak}${REST}`, `${REST}`>
  : TStr,
string
>


export type RetainAfterLast<
  TStr extends string,
  TBreak extends string,
  TInclude extends boolean = false
> = IfAllLiteral<
  [TStr, TBreak],
  TStr extends `${string}${infer Break extends TBreak}${infer REST}`
    ? If<IsTrue<TInclude>, `${Break}${REST}`, `${REST}`>
    : TStr,
  string
>
