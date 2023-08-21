import type {   
  TypeComparisonOp,
  ParamsForComparison,
  Narrowable,
  AsMatcher,
} from "src/types";

/**
 * **createTypeMatcher**
 * 
 * Run time utility which creates a `Matcher` type that can be utilized on
 * type comparisons and transforms.
 */
export function createTypeMatcher<
  TOp extends TypeComparisonOp,
  TParams extends readonly Narrowable[]
>(
  op: TOp,
  ...params: TParams & ParamsForComparison<TOp>
) {
  return {
    skipFailures: () => [ op, params, "skip", "" ] as unknown as AsMatcher<TOp,TParams,"skip">,
    excludeFailures: () => [op, params, "exclude", ""] as unknown as AsMatcher<TOp,TParams, "exclude">,
    throwErrors:() =>  [op, params, "throw", ""] as unknown as AsMatcher<TOp,TParams,"throw">
  };
}

