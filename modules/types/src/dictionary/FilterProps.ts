import type { Dictionary, EmptyObject, ObjectKey } from "../base-types";
import type { ComparatorOperation, Compare } from "../boolean-logic";
import type { AfterFirst } from "../lists/AfterFirst";
import type { First } from "../lists/First";
import type { ExpandDictionary } from "../literals";
import type { Keys } from "./Keys";

type Process<
  TObj extends Dictionary,
  TComparator,
  TOp extends ComparatorOperation,
  TKeys extends readonly ObjectKey[],
  TResult extends Dictionary = EmptyObject,
> = [] extends TKeys
  ? ExpandDictionary< TResult >
  : Process<
    TObj,
    TComparator,
    TOp,
    AfterFirst<TKeys>,
    Compare<TObj[First<TKeys>], TOp, TComparator> extends true
      ? TResult
      : TResult & Record<First<TKeys>, TObj[First<TKeys>]>
  >;

/**
 * **FilterProps**`<TObj, TComparator, [TOp]>`
 *
 * Type utility which targets dictionary objects and filters
 * out all key/value pairs which _extend_ the type `TComparator`.
 *
 * - by default the comparison operation -- dictated by `TOp` -- is
 * "extends" but you can change the comparison operation to
 * `equals`, `startsWith`, `endsWith`, ...
 */
export type FilterProps<
  TObj extends Dictionary,
  TComparator,
  TOp extends ComparatorOperation = "extends",
> = Process<
  TObj,
  TComparator,
  TOp,
  Keys<TObj>
>;
