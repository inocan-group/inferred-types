import { ExpandRecursively } from "../literals/ExpandRecursively";
import { Narrowable } from "../literals/Narrowable";
import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

type Intersect<
  TList extends readonly any[],
  TIntersect extends Narrowable,
  TResults extends any[] = []
> = [] extends TList
  ? TResults
  : Intersect<
      AfterFirst<TList>,
      TIntersect,
      [...TResults, ExpandRecursively<First<TList> & TIntersect> ]
    >;

/**
 * **IntersectAll**`<TList, TIntersect>`
 * 
 * Type utility which adds an _intersection_ with each element in `TList` 
 * with `TIntersect`.
 */
export type IntersectAll<
  TList extends readonly any[],
  TIntersect extends Narrowable
> = TList extends readonly any[]
? Readonly<Intersect<TList, TIntersect>>
: [...Intersect<TList, TIntersect>];
