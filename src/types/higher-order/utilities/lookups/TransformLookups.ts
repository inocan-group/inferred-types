import {TYPE_TRANSFORMS} from "src/constants";
import { OpHandler , ElseOperation , ValueOrReturnValue, RemoveNever, AsArray } from "src/types";

/** lookup table */
type Transforms = typeof TYPE_TRANSFORMS;

/**
 * **TransformOp**
 * 
 * The valid _transform_ keys provided in higher order types
 */
export type TransformOp = keyof Transforms & keyof typeof TYPE_TRANSFORMS;

// COLUMNS
type RefType = 0;
type Params = 1;
type Desc = 2;

// UTILITIES

/**
 * **TransformParams**`<TOp, [THandler]>`
 * 
 * Looks up the parameters required for the given operation `TOp` and adjusts
 * to add the `ElseOperation` (aka, if "use-else" handler then add ELSE param)
 */
export type TransformParams<
  TOp extends TransformOp, 
  THandler extends OpHandler = "throw"
> = Transforms[TOp][Params] extends readonly unknown[]
? AsArray<RemoveNever<[...Transforms[TOp][Params], ElseOperation<THandler>]>>
: AsArray<[]>;

/**
 * **TransformRefType**`<T>`
 * 
 * Provides the reference type for a given operation `<T>`.
 */
export type TransformRefType<T extends TransformOp> = ValueOrReturnValue<Transforms[T][RefType]>;

/**
 * **TransformDesc**`<T>`
 * 
 * Gets the description for a given operation `T`.
 */
export type TransformDesc<T extends TransformOp > = Transforms[T][Desc];
