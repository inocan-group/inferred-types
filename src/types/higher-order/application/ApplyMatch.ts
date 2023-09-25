import { MatchDef , MatchOp, IsEqual, NotEqual, DoesExtend, IsTruthy, DoesNotExtend, IsFalsy, Something, Nothing, IfExtends, GreaterThan, AsNumber, LessThan, StartsWith, AsString, EndsWith, Includes, AnyFunction, AsFunction, First, Contains, AsArray, Tuple, ErrorCondition, DescribeType, Concat, Last, ShouldFlatten, ShouldIgnore, IsString, IsNumber, IsBoolean, MatchRefType } from "src/types";

type Identity = 0;
type Op = 1;
type Params = 2;
type Handler = 3;

type InvalidTypeForOp<
TExpects,
TType,
TMatch extends MatchDef<MatchOp>
> = ErrorCondition<
  "invalid-type-for-operation",
  Concat<[
    "The operation '",
    TMatch[Op],
    "' expects a type of '",
    DescribeType<TExpects>,
    "' but got '",
    DescribeType<TType>,
    "' instead."
  ]>,
  "TypeComparison",
  { type: TType; expected: TExpects; operation: TMatch[Op] }
>;

type IfOp<
  TMatch extends MatchDef<MatchOp>,
  TOp extends MatchOp,
> = TMatch[Op] extends TOp ? true : false;

/**
 * Check whether the input `TVal` extends the reference type
 * of the `MatchDef` and return error if not.
 */
type Attempt<
  TVal,
  TMatch extends MatchDef<MatchOp>,
  TType
> = TVal extends MatchRefType<TMatch[Op]>
? TType
: InvalidTypeForOp<
    MatchRefType<TMatch[Op]>, 
    TVal, 
    TMatch
  >;


type Process<
  TVal, 
  TMatch extends MatchDef<MatchOp>
> = TMatch[Identity] extends "match-def"
  ? TMatch[Op] extends "Equals" ? IsEqual<TVal, TMatch[Params]>
  : TMatch[Op] extends "NotEqual" ? NotEqual<TVal, TMatch[Params]>
  : TMatch[Op] extends "Extends" ? DoesExtend<TVal, TMatch[Params]>
  : TMatch[Op] extends "DoesNotExtend" ? DoesNotExtend<TVal, TMatch[Params]>
  : TMatch[Op] extends "Truthy" ? IsTruthy<TVal>
  : TMatch[Op] extends "Falsy" ? IsFalsy<TVal>
  : TMatch[Op] extends "IsSomething" ? DoesExtend<TVal, Something>
  : TMatch[Op] extends "IsString" ? IsString<TVal>
  : TMatch[Op] extends "IsNumber" ? IsNumber<TVal>
  : TMatch[Op] extends "IsBoolean" ? IsBoolean<TVal>
  : TMatch[Op] extends "IsNothing" ? DoesExtend<TVal, Nothing>
  : IfOp<TMatch, "GreaterThan"> extends true ? Attempt<
      TVal, TMatch, GreaterThan<AsNumber<TVal>, AsNumber<TMatch[Params]>>
    >
  : IfOp<TMatch, "LessThan"> extends true ? Attempt<
      TVal, TMatch, LessThan<AsNumber<TVal>, AsNumber<TMatch[Params]>>
    >
  : IfOp<TMatch, "StartsWith"> extends true ? Attempt<
      TVal, TMatch, StartsWith<AsString<TVal>, AsString<TMatch[Params][0]>>
    >
  : IfOp<TMatch, "EndsWith"> extends true ? Attempt<
      TVal, TMatch, EndsWith<AsString<TVal>, AsString<TMatch[Params][0]>>
    >
  : IfOp<TMatch, "Includes"> extends true ? Attempt<
      TVal, TMatch, Includes<AsString<TVal>, AsString<TMatch[Params]>>
    >

  : TMatch[Op] extends "ReturnsSomething"
  ? IfExtends<
      TVal, AnyFunction, 
      DoesExtend<ReturnType<AsFunction<TVal>>, Something>,
      InvalidTypeForOp<AnyFunction,TVal,TMatch>
    >
  : TMatch[Op] extends "ReturnsNothing"
  ? IfExtends<
      TVal, AnyFunction, 
      DoesExtend<ReturnType<AsFunction<TVal>>, Nothing>,
      InvalidTypeForOp<AnyFunction,TVal,TMatch>
    >
  : TMatch[Op] extends "ReturnsTrue"
  ? IfExtends<
      TVal, AnyFunction, 
      DoesExtend<ReturnType<AsFunction<TVal>>, true>,
      InvalidTypeForOp<AnyFunction,TVal,TMatch>
    >
  : TMatch[Op] extends "ReturnsFalse"
  ? IfExtends<
      TVal, AnyFunction, 
      DoesExtend<ReturnType<AsFunction<TVal>>, false>,
      InvalidTypeForOp<AnyFunction,TVal,TMatch>
    >
  : TMatch[Op] extends "ReturnsTruthy"
  ? IfExtends<
      TVal, AnyFunction, 
      IsTruthy<ReturnType<AsFunction<TVal>>>,
      InvalidTypeForOp<AnyFunction,TVal,TMatch>
    >
  : TMatch[Op] extends "ReturnsFalsy"
  ? IfExtends<
      TVal, AnyFunction, 
      IsFalsy<ReturnType<AsFunction<TVal>>>,
      InvalidTypeForOp<AnyFunction,TVal,TMatch>
    >

  : IfOp<TMatch, "Contains"> extends true ? Attempt<
      TVal, TMatch, Contains<AsArray<TVal>, First<TMatch[Params]>>
    >
  : ErrorCondition<
      "unknown-operation",
      Concat<[
          "The operation '",
          TMatch[Op],
          "' is not recognized"
      ]>,
      "ApplyMatch"
    >
: ErrorCondition<
    "invalid-match-definition", 
    "The structure of the MatchDef passed into ApplyMatch is invalid!",
    "ApplyMatch",
    { match: TMatch }
  >;


/**
 * **ApplyMatch**`<TVal, TMatch>`
 * 
 * Applies a value `TVal` to the `MatchDef` defined in `TMatch`.
 */
export type ApplyMatch<
  TVal, 
  TMatch extends MatchDef<MatchOp>
> = TMatch extends MatchDef<MatchOp>
? TMatch[Handler] extends "throw"
  ? Process<TVal,TMatch>
: TMatch[Handler] extends "use-else"
  ? Process<TVal,TMatch> extends ErrorCondition
    ? Last<TMatch[Params]>
    : Process<TVal,TMatch>
: TMatch[Handler] extends "flatten"
  ? Process<TVal,TMatch> extends Tuple
    ? ShouldFlatten<Process<TVal,TMatch>>
    : Process<TVal,TMatch>
: TMatch[Handler] extends "ignore"
  ? TMatch[Handler] extends ErrorCondition
    ? ShouldIgnore<TVal>
    : Process<TVal,TMatch>
: ErrorCondition<
    "unknown-handler",
    Concat<[
      "The handler '",
      TMatch[Handler],
      "' is not known!"
    ]>,
    "ApplyMatch",
    { match: TMatch }
  >
: ErrorCondition<
    "invalid-match-definition", 
    "The structure of the MatchDef passed into ApplyMatch is invalid!",
    "ApplyMatch",
    { match: TMatch }
  >;
