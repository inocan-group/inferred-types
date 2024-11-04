import {
  ComparatorOperation,
  Compare,
  IfNever,
  RemoveNever,
  IsDotPath,
  Throw,
  Get,
} from "src/types/index";


/**
 * Iterates over each element of the Tuple
 */
type SingleFilter<
  TList extends readonly unknown[],
  TComparator,
  TProp extends string,
  TOp extends ComparatorOperation,
  Result extends unknown[] = []
> = TList extends [infer Head, ...infer Rest]
  ? [
      Compare<
        Get<Head, TProp>,
        TOp,
        TComparator
      >
    ] extends [true]
    ? SingleFilter<Rest, TComparator, TProp, TOp, Result> // filter out
    : SingleFilter<Rest, TComparator, TProp, TOp, [...Result, Head]>
  : Result;



type Process<
  TList extends readonly unknown[],
  TComparator,
  TProp extends string,
  TOp extends ComparatorOperation
> =  TList extends unknown[]
? SingleFilter<TList, TComparator, TProp, TOp>
: // readonly only tuples
  TList extends readonly unknown[]
    ? Readonly<
        SingleFilter<[...TList], TComparator, TProp, TOp>
      >
    : never;

/**
 * **FilterByProp**`<TList, TComparator, TProp, [TOp]>`
 *
 * Allows a known tuple `TList` to be reduced to a subset with the value `TComparator`
 * being compared to each element in TList[TProp]; if comparison resolves to a `true`
 * value then the element `TList[TProp]` is removed but otherwise retained.
 *
 * - How the list is _compared_ depends on `TOp` which defaults to "extends"
 * - other values include "equals", "does-not-extend", "does-not-equal"
 *
 * **Related:** `RetainByProp`, `Filter`, `RetainFromList`, `RemoveFromList`, `FilterProps`
 */
export type FilterByProp<
  TList extends readonly unknown[],
  TComparator,
  TProp extends string,
  TOp extends ComparatorOperation = "extends"
> = IsDotPath<TProp> extends false
? Throw<"invalid-dot-path", `the property value TProp must be a valid dotpath but "${TProp}" is not valid!`>

: TList extends readonly unknown[]
? IfNever<
    TComparator,
    RemoveNever<TList>,
    TComparator extends any[]
      ? Process<
          TList,
          TComparator[number],
          TProp,
          TOp
        >
      : Process<
          TList,
          TComparator,
          TProp,
          TOp
        >
    >
: never;
