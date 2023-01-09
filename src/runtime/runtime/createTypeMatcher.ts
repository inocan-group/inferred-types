import { Matcher, MatcherLogic, MatcherTransform, MatcherType } from "src/types/type-conversion/MapType";

export function createTypeMatcher<
  TLogic extends MatcherLogic,
  TType extends MatcherType,
  TTransform extends MatcherTransform | undefined = undefined
>(
  logic: TLogic, 
  type: TType, 
  transformer?: TTransform
): Matcher<TLogic, TType, TTransform> {
  return (
    transformer 
    ? [logic, type, transformer]
    : [logic, type, undefined]
  ) as Matcher<TLogic, TType, TTransform>;
}
