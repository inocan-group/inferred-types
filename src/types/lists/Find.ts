import { IfEquals } from "../boolean-logic";
import { Narrowable } from "../Narrowable";
import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

type FindAcc<
  TList extends readonly any[],
  TProp extends string,
  TValue extends Narrowable
> = [] extends TList
  ? undefined
  : TProp extends keyof First<TList> 
    ? IfEquals<
        First<TList>[TProp], TValue, 
        First<TList>, 
        FindAcc<AfterFirst<TList>, TProp, TValue>
      >
    : FindAcc<AfterFirst<TList>, TProp, TValue>;

/**
 * **Find**`<TList,TValue,TDeref>`
 * 
 * Type utility that finds the **first** element in a list which 
 * extends `TValue`. You may also optionally _de-reference_ the
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
  TValue extends Narrowable,
  TDeref extends string | number | null = null,
> = FindAcc<TList, TValue, TDeref>;
