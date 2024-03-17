import { AnyObject, IfScalar, Narrowable, Scalar } from "src/types/index";
import { isScalar } from "../type-guards/isScalar";


/**
 * **ifScalar**(value, ifCallback, notCallback)
 * 
 * A runtime utility which branches based on whether 
 * the type is a `T` is a _scalar_ value or not. 
 * 
 *  - each branch is provided an _optional_ callback to further
 * refine the type.
 * ```ts
 * const val: number | string = 42;
 * const narrow = ifScalar(val);
 * ```
 */
export function ifScalar<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  value: T, 
  ifCallback: <
    V extends Exclude<T, undefined | AnyObject | unknown[]>
  >(v: V) => IF,
  notCallback: <V extends Exclude<T, Scalar>>(v: V) => ELSE
) {
  const result = isScalar(value) 
    ? ifCallback(
        value as Exclude<T, undefined | AnyObject | unknown[]>
      )
    : notCallback(value as Exclude<T, Scalar>);
  return result as typeof result & IfScalar<T, IF, ELSE>;
}
