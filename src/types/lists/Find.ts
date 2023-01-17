import { IfEquals } from "../boolean-logic";
import { Narrowable } from "../Narrowable";
import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

type FindAcc<
  TList extends readonly any[],
  TFind extends Narrowable,
  TDeref extends string | number | null
> = [] extends TList
  ? undefined
  : TDeref extends keyof First<TList> 
    ? IfEquals<
        First<TList>[TDeref], TFind, 
        First<TList>, 
        FindAcc<AfterFirst<TList>, TFind, TDeref>
      >
    : FindAcc<AfterFirst<TList>, TFind, TDeref>;

/**
 * **Find**`<TList,TFind,TDeref>`
 * 
 * Type utility that finds the **first** element in a list which 
 * extends `TFind`. You may also optionally _de-reference_ the
 * list's properties by an indexable value.
 * 
 * ```ts
 * type List = [ { id: 1, value: "hi" }, { id: 2, value: "bye" } ]
 * // { id: 1; value: "hi" }
 * type T = Find<List, 1, "id">
 * ```
 * 
 * **Note:** if a `TDeref` is set then any values in `TList` which can't
 * be indexed by this value will be ignored.
 */
export type Find<
  TList extends readonly any[],
  TFind extends Narrowable,
  TDeref extends string | number | null = null,
> = FindAcc<TList, TFind, TDeref>;
