import {
  Scalar,
  IsFalsy,
  IsLength,
  IsTruthy,
  Keys,
  AnyObject,
  IsNever,
  If,
  Extends,
  AsRecord
} from "@inferred-types/types";


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
export type ToBoolean<T> = If<
IsNever<T>,
false,
T extends boolean
? T
: T extends Scalar
  ? If<
      IsTruthy<T>,
      true,
      If<IsFalsy<T>, false, boolean>
    >
  : T extends readonly unknown[]
    ? If<
        IsLength<Keys<T>["length"], 0>,
        false,
        true
      >
    : T extends AnyObject
      ? If<IsLength<Keys<AsRecord<T>>["length"], 0>, false, true>
      : If<Extends<T, undefined>, false, boolean>
>;
