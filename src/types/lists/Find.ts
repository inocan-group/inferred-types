import { IfEqual, IfExtends } from "src/types/boolean-logic";
import { Narrowable } from "src/types/literals";
import { AfterFirst, First } from "src/types/lists";

type FindAcc<
  TList extends readonly unknown[],
  TFind,
  TDeref extends string | number | null
> = [] extends TList
  ? undefined
  : TDeref extends keyof First<TList> 
    ? IfEqual<
        First<TList>[TDeref], TFind, 
        First<TList>, 
        FindAcc<AfterFirst<TList>, TFind, TDeref>
      >
    : FindAcc<AfterFirst<TList>, TFind, TDeref>;

/**
 * **Find**`<TList,TFind,TIndex>`
 * 
 * Type utility used to find the first value in `TList` which _equals_ `TValue`.
 * Will return _undefined_ if no matches found.
 * 
 * - use **FindExtends** if you want a more permissive match
 * - by default, values in `TList` will be compared directly but you can _dereference_ 
 * array and object properties with `TIndex` if you want to compare on a child property
 * 
 * ```ts
 * type List = [ { id: 1, value: "hi" }, { id: 2, value: "bye" } ]
 * // { id: 1; value: "hi" }
 * type T = Find<List, 1, "id">
 * ```
 * 
 * **Related**: `FindExtends`
 */
export type Find<
  TList extends readonly unknown[],
  TFind,
  TDeref extends string | number | null = null,
> = FindAcc<TList, TFind, TDeref>;

type FindExtendsAcc<
  TList extends readonly unknown[],
  TFind,
  TDeref extends string | number | null
> = [] extends TList
  ? undefined
  : TDeref extends keyof First<TList> 
    ? IfExtends<
        TFind, First<TList>[TDeref],
        First<TList>, 
        FindAcc<AfterFirst<TList>, TFind, TDeref>
      >
    : FindAcc<AfterFirst<TList>, TFind, TDeref>;

/**
 * **FindExtends**`<TList, TFind, TIndex>`
 * 
 * Type utility used to find the first value in `TList` which _extends_ `TValue`. 
 * Will return _undefined_ if no matches found.
 * 
 * - use **Find** if you want a stricter match
 * - by default, values in `TList` will be compared directly but you can _dereference_ 
 * array and object properties with `TIndex` if you want to compare on a child property
 * 
 * **Related:** `Find`
 */
export type FindExtends<
  TList extends readonly unknown[],
  TFind extends Narrowable,
  TDeref extends string | number | null = null,
> = FindExtendsAcc<TList, TFind, TDeref>;
