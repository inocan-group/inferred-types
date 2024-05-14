import { 
  Compare, 
  ComparatorOperation, 
  TupleToUnion,
  Or,
  IsEqual,
  RemoveNever,
} from "src/types/index";

/**
 * Iterates over each element of the Tuple
 */
type SingleFilter<
  TList extends readonly unknown[],
  TFilter,
  TOp extends ComparatorOperation,
  Result extends unknown[] = []
> = TList extends [infer Head, ...infer Rest]
  ? [Compare<Head,TOp, TFilter>] extends [true]
    ? SingleFilter<Rest, TFilter, TOp, [...Result, Head]>
    : SingleFilter<Rest, TFilter, TOp, Result> // filter out
  : Result;


type Process<
  TList extends readonly unknown[],
  TComparator,
  TOp extends ComparatorOperation 
> = TList extends unknown[]
? SingleFilter<TList, TComparator, TOp>
: // readonly only tuples 
  TList extends readonly unknown[]
    ? Readonly<
        SingleFilter<[...TList], TComparator, TOp>
      >
    : never;

type PrepList<
  T extends readonly unknown[],
  O extends ComparatorOperation
> = Or<[
    IsEqual<O, "contains">,
    IsEqual<O, "startsWith">,
    IsEqual<O, "endsWith">,
  ]> extends true
  ? RemoveNever<{
    [K in keyof T]: T[K] extends string | number
      ? T[K]
      : never
  }>
  : T;

/**
 * **Retain**`<TList, TFilter>`
 * 
 * Allows a known tuple `TList` to be reduced to just those elements which 
 * _extend_ type `TFilter`.
 * 
 * - `TFilter` can be single value or a array of values
 * - when the filter is an array then they are combined in a logical OR operation
 * 
 * **Related:** `Filter`
 */
export type Retain<
  TList extends readonly unknown[],
  TComparator,
  TOp extends ComparatorOperation = "extends"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = PrepList<TList, TOp> extends readonly unknown[]
? [TComparator] extends [unknown[]]
  ? Process<
      PrepList<TList, TOp>,
      TupleToUnion<TComparator>,
      TOp
    >
  : Process<
      PrepList<TList, TOp>,
      TComparator,
      TOp
    >
: never;
