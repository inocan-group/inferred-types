import { 
  AnyFunction, 
  Nothing, 
  Something, 
  Tuple,
  AsArray, 
  AsFunction, 
  AsNumber, 
  AsString, 
  Concat,
  ErrorCondition,
  GreaterThan, 
  LessThan, 
  DescribeType ,
  Contains, 
  DoesExtend, 
  DoesNotExtend, 
  EndsWith, 
  IfExtends, 
  Includes, 
  IsEqual, 
  IsFalsy, 
  IsTruthy, 
  NotEqual, 
  StartsWith, 
  Matcher,
  First
} from "../base";

export type TypeComparisonHandler = "skip" | "throw" | "narrow";

type Op<T extends Matcher> = T[0];
type Params<T extends Matcher> = T[1];

type InvalidTypeForOp<
TExpects,
TType,
TComparison extends Matcher
> = ErrorCondition<
  "invalid-type-for-operation",
  Concat<[
    "The operation '",
    Op<TComparison>,
    "' expects a type of '",
    DescribeType<TExpects>,
    "' but got '",
    DescribeType<TType>,
    "' instead."
  ]>,
  "TypeComparison",
  { type: TType; expected: TExpects; operation: Op<TComparison> }
>;

/**
 * **TypeComparison**`<TInput, TMatcher>`
 * 
 * Type utility which validates a type `TInput` using the comparison operation,
 * and all parameters defined in the matcher. The typical response is a true/false
 * response but in some cases a ErrorCondition might be raised.
 * 
 * **Note:** this utility is often called _via_ the `Match` utility instead of
 * directly as this utility will always return error conditions regardless of
 * of the handling type expressed in the `Matcher`
 */
export type TypeComparison<
  TInput,
  TComparison extends Matcher
> = Op<TComparison> extends "Equals" ? IsEqual<TInput, Params<TComparison>>
: Op<TComparison> extends "NotEqual" ? NotEqual<TInput, Params<TComparison>>
: Op<TComparison> extends "Extends" ? DoesExtend<TInput, Params<TComparison>>
: Op<TComparison> extends "DoesNotExtend" ? DoesNotExtend<TInput, Params<TComparison>>
: Op<TComparison> extends "Truthy" ? IsTruthy<TInput>
: Op<TComparison> extends "Falsy" ? IsFalsy<TInput>
: Op<TComparison> extends "IsSomething" ? DoesExtend<TInput, Something>
: Op<TComparison> extends "IsNothing" ? DoesExtend<TInput, Nothing>
: Op<TComparison> extends "GreaterThan" 
  ? IfExtends<
      TInput, number, 
      GreaterThan<AsNumber<TInput>, AsNumber<Params<TComparison>>>,
      InvalidTypeForOp<number,TInput,TComparison>>
: Op<TComparison> extends "LessThan"
  ? IfExtends<
      TInput, number, 
      LessThan<
        AsNumber<TInput>, AsNumber<Params<TComparison>>
      >,
      InvalidTypeForOp<number,TInput,TComparison>
    >
: Op<TComparison> extends "StartsWith"
? IfExtends<
    TInput, string, 
    StartsWith<AsString<TInput>, AsString<Params<TComparison>>>,
    InvalidTypeForOp<string,TInput,TComparison>
  >
: Op<TComparison> extends "EndsWith"
? IfExtends<
    TInput, string, 
    EndsWith<AsString<TInput>, AsString<Params<TComparison>>>,
    InvalidTypeForOp<string,TInput,TComparison>
  >
: Op<TComparison> extends "Includes"
? IfExtends<
    TInput, string, 
    Includes<AsString<TInput>, AsString<Params<TComparison>>>,
    InvalidTypeForOp<string,TInput,TComparison>
  >
: Op<TComparison> extends "ReturnsSomething"
? IfExtends<
    TInput, AnyFunction, 
    DoesExtend<ReturnType<AsFunction<TInput>>, Something>,
    InvalidTypeForOp<AnyFunction,TInput,TComparison>
  >
: Op<TComparison> extends "ReturnsNothing"
? IfExtends<
    TInput, AnyFunction, 
    DoesExtend<ReturnType<AsFunction<TInput>>, Nothing>,
    InvalidTypeForOp<AnyFunction,TInput,TComparison>
  >
: Op<TComparison> extends "ReturnsTrue"
? IfExtends<
    TInput, AnyFunction, 
    DoesExtend<ReturnType<AsFunction<TInput>>, true>,
    InvalidTypeForOp<AnyFunction,TInput,TComparison>
  >
: Op<TComparison> extends "ReturnsFalse"
? IfExtends<
    TInput, AnyFunction, 
    DoesExtend<ReturnType<AsFunction<TInput>>, false>,
    InvalidTypeForOp<AnyFunction,TInput,TComparison>
  >
: Op<TComparison> extends "ReturnsTruthy"
? IfExtends<
    TInput, AnyFunction, 
    IsTruthy<ReturnType<AsFunction<TInput>>>,
    InvalidTypeForOp<AnyFunction,TInput,TComparison>
  >
: Op<TComparison> extends "ReturnsFalsy"
? IfExtends<
    TInput, AnyFunction, 
    IsFalsy<ReturnType<AsFunction<TInput>>>,
    InvalidTypeForOp<AnyFunction,TInput,TComparison>
  >
: Op<TComparison> extends "Contains"
? IfExtends<
    TInput, Tuple, 
    Contains<AsArray<TInput>, First<Params<TComparison>>>,
    InvalidTypeForOp<AnyFunction,TInput,TComparison>
  >
: never;





