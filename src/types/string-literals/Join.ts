import {  ToString , IfEqual , RemoveEquals } from "src/types";

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

/**
 * **Join**`<TArr,TSeparator>`
 * 
 * Joins together an array of items into a string.
 * 
 * - while the _separator_ between items defaults to an empty string this can be
 * changed to whatever is needed
 * - non-string types will be converted to strings as best as possible
 * - empty string still be ignored
 * 
 * **Related:** `Concat<TArr>`
 */
export type Join<
  TArr extends readonly unknown[],
  TSeparator extends string = ""
> = JoinAcc<
  RemoveEquals<TArr, "">,
  TSeparator
>;

