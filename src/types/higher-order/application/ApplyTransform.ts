

type Identity = 0;
type Op = 1;
type Params = 2;
type Handler = 3;

type InvalidTypeForOp<
  TExpects,
  TType,
  TTransform extends TransformDef<ComparisonOp>
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
  "ApplyTransform",
  { type: TType; expected: TExpects; operation: TTransform[Op] }
>;


type IfOp<
  TTransform extends TransformDef<ComparisonOp>,
  TOp extends ComparisonOp,
> = TTransform[Op] extends TOp ? true : false;

/**
 * Check whether the input `TVal` extends the reference type
 * of the `TransformDef` and return error if not.
 */
type Attempt<
  TVal,
  TTransform extends TransformDef<TransformOp>,
  TType
> = TVal extends TransformRefType<TTransform[Op]>
? TType
: InvalidTypeForOp<
    ComparisonRefType<TTransform[Op]>, 
    TVal, 
    TTransform
  >;

type Process<
  TVal, 
  TTransform extends TransformDef<TransformOp>
> = any;


/**
 * **ApplyMatch**`<TVal, TTransform>`
 * 
 * Applies a value `TVal` to the `TransformDef` defined in `TTransform`.
 */
export type ApplyTransform<
  TVal, 
  TTransform extends TransformDef<TransformOp>
> = TTransform extends TransformDef<TransformOp>
? Process<TVal,TTransform>
: ErrorCondition<
    "invalid-transform-definition", 
    "The structure of the TransformDef passed into ApplyTransform is invalid!",
    "ApplyMatch",
    { transform: TTransform }
  >;
