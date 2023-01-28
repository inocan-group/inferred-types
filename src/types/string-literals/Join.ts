import { Narrowable } from "types/literals/Narrowable";
import { ToString } from "types/type-conversion";
import { IfEqual } from "types/boolean-logic";
import { RemoveEquals } from "types/lists";

type JoinAcc<
  TArr extends readonly Narrowable[],
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
  TArr extends readonly Narrowable[],
  TSeparator extends string = ""
> = JoinAcc<
  RemoveEquals<TArr, "">,
  TSeparator
>;
