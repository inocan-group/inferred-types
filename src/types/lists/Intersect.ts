import { Tuple } from "../base-types";
import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

type Process<
  TTup extends Tuple,
  TResult = First<TTup>
> = [] extends TTup
? TResult
: Process<AfterFirst<TTup>, TResult & First<TTup>>

/**
 * **Intersect**`<TList>`
 *
 * Intersects all items in the list.
 *
 * **Related:** `Intersection`, `IntersectAll`
 */
export type Intersect<TList extends Tuple> = Process<TList>;
