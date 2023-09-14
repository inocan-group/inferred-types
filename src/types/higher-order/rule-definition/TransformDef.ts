
import { AsArray, ComparisonOp, ErrorCondition, MatchDef, NotEqual, OpHandler, TransformOp, TransformParams, Tuple  } from "src/types";

type Identity = "transform-def";
type Op = 1;
type Params = 2;
type Handler = 3;
type Conditions = 4;

/**
 * **TransformDef**`<TOp>`
 * 
 * A tuple definition of a future transform operation.
 * 
 * - these transforms _can be_ conditional but do not need to be
 */
export type TransformDef<
  TOp extends TransformOp,
  TParams extends AsArray<TransformParams<TOp>> = AsArray<TransformParams<TOp>>,
  TCond extends readonly MatchDef<ComparisonOp>[] = []
> = [
  identity: Identity,
  op: TOp,
  params: TParams,
  handler: OpHandler,
  conditions: TCond
];

/**
 * **IsTransformDef**`<T>`
 * 
 * Boolean checker on whether the provided `T` is a `TransformDef`
 */
export type IsTransformDef<T extends Tuple> = T["length"] extends 5
  ? T[Op] extends TransformOp
    ? T[Params] extends TransformParams<T[Op]>
      ? T[Handler] extends OpHandler
        ? T[Conditions] extends Tuple
          ? true
          : false
        : false
      : false
    : false
  : false;

/**
 * **IfTransformDef**`<T>`
 * 
 * Branching utility based on whether `T` is a `TransformDef` structure
 * 
 * - if no `IF` type provided it will default to proxying `T` through
 * - if no `ELSE` type is provided it will produce a 
 * `ErrorCondition<"invalid-transform-def">`
 */
export type IfTransformDef<
  T extends Tuple,
  IF = T,
  ELSE = ErrorCondition<"invalid-transform-def">
> = IsTransformDef<T> extends true ? IF : ELSE;
