import { IfEquals } from "../boolean-logic";
import { Narrowable } from "../Narrowable";
import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

type FindAcc<
  TList extends readonly Record<string, any>[],
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
 * **Find**`<TList,TProp,TValue>`
 * 
 * Type utility that finds an element within a known list of items.
 * ```ts
 * // { id: 1; value: "hi" }
 * type T = Find<
 *    [ { id: 1, value: "hi" }, { id: 2, value: "bye" } ],
 *    "id", 1
 * >
 * ```
 */
export type Find<
  TList extends readonly Record<string, any>[],
  TProp extends string,
  TValue extends Narrowable
> = FindAcc<TList, TProp, TValue>
