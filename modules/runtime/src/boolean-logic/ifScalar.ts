import {
  Dictionary,
  If,
  IsScalar,
  Narrowable,
  Scalar
} from "inferred-types/types";
import { isScalar } from "src/type-guards/isScalar";



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
  TIf extends Narrowable,
  TElse extends Narrowable
>(
  value: T,
  ifCallback: <
    V extends Exclude<T, undefined | Dictionary | unknown[]>
  >(v: V) => TIf,
  notCallback: <V extends Exclude<T, Scalar>>(v: V) => TElse
) {
  const result = isScalar(value)
    ? ifCallback(
      value as Exclude<T, undefined | Dictionary | unknown[]>
    )
    : notCallback(value as Exclude<T, Scalar>);
  return result as typeof result & If<IsScalar<T>, TIf, TElse>;
}
