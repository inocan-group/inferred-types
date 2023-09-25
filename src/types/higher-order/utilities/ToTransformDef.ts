import {  
  AsArray, 
  Concat, 
  ErrorCondition,
  IfAllLiteral,
  IfEqualLength,  
  IfExtends,  
  MatchDef,  
  OpHandler, 
  TransformOp, 
  TransformParams, 
  Tuple 
} from "src/types";

type WrongLength<
  TOp extends TransformOp,
  TRequirements extends Tuple,
  TGot extends Tuple
> = ErrorCondition<
  "wrong-number-of-parameters",
  Concat<[
    "The '",
    TOp,
    "' operation requires ",
    `${TRequirements["length"]}`,
    " parameters but got ",
    `${TGot["length"]}!`
  ]>,
  "ToMatchDef"
>;

type WrongTypes<
  TOp extends TransformOp,
  TRequirements extends Tuple,
  TGot extends Tuple
> = ErrorCondition<
  "wrong-parameter-type",
  Concat<[
    "The parameters provided to the '",
    TOp,
    "' operation were incorrect!",
  ]>,
  "ToMatchDef",
  {
      required: TRequirements;
      received: TGot;
  }
>;

type NotLiteral<
  TOp extends TransformOp,
  TGot extends Tuple
> = ErrorCondition<
  "non-literal-params",
  Concat<[
    "Parameters passed into the '",
    TOp,
    "' operation are expected to be literal types ",
  ]>,
  "ToMatchDef",
  {
    operation: TOp;
    received: TGot;
  }
>;

/**
 * **ToTransformDef**`<TOp,[TParam],[THandler]>`
 * 
 * Helper to create a `TransformDef` tuple:
 * 
 * - **Op:** you must always provide _transform_ operation
 * - **Params:** if the transform has any parameters then these must be given
 * - **Handler:** you can choose a `OpHandler` explicitly or the "throw" handler will be
 * chosen as a default; the scope of this handler is just for the transform function and
 * not any conditional evaluation you have set.
 * - **Conditions:** optionally add one or more conditions. 
 *    If conditions are included they must all evaluate to `true` for this transform 
 * to be executed. 
 *    - matches which result in a `ShouldIgnore` will be ignored; if all conditions are 
 * _ignored_ however it will still fail
 *    - in the case of any match failure above, this operations handler will be given
 * the error `ErrorCondition<"conditions-failed">`
 * 
 */
export type ToTransformDef<
  TOp extends TransformOp, 
  TParams extends TransformParams<TOp> | [] = [],
  THandler extends OpHandler = "throw",
  TCond extends readonly MatchDef[]
> = IfEqualLength<
  AsArray<TransformParams<TOp>>, AsArray<TParams>,
  // right number of params
  IfExtends<
    AsArray<TParams>, AsArray<TransformParams<TOp>>,
    // does extend
    IfAllLiteral<
      AsArray<TParams>,
      // success
      [
        identity: "match-def",
        op: TOp,
        params: AsArray<TParams>,
        handler: THandler
      ],
      NotLiteral<
        TOp,
        AsArray<TParams>
      >
    >,
    // does not extend
    WrongTypes<
      TOp,
      AsArray<TransformParams<TOp>>, AsArray<TParams>
    >
  >,
  // wrong length
  WrongLength<
    TOp,
    AsArray<TransformParams<TOp>>, AsArray<TParams>
  >
>;
