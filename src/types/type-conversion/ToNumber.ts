import { 
  Scalar, 
  IfScalar, 
  ToNumericArray, 
  IfTrue, 
  IfFalse, 
  IfBoolean, 
  Tuple
} from "src/types";

type ConvertElement<
  TValue extends Scalar
> = 
TValue extends number
  ? TValue
  : TValue extends `${infer N extends number}` 
    ? N
    : IfTrue<
        TValue, 
        1, 
        IfFalse<TValue, 0, IfBoolean<TValue, 1 | 0, never>>
      >;



/**
 * **ToNumber**`<T>`
 * 
 * - Converts `T` into a numeric type:
 *    - if `T` is a Scalar/Object it's converted to a number where possible
 *    - if `T` is an array then each element will be converted to a number where possible
 *    - any non-numeric content which can not be converted to a number will be convert to `never`
 *    - a number or a numeric array will be proxied through "as is"
 */
export type ToNumber<TValue> = TValue extends Tuple
  ? ToNumericArray<TValue>
  : IfScalar<TValue, ConvertElement<TValue & Scalar>, never>;

