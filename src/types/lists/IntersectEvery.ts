import { ExpandRecursively } from "../ExpandRecursively";
import { Narrowable } from "../Narrowable";
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
 * **IntersectEvery**`<TList, TIntersect>`
 * 
 * Type utility which adds an _intersection_ with each element in `TList` 
 * with `TIntersect`.
 */
export type IntersectEvery<
  TList extends readonly any[],
  TIntersect extends Narrowable
> = TList extends readonly any[]
? Readonly<Intersect<TList, TIntersect>>
: [...Intersect<TList, TIntersect>];
