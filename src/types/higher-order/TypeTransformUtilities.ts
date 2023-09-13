import { 
  TypeTransformOp, 
  TypeTransformOp_CrossType, 
  TypeTransformOp_Numeric, 
  TypeTransformOp_String,
} from "../base";

/**
 * **TypeConversionParams**
 * 
 * A dictionary of conversion operations which require
 * parameters _in addition_ to an input type to perform
 * their transformation.
 */
type TypeConversionParams = {
  StripLeading: [string];
  StripTrailing: [string];
  EnsureLeading: [string];
  EnsureTrailing: [string];
  Surround: [string, string];
  Prepend: [string];
  Append: [string];
};

/**
 * **TypeTransformRequiresParam**`<TOp>`
 * 
 * Boolean type utility which indicates whether the given transformation `TOp`
 * requires a property/properties beyond just the _input_ state to run it's 
 */
export type TypeTransformRequiresParam<TOp extends TypeTransformOp> = 
  TOp extends keyof TypeConversionParams
    ? true 
    : false;

/**
 * **ValidTransformParams**`<TOp, TParams>`
 * 
 * Boolean type utility which tests whether the provided parameters
 * are appropriate for the transformation operation.
 */
export type ValidTransformParams<
  TOp extends TypeTransformOp,
  TParams
> = TypeTransformRequiresParam<TOp> extends true
  ? TParams extends TypeConversionParams[TOp & keyof TypeConversionParams]
    ? true
    : false
  : true;

/**
 * **AsSelectedTransformParams**
 * 
 * Extends the type of TParams to include the requirements for the give operation
 */
export type AsSelectedTransformParams<
  TOp extends TypeTransformOp,
  TParams
> =  
TOp extends keyof TypeConversionParams 
? TypeConversionParams[TOp] & TParams
: never;


/**
 * **ValidTransformInput**`<TOp, TInput>`
 * 
 * Boolean type utility which determines whether `TInput` is 
 * a valid type based on the `TOp` being executed.
 */
export type ValidTransformInput<
  TOp extends TypeTransformOp,
  TInput
> = TOp extends TypeTransformOp_CrossType
? true
: TOp extends TypeTransformOp_String
  ? TInput extends string ? true : false
  : TOp extends TypeTransformOp_Numeric
    ? TInput extends number ? true : false
    : false;



/**
 * **AsTransformInput**
 * 
 * Narrows type of `TInput` to include any additional type info
 * required from the particular operation `TOp`.
 */
export type AsTransformInput<
    TOp extends TypeTransformOp,
    TInput
  > =  TOp extends TypeTransformOp_String
    ? TInput & string
    : TOp extends TypeTransformOp_Numeric
      ? TInput & number
      : TInput & unknown;

