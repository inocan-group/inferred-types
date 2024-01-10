import { Scalar, IfFalsy, IfLength, IfTruthy, Keys, AnyObject, IfNever, IfExtends } from "src/types";


/**
 * **ToBoolean**`<T>`
 * 
 * Type utility which converts `T` into a boolean type regardless of
 * `T`'s underlying type.
 * 
 * - _boolean_ values are proxied through
 * - _scalar_ values are tested with the JS Truthy test to return a true/false value
 * - _containers_ with no keys evaluate to false, with keys to true
 * - _never_, _null_, and _undefined_ map to false
 * - all other values return the wide "boolean" type
 */
export type ToBoolean<T> = IfNever<
T, 
false,
T extends boolean
? T
: T extends Scalar 
  ? IfTruthy<
      T, 
      true, 
      IfFalsy<T, false, boolean>
    >
  : T extends readonly unknown[]
    ? IfLength<Keys<T>, 0, false, true>
    : T extends AnyObject 
      ? IfLength<Keys<T>, 0, false, true>
      : IfExtends<T, undefined, false, boolean>
>;
