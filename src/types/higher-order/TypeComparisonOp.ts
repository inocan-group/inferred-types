import {  Matcher, ValueOrReturnValue } from "src/types";
import { TYPE_COMPARISONS_DICT } from "src/constants";

type ComparisonsLookup = typeof TYPE_COMPARISONS_DICT;

/**
 * **TypeComparison**
 * 
 * A union type of comparison operations which can be done between two
 * known typed data structures.
 */
export type TypeComparisonOp = keyof ComparisonsLookup;

/**
 * **RefTypeForComparison**`<T>`
 * 
 * Takes a `TypeComparisonOp` or `Matcher` as `T` and looks up the reference type for it.
 */
export type RefTypeForComparison<T extends TypeComparisonOp | Matcher> = 
T extends Matcher
? RefTypeForComparison<T[0]>
: T extends TypeComparisonOp
  ? T extends keyof ComparisonsLookup
    ? ComparisonsLookup[T] extends unknown[] 
      ? ValueOrReturnValue<ComparisonsLookup[T][0]>
      : never
    : never
  : never;

/**
 * **DescForComparison**`<T>`
 * 
 * Takes a `TypeComparisonOp` as `T` and looks up the description for it.
 */
export type DescForComparison<T extends TypeComparisonOp | Matcher> = 
T extends Matcher
? T[3]
: T extends keyof ComparisonsLookup
  ? ComparisonsLookup[T] extends [unknown,unknown,...unknown[]]
    ? ValueOrReturnValue<ComparisonsLookup[T][1]>
    : never
  : never;

/**
 * **ParamsForComparison**`<T>`
 * 
 * Takes a `TypeComparisonOp` or `Matcher` as `T` and looks up the base parameter requirements for it.
 */
export type ParamsForComparison<T extends TypeComparisonOp | Matcher> = 
T extends Matcher
? ParamsForComparison<T[0]>
: T extends keyof ComparisonsLookup
  ? ComparisonsLookup[T] extends unknown[]
    ? ValueOrReturnValue<ComparisonsLookup[T][2]>
    : never
  : never;

