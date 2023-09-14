import {  
  AsArray, 
  Concat, 
  ErrorCondition,
  IfAllLiteral,
  IfEqualLength,  
  IfExtends,  
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
 * A tuple definition of a future matching operation.
 */
export type ToTransformDef<
  TOp extends TransformOp, 
  TParams extends TransformParams<TOp> | [] = [],
  H extends OpHandler = "throw"
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
        handler: H
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
