import type {
  Dictionary,
  EmptyObject,
  ObjectKey,
  ComparatorOperation,
  Compare,
  AfterFirst,
  First,
  ExpandDictionary,
  StringKeys
} from "inferred-types/types";


type Process<
  TObj extends Dictionary,
  TComparator,
  TOp extends ComparatorOperation,
  TKeys extends readonly ObjectKey[],
  TResult extends Dictionary = EmptyObject,
> = [] extends TKeys
  ? ExpandDictionary<TResult>
  : Process<
    TObj,
    TComparator,
    TOp,
    AfterFirst<TKeys>,
    Compare<TObj[First<TKeys>], TOp, TComparator> extends true
    ? TResult & Record<First<TKeys>, TObj[First<TKeys>]>
    : TResult
  >;

/**
 * **RetainProps**`<TObj, TComparator, [TOp]>`
 *
 * Type utility which targets dictionary objects and _retains_
 * the key/value pairs which _extend_ the type `TComparator`.
 *
 * - by default the comparison operation -- dictated by `TOp` -- is
 * "extends" but you can change the comparison operation to
 * `equals`, `startsWith`, `endsWith`, ...
 */
export type RetainProps<
  TObj extends Dictionary,
  TComparator,
  TOp extends ComparatorOperation = "extends",
> = Process<
  TObj,
  TComparator,
  TOp,
  StringKeys<TObj>
>;
