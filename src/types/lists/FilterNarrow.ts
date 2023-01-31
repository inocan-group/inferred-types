import { 
  IsEqual, 
  IsNever, 
  IsNotEqual
} from "../../types";
import { Narrowable } from "../literals/Narrowable";
import { AfterFirst } from "./AfterFirst";
import { RemoveEquals, RemoveNever } from "./extractors";
import { First } from "./First";

/**
 * Iterates over each element of the Tuple
 */
type NarrowSingleFilter<
  TList extends readonly any[],
  TFilter,
  TOp extends "equals" | "not-equal" = "equals",
  Result extends readonly any[] = readonly []
> = TList extends [infer First, ...infer Rest]
  ? TOp extends "equals" 
    ? IsEqual<First, TFilter> extends true
      ? NarrowSingleFilter<Rest, TFilter, TOp, [...Result, First]>
      : NarrowSingleFilter<Rest, TFilter, TOp, Result> // filter out
    : IsNotEqual<First, TFilter> extends true
      ? NarrowSingleFilter<Rest, TFilter, TOp, [...Result, First]>
      : NarrowSingleFilter<Rest, TFilter, TOp, Result> // filter out
  : Result;

type NarrowMultiFilter<
  TList extends readonly any[],
  TExtract extends readonly any[],
  TOp extends "equals" | "not-equal" = "equals"
> = [] extends TExtract
  ? TList
  : NarrowMultiFilter<
      RemoveEquals<
        TList, 
        First<TExtract>
      >, 
      AfterFirst<TExtract>, TOp
    >;

/**
 * **FilterNarrow**`<TList, TFilter, [TOp]>`
 *
 * Allows a known tuple `TList` to be _filtered down_ by eliminating all items
 * in the Tuple that **equal** type `TFilter`.
 * ```ts
 * type List = [1,"foo",3];
 * // [1,3]
 * type T1 = FilterNarrow<T, "foo">;
 * // [3]
 * type T2 = FilterNarrow<T, ["foo", 1]>;
 * ```
 * - `TFilter` can be single value or a list of values
 * - when a list is provided as `TFilter` a logic OR is used to filter
 * 
 * **Related:** `Filter`
 */
export type FilterNarrow<
  TList extends any[] | readonly any[],
  TFilter extends Narrowable | readonly any[],
  TOp extends "equals" | "not-equal" = "equals"
> = IsNever<TFilter> extends true 
  ? RemoveNever<TList> 
  // array output
  : TList extends any[]
    ? TFilter extends readonly any[]
        // filters are an array
        ? NarrowMultiFilter<TList, TFilter, TOp>
        // single filter
        : NarrowSingleFilter<TList, TFilter, TOp>
    // readonly output
    : TList extends readonly any[]
      ? Readonly<
          TFilter extends readonly any[]
            ? Readonly<NarrowMultiFilter<TList, TFilter, TOp>>
            : NarrowSingleFilter<[...TList], TFilter, TOp>
        >
      : never;
