import {  
  AsArray, 
  MatchOp, 
  MatchParams, 
  Concat, 
  ErrorCondition,
  IfAllLiteral,
  IfEqualLength,  
  IfExtends,  
  IsEqual,  
  OpHandler, 
  Tuple 
} from "src/types";

type WrongLength<
  TOp extends MatchOp,
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
    utility: "ToMatchDef";
}
>;

type WrongTypes<
  TOp extends MatchOp,
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
    utility: "ToMatchDef";
    context: {
      required: TRequirements;
      received: TGot;
    };
  }
  
>;

type NotLiteral<
  TOp extends MatchOp,
  TGot extends Tuple
> = ErrorCondition<
  "non-literal-params",
  `Parameters passed into the '${TOp}' operation are expected to be literal types`
  ,
  {
    library: "inferred-types";
    utility: "ToMatchDef";
    context: {
      operation: TOp;
      received: TGot;
    };
  }
>;

type IfReqIsArray<
  TOp extends MatchOp,
  TParams extends MatchParams<TOp> | []
> = IsEqual<MatchParams<TOp>, (readonly unknown[] | [readonly unknown[]])> extends true
? TParams extends readonly unknown[]
    ? [readonly [...TParams]]
    : TParams
: AsArray<TParams>;

/**
 * **ToMatchDef**`<TOp,[TParam],[THandler]>`
 * 
 * A helper utility which helps form a `MatchDef` tuple.
 * 
 * - **TOp** - the matching operation
 * - **TParams** - the parameters the operation requires; can be left off if there are none
 * - **THandler** - the error handler regime that should be used; by default uses `throw`
 */
export type ToMatchDef<
  TOp extends MatchOp, 
  TParams extends MatchParams<TOp> | [] = [],
  H extends OpHandler = "throw"
> = IfEqualLength<
  AsArray<MatchParams<TOp>>, AsArray<IfReqIsArray<TOp,TParams>>,
  // right number of params
  IfExtends<
    IfReqIsArray<TOp,TParams>, AsArray<MatchParams<TOp>>,
    // does extend
    IfAllLiteral<
      AsArray<IfReqIsArray<TOp,TParams>>,
      // success
      [
        identity: "match-def",
        op: TOp,
        params: AsArray<IfReqIsArray<TOp,TParams>>,
        handler: H
      ],
      NotLiteral<
        TOp,
        AsArray<IfReqIsArray<TOp,TParams>>
      >
    >,
    // does not extend
    WrongTypes<
      TOp,
      AsArray<MatchParams<TOp>>, AsArray<IfReqIsArray<TOp,TParams>>
    >
  >,
  // wrong length
  WrongLength<
    TOp,
    AsArray<MatchParams<TOp>>, AsArray<IfReqIsArray<TOp,TParams>>
  >
>;
