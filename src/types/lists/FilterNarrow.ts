import { 
  IsEqual, 
  IsNever 
} from "../../types";
import { Narrowable } from "../literals/Narrowable";
import { AfterFirst } from "./AfterFirst";
import { RemoveEquals, RemoveNever } from "./extractors";
import { First } from "./First";

/**
 * Iterates over each element of the Tuple
 */
type FilterNarrowAcc<
  TList extends readonly any[],
  TFilter,
  Result extends readonly any[] = readonly []
> = TList extends [infer First, ...infer Rest]
  ? IsEqual<First, TFilter> extends true
      ? FilterNarrowAcc<Rest, TFilter, Result> // filter out
      : FilterNarrowAcc<Rest, TFilter, [...Result, First]>
  : Result;

type Extraction<
  TList extends readonly any[],
  TExtract extends readonly any[],
> = [] extends TExtract
  ? TList
  : Extraction<RemoveEquals<TList, First<TExtract>>, AfterFirst<TExtract>>;


/**
 * **FilterNarrow**`<TList, TFilter>`
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
  TFilter extends Narrowable | readonly any[]
> = IsNever<TFilter> extends true 
  ? RemoveNever<TList> 
  // array output
  : TList extends any[]
    ? TFilter extends readonly any[]
        // filters are an array
        ? Extraction<TList, TFilter>
        // single filter
        : FilterNarrowAcc<TList, TFilter>
    // readonly output
    : TList extends readonly any[]
      ? Readonly<
          TFilter extends readonly any[]
            ? Readonly<Extraction<TList, TFilter>>
            : FilterNarrowAcc<[...TList], TFilter>
        >
      : never;
