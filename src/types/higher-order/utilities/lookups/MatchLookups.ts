import { 
  AllowNonTupleWhenSingular, 
  RemoveNever, 
  Tuple, 
  ValueOrReturnValue 
, OpHandler, ElseOperation } from "src/types";
import { TYPE_COMPARISONS } from "src/constants";

type Lookup = typeof TYPE_COMPARISONS;

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
export type MatchOp = keyof Lookup &  keyof typeof TYPE_COMPARISONS;

/**
 * **MatchParams**`<TOp, [THandler]>`
 * 
 * Looks up the parameters required for the given operation `TOp` and adjusts
 * to add the `ElseOperation` (aka, if "use-else" handler then add ELSE param)
 */
export type MatchParams<
  TOp extends MatchOp,
  THandler extends OpHandler = "throw"
> = Lookup[TOp][Params] extends readonly unknown[]
    ? ValueOrReturnValue<Lookup[TOp][Params]> extends readonly unknown[]
      ? RemoveNever<[...ValueOrReturnValue<Lookup[TOp][Params]>, ElseOperation<THandler>]> extends Tuple
        ? AllowNonTupleWhenSingular<
            RemoveNever<[...ValueOrReturnValue<Lookup[TOp][Params]>, ElseOperation<THandler>]>
          >
        : never
      : never
    : never;

/**
 * **MatchRefType**`<T>`
 * 
 * Provides the reference type for a given operation `<T>`.
 */
export type MatchRefType<T extends MatchOp> = ValueOrReturnValue<Lookup[T][RefType]>;


/**
 * **DescForComparison**`<T>`
 * 
 * Gets the description for a given operation `T`.
 */
export type MatchDesc<T extends MatchOp > = Lookup[T][Desc];

