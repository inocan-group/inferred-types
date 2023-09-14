import {   AllowNonTupleWhenSingular, RemoveNever, Tuple, ValueOrReturnValue } from "src/types";
import { TYPE_COMPARISONS } from "src/constants";
import { OpHandler } from "../../handlers";
import { ElseOperation } from "./ElseOperation";

type Comparisons = typeof TYPE_COMPARISONS;

// COLUMN LOOKUPS
type RefType = 0;
type Desc = 1;
type Params = 2;

/**
 * **MathOp**
 * 
 * A union type of comparison operations which can be done between two
 * known typed data structures.
 */
export type ComparisonOp = keyof Comparisons &  keyof typeof TYPE_COMPARISONS;




/**
 * **ComparisonParams**`<TOp, [THandler]>`
 * 
 * Looks up the parameters required for the given operation `TOp` and adjusts
 * to add the `ElseOperation` (aka, if "use-else" handler then add ELSE param)
 */
export type ComparisonParams<
  TOp extends ComparisonOp,
  THandler extends OpHandler = "throw"
> = Comparisons[TOp][Params] extends readonly unknown[]
    ? ValueOrReturnValue<Comparisons[TOp][Params]> extends readonly unknown[]
      ? RemoveNever<[...ValueOrReturnValue<Comparisons[TOp][Params]>, ElseOperation<THandler>]> extends Tuple
        ? AllowNonTupleWhenSingular<
            RemoveNever<[...ValueOrReturnValue<Comparisons[TOp][Params]>, ElseOperation<THandler>]>
          >
        : never
      : never
    : never;

/**
 * **ComparisonRefType**`<T>`
 * 
 * Provides the reference type for a given operation `<T>`.
 */
export type ComparisonRefType<T extends ComparisonOp> = ValueOrReturnValue<Comparisons[T][RefType]>;


/**
 * **DescForComparison**`<T>`
 * 
 * Gets the description for a given operation `T`.
 */
export type ComparisonDesc<T extends ComparisonOp > = Comparisons[T][Desc];

