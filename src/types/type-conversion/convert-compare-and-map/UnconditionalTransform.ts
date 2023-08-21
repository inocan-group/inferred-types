import { 
  TypeTransformOp, 
  TypeTransformRequiresParam, 
  ValidTransformInput,
  ValidTransformParams,
  Concat, 
  ErrorCondition,
  First,
  StripLeading,
  Tuple,
  StripTrailing,
  EnsureLeading,
  EnsureTrailing,
  AsArray,
  AsString,
  Surround,
  AsSelectedTransformParams,
  AsTransformInput,
  ToString,
  ToBoolean,
  AllCaps,
  Pluralize,
  PascalCase,
  CamelCase,
  SnakeCase,
  KebabCase,
  Increment,
  Decrement,
  DescribeType,
} from "src/types";

export type InvalidTransformInput<
  TOp extends TypeTransformOp, 
  TInput
> = ErrorCondition<
  "invalid-input",
  Concat<[
    "The '",
    TOp,
    "' operation expects the input type to extend from the type '",
    DescribeType<AsTransformInput<TOp,unknown>>,
    "' but that requirement was not met"
  ]>,
  "TypeTransform",
  { input: TInput; operation: TOp }
>;

export type InvalidTransformParams<
  TOp extends TypeTransformOp, 
  TInput,
  TParams extends Tuple
> = ErrorCondition<
  "invalid-params",
  Concat<[
    "The '",
    TOp,
    "' operation expects the parameters for the transform to structurally look like '",
    DescribeType<AsSelectedTransformParams<TOp,unknown>>,
    "' but that requirement was not met."
  ]>,
  "TypeTransform",
  { input: TInput; operation: TOp; params: TParams }
>;

type UnknownTransformOperation<
  TOp extends TypeTransformOp, 
  TInput
> = ErrorCondition<
  "unknown-transformation-op",
  Concat<[
    "The transform operation '",
    TOp,
    "' is not known!",
  ]>,
  "TypeTransform",
  { input: TInput; operation: TOp }
>;

/**
 * **TypeTransformAtomic**`<TInput, TOp>`
 * 
 * Handles transforming types for "atomic" type conversions (aka, parameterless)
 */
type TypeTransformAtomic<
  TInput,
  TOp extends TypeTransformOp
> = ValidTransformInput<TOp,TInput> extends true
? TOp extends "Identity" ? TInput
  : TOp extends "ToNever" ? never
  : TOp extends "ToString" ? ToString<TInput>
  : TOp extends "ToBoolean" ? ToBoolean<TInput>
  : TOp extends "Capitalize" ? Capitalize<AsTransformInput<TOp,TInput>>
  : TOp extends "Lowercase" ? Lowercase<AsTransformInput<TOp,TInput>>
  : TOp extends "AllCaps" ? AllCaps<AsTransformInput<TOp,TInput>>
  : TOp extends "Plural" ? Pluralize<AsTransformInput<TOp,TInput>>
  : TOp extends "ToPascalCase" ? PascalCase<AsTransformInput<TOp,TInput>>
  : TOp extends "ToCamelCase" ? CamelCase<AsTransformInput<TOp,TInput>>
  : TOp extends "ToSnakeCase" ? SnakeCase<AsTransformInput<TOp,TInput>>
  : TOp extends "ToKebabCase" ? KebabCase<AsTransformInput<TOp,TInput>>
  : TOp extends "Increment" ? Increment<AsTransformInput<TOp,TInput>>
  : TOp extends "Decrement" ? Decrement<AsTransformInput<TOp,TInput>>
  : UnknownTransformOperation<TOp,TInput>
: InvalidTransformInput<TOp,TInput>;

/**
 * **TypeTransformParameterized**`<TInput,TOp,TParam>`
 * 
 * Handles transforming types for type conversions which require parameters
 * to fulfill their contract
 */
type TypeTransformParameterized<
  TInput,
  TOp extends TypeTransformOp,
  TParams extends Tuple
> = // 
ValidTransformInput<TOp, TInput> extends true
  ? ValidTransformParams<TOp, TParams> extends true
    ? TParams extends AsSelectedTransformParams<TOp, TParams>
      ? TOp extends "StripLeading" ? StripLeading<TInput, First<TParams & Tuple>>
      : TOp extends "StripTailing" ? StripTrailing<TInput, First<TParams & Tuple>>
      : TOp extends "EnsureLeading" 
        ? EnsureLeading<TInput & string, AsString<First<AsArray<TParams>>>>
      : TOp extends "EnsureTrailing" 
        ? EnsureTrailing<TInput & string, AsString<First<AsArray<TParams> & Tuple>>>
      : TOp extends "Surround"
        ? Surround<
            AsTransformInput<TOp,TInput>, 
            AsSelectedTransformParams<TOp, TParams>[0], 
            AsSelectedTransformParams<TOp, TParams>[1]
          >
      : TOp extends "Prepend"
        ? Concat<[
            AsSelectedTransformParams<TOp, TParams>[0],
            TInput
          ]>
      : TOp extends "Append"
        ? Concat<[
            TInput,
            AsSelectedTransformParams<TOp, TParams>[0],
          ]>
      : UnknownTransformOperation<TOp,TInput>
    : InvalidTransformParams<TOp,TInput,TParams>
  : InvalidTransformInput<TOp,TInput>
: never;


/**
 * **TypeTransform**`<TOp, TInput, [TParams]>`
 * 
 * A type utility which takes:
 * 1. a type transformation operation `TOp`,
 * 2. an input `TInput`, 
 * 3. and, where it is required, additional parameters `TParam`
 * 
 * This utility will use these generic inputs to transform the
 * output type appropriately.
 */
export type UnconditionalTransform<
  TOp extends TypeTransformOp,
  TInput,
  TParams extends Tuple = []
> = TypeTransformRequiresParam<TOp> extends true
? TypeTransformParameterized<TInput,TOp,TParams>
: TypeTransformAtomic<TInput,TOp>;
