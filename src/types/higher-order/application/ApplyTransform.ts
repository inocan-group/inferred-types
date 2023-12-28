import {  
  AfterFirst,
  AllCaps,
  ApplyMatch,
  AsNumber,
  AsString,
  CamelCase,
  Concat, 
  Decrement, 
  DescribeType, 
  EnsureLeading, 
  EnsureTrailing, 
  ErrorCondition, 
  First, 
  IfTruthy, 
  Increment, 
  KebabCase, 
  MatchDef, 
  MatchOp, 
  PascalCase, 
  Pluralize, 
  Prepend, 
  SnakeCase, 
  StripLeading, 
  StripTrailing, 
  Surround, 
  ToString, 
  TransformDef, 
  TransformOp, 
  TransformRefType, 
  Trim,
  TrimLeft,
  TrimRight
} from "src/types";

type Op = 1;
type Params = 2;
type Handler = 3;
type Conditions = 4;

type InvalidTypeForOp<
  TExpects,
  TType,
  TTransform extends TransformDef<TransformOp>
> = ErrorCondition<
  "invalid-type-for-operation",
  Concat<[
    "The operation '",
    TTransform[Op],
    "' expects a type of '",
    DescribeType<TExpects>,
    "' but got '",
    DescribeType<TType>,
    "' instead."
  ]>,
  {
    context: { 
      type: TType; 
      expected: TExpects; 
      operation: TTransform[Op];
      params: TTransform[Params];
      handler: TTransform[Handler];
    };
    library: "inferred-types";
    utility: "ApplyTransform";
  }
>;


type IfOp<
  TVal,
  TTransform extends TransformDef<TransformOp>,
  TOp extends TransformOp,
> = TTransform[Op] extends TOp 
  ? TVal extends TransformRefType<TTransform[Op]>
    ? true
    : InvalidTypeForOp<
        TransformRefType<TTransform[Op]>, 
        TVal, 
        TTransform
      >
  : false;


/**
 * Validates a single condition existing on a `TransformDef`
 */
type ApplyConditions<
  TVal,
  TConditions extends readonly MatchDef<MatchOp>[]
> = [] extends TConditions
? true
: ApplyMatch<TVal, First<TConditions>> extends true
  ? ApplyConditions<TVal,AfterFirst<TConditions>>
  : false;

/** 
 * **CheckTransformConditions**
 * 
 * Validates that all _conditions_ provided to a `TransformDev` return
 * a valid return type.
 */
export type CheckTransformConditions<
  TVal,
  TTransform extends TransformDef<TransformOp>
> = 
TTransform[Conditions]["length"] extends 0
  ? true
  : ApplyConditions<TVal, TTransform[Conditions]> extends true
    ? ApplyConditions<TVal, TTransform[Conditions]> 
    : false;

/**
 * Applies the transform operation
 */
type Process<
  TVal, 
  TTransform extends TransformDef<TransformOp>
> = IfOp<TVal, TTransform, "Identity"> extends true ? TVal
  : IfOp<TVal, TTransform, "ToNever"> extends true ? never
  : IfOp<TVal, TTransform, "ToString"> extends true ? ToString<TVal>
  : IfOp<TVal, TTransform, "ToBoolean"> extends true ? IfTruthy<TVal, true, false>
  : IfOp<TVal, TTransform, "Trim"> extends true ? Trim<AsString<TVal>>
  : IfOp<TVal, TTransform, "TrimStart"> extends true ? TrimLeft<AsString<TVal>>
  : IfOp<TVal, TTransform, "TrimEnd"> extends true ? TrimRight<AsString<TVal>>
  : IfOp<TVal, TTransform, "Capitalize"> extends true ? Capitalize<AsString<TVal>>
  : IfOp<TVal, TTransform, "UnCapitalize"> extends true ? Uncapitalize<AsString<TVal>>
  : IfOp<TVal, TTransform, "AllCaps"> extends true ? AllCaps<AsString<TVal>>
  : IfOp<TVal, TTransform, "Lowercase"> extends true ? Lowercase<AsString<TVal>>
  : IfOp<TVal, TTransform, "ToCamelCase"> extends true ? CamelCase<AsString<TVal>>
  : IfOp<TVal, TTransform, "ToKebabCase"> extends true ? KebabCase<AsString<TVal>>
  : IfOp<TVal, TTransform, "ToPascalCase"> extends true ? PascalCase<AsString<TVal>>
  : IfOp<TVal, TTransform, "ToSnakeCase"> extends true ? SnakeCase<AsString<TVal>>
  : IfOp<TVal, TTransform, "StripLeading"> extends true ? StripLeading<AsString<TVal>,TTransform[Params][0]>
  : IfOp<TVal, TTransform, "StripTrailing"> extends true ? StripTrailing<AsString<TVal>,TTransform[Params][0]>
  : IfOp<TVal, TTransform, "EnsureLeading"> extends true ? EnsureLeading<AsString<TVal>, AsString<TTransform[Params][0]>>
  : IfOp<TVal, TTransform, "EnsureTrailing"> extends true ? EnsureTrailing<AsString<TVal>, AsString<TTransform[Params][0]>>
  : IfOp<TVal, TTransform, "StripTrailing"> extends true ? StripTrailing<AsString<TVal>,TTransform[Params][0]>
  : IfOp<TVal, TTransform, "ToPlural"> extends true ? Pluralize<AsString<TVal>>
  : IfOp<TVal, TTransform, "Surround"> extends true ? Surround<AsString<TVal>, AsString<TTransform[Params][0]>, AsString<TTransform[Params][1]>>
  : IfOp<TVal, TTransform, "Prepend"> extends true ? Prepend<AsString<TVal>, AsString<TTransform[Params][0]>>
  : IfOp<TVal, TTransform, "Append"> extends true ? Concat<[AsString<TTransform[Params][0]>, AsString<TVal>]>
  : IfOp<TVal, TTransform, "Increment"> extends true ? Increment< AsNumber<TVal>>
  : IfOp<TVal, TTransform, "Decrement"> extends true ? Decrement<AsNumber<TVal>>
  : IfOp<TVal, TTransform, "Append"> extends true ? Concat<[AsString<TTransform[Params][0]>, AsString<TVal>]>
  : never;

/**
 * **ApplyMatch**`<TVal, TTransform>`
 * 
 * Applies a value `TVal` to the `TransformDef` defined in `TTransform`.
 */
export type ApplyTransform<
  TVal, 
  TTransform extends TransformDef<TransformOp>
> = TTransform extends TransformDef<TransformOp>
? CheckTransformConditions<TVal, TTransform> extends true 
    ? Process<TVal,TTransform>
    : ErrorCondition<
        "match-failed",
        `Failed to apply the transform operation as the match conditions did not pass!`,
        {
          library: "inferred-types";
          utility: "ApplyTransform";
          value: TVal;
          operation: TTransform[Op];
          conditions: TTransform[Conditions];
          match_result: CheckTransformConditions<TVal, TTransform>;
        }
      >
: ErrorCondition<
    "invalid-transform-definition", 
    "The structure of the TransformDef passed into ApplyTransform is invalid!",
    {
      library: "inferred-types";
      utility: "ApplyTransform";
      context: { transform: TTransform };
    }
  >;
