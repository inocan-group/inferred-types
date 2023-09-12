import { Constant } from "src/constants";
import {  
  ErrorCondition, 
  Matcher,  
  RefTypeForComparison,  
  Tuple, 
  TypeTransformOp, 
  UnconditionalTransform, 
  TypeComparison, 
  MatchResponse 
} from "src/types";

export type SkipType<T> = Constant<"Skip", T>;

/**
 * **ConditionalTransform**`<TInput, TMatcher, TOp, TParams>`
 * 
 * Conditionally transforms an input based on a `Matcher` condition
 * and a `TypeTransformOp` (when the matcher matches).
 */
export type ConditionalTransform<
TInput,
TMatcher extends Matcher,
TOp extends TypeTransformOp,
TParams extends Tuple = []
> = TypeComparison<TInput, TMatcher> extends MatchResponse<"success">
  ? UnconditionalTransform<TOp, TInput, TParams>
  : TypeComparison<TInput, TMatcher> extends MatchResponse<"skip">
    ? SkipType<TInput>
    : TypeComparison<TInput, TMatcher> extends MatchResponse<"narrow">
      ? Exclude<TInput, RefTypeForComparison<TMatcher>>
      : never;
