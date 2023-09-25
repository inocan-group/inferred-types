import { MatchOp, OpHandler, RuleHandler, TransformOp, Tuple } from "src/types";

/**
 * **HO_ErrorHandler**`<TOp, TParams, TInput, TOutput, THandler>`
 * 
 * An error handler for higher-order types in this library. Both rules defined
 * with a `OpHandler` or a `RuleHandler` should be passed into this handler as
 * a final step when they are _applied_ / _evaluated_.
 */
export type HO_ErrorHandler<
  TAction extends "match" | "transform",
  TOp extends TAction extends "match" ? MatchOp : TransformOp,
  TParams extends Tuple,
  TInput,
  TOutput,
  THandler extends OpHandler | RuleHandler
> = TOutput;
