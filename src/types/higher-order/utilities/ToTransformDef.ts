import {  
  AsArray, 
  Concat, 
  ErrorCondition,
  IfAllLiteral,
  IfEqualLength,  
  IfExtends,  
  MatchDef,  
  MatchOp,  
  OpHandler, 
  Surround, 
  ToCSV, 
  TransformDefIdentity, 
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
  {
    library: "inferred-types";
    utility: "ToTransformDef";
  }
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
  {
    library: "inferred-types";
    utility: "ToTransformDef";
    context: {
      required: TRequirements;
      received: TGot;
    };
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
  {
    library: "inferred-types";
    utility: "ToTransformDef";
    context: {
      operation: TOp;
      received: TGot;
    };
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
  TParams extends readonly unknown[] = [],
  THandler extends OpHandler = "throw",
  TCond extends MatchDef<MatchOp> | readonly MatchDef<MatchOp>[] = []
> = 
TParams extends TransformParams<TOp,THandler>
? IfEqualLength<
    AsArray<TransformParams<TOp, THandler>>, AsArray<TParams>,
    // right number of params
    IfExtends<
      AsArray<TParams>, AsArray<TransformParams<TOp, THandler>>,
      // does extend
      IfAllLiteral<
        AsArray<TParams>,
        // success
        [
          identity: TransformDefIdentity,
          op: TOp,
          params: AsArray<TParams>,
          handler: THandler,
          conditions: TCond extends MatchDef<MatchOp> ? [TCond] : TCond
        ],
        NotLiteral<
          TOp,
          AsArray<TParams>
        >
      >,
      // does not extend
      WrongTypes<
        TOp,
        AsArray<TransformParams<TOp, THandler>>, AsArray<TParams>
      >
    >,
    // wrong length
    WrongLength<
      TOp,
      AsArray<TransformParams<TOp, THandler>>, AsArray<TParams>
    >
  >
: ErrorCondition<
    "invalid-params",
    `The parameters passed into ToTransformDef were invalid for the '${TOp}' operation!`,
    {
      library: "inferred-types";
      utility: "ToTransformDef";
      params: TParams;
      paramsLength: TParams["length"];
      expected: TransformParams<TOp, THandler>;
    }
  >;
