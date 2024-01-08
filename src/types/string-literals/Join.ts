import {  ToString , IfEqual , RemoveEquals, RemoveNever,  Truncate, IfNever, IsGreaterThan, AsNumber } from "..";

type JoinAcc<
  TArr extends readonly unknown[],
  TSeparator extends string,
  TResult extends string = ""
> = TArr extends [infer First, ...infer Rest]
  ? First extends string
      ? JoinAcc<Rest, TSeparator, IfEqual<
        TResult, "", 
        `${TResult}${First}`,
        `${TResult}${TSeparator}${First}`
      >>
      : JoinAcc<Rest, TSeparator, IfEqual<
          TResult, "", 
          `${TResult}${ToString<First>}`,
          `${TResult}${TSeparator}${ToString<First>}`
      >>
  : TResult;

type Trunc<
  TArr extends readonly unknown[],
  TMax extends number,
  TEllipsis extends string | false
> = IsGreaterThan<TArr["length"], TMax> extends true
? Truncate<RemoveNever<TArr>, TMax, TEllipsis>
: RemoveNever<TArr>;

/**
 * **Join**`<TArr,[TSeparator],[TMax]>`
 * 
 * Joins together an array of items into a string.
 * 
 * - the _separator_ between items defaults to an empty string this can be
 * changed to whatever is needed
 * - non-string types will be converted to strings as best as possible
 * - specifying a value for `TMax` will truncate tuples which are greater
 * than the specified length and add an ellipsis marker as the last element
 * 
 * **Related:** `Concat<TArr>`
 */
export type Join<
  TTuple extends readonly unknown[],
  TSeparator extends string = "",
  TMax extends number | never = never,
  TEllipsis extends string | false = "..."
> = IfNever<
  TMax,
  JoinAcc<
    RemoveNever<RemoveEquals<[...TTuple], "">>,
    TSeparator
  >,
  JoinAcc<
    Trunc<TTuple, AsNumber<TMax>, TEllipsis> extends readonly unknown[]
      ? Trunc<TTuple, AsNumber<TMax>, TEllipsis>
      : never,
    TSeparator
  >
>;

