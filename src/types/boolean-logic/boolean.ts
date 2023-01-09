import { AnyFunction } from "src/runtime/type-checks";
import { Narrowable } from "../Narrowable";
import { IsEqual } from "./equivalency";

export type IsBoolean<T> = [T] extends [boolean] ? true : false;

/**
 * **IsTrue**`<T>`
 * 
 * Type utility which checks for the narrow type of `true`
 * ```ts
 * // true
 * type T = IsTrue<true>;
 * // false
 * type U = IsTrue<boolean>;
 * // false
 * type F2 = IsTrue<"foobar">;
 * ```
 */
export type IsTrue<T extends Narrowable> = IsBoolean<T> extends true
  ? T extends true
    ? true
    : false
  : false;

/**
 * **IsSoftTrue**`<T>`
 * 
 * Type utility which checks for the narrow type of `true` but only converts
 * what it knows at design time. Valid return types are: 
 * 
 * - `true` - known to be of `true` type
 * - `false` - known to be of `false` type
 * - `boolean` - can't determine true/false at design time
 * - `Exclude<T, boolean>` - not a boolean type
 */
export type IsSoftTrue<T extends Narrowable> = IsBoolean<T> extends true
  ? true
  : T extends false
    ? false
    : T extends boolean
      ? boolean
      : Exclude<T, boolean>;

/**
 * **IsFalse**`<T>`
 * 
 * Type utility which checks for the narrow type of `false`
 * ```ts
 * // true
 * type T = IsFalse<true>;
 * // false
 * type U = IsFalse<boolean>;
 * type F2 = IsFalse<"foobar">;
 * ```
 */
export type IsFalse<T extends Narrowable> = IsBoolean<T> extends true
  ? T extends false
    ? true
    : false
  : false;

/**
 * **IfType**`<T,IF,ELSE>`
 * 
 * Type utility which checks for literal `true` value and then switches type
 * to the `IF` or `ELSE` generic types. 
 * 
 * Note: the wide _boolean_ type or any non-boolean type results in `ELSE`; 
 * if you are looking for different behavior consider `IfSoftTrue` instead.
 */
export type IfTrue<
  T extends boolean,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsTrue<T> extends true ? IF : ELSE;

/**
 * **IfSoftTrue**`<T, IF, ELSE, MAYBE, UNKNOWN>`
 * 
 * Type utility which transforms the type based on `T`'s boolean state:
 * 
 * - `true` - converts to the `IF` type
 * - `false` - converts to the `ELSE` type
 * - `boolean` - converts to the `MAYBE` state (which is union of `IF` and `ELSE` by default)
 * - `Not(boolean)` - converts to the `UNKNOWN` state which by default is `Exclude<T, boolean>`
 * 
 * **Related:** `IfTrue`
 */
export type IfSoftTrue<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable,
  MAYBE extends Narrowable = IF | ELSE,
  UNKNOWN extends Narrowable = Exclude<T, boolean>
> = //
  T extends true 
    ? IF
    : T extends false
      ? ELSE
      : IsBoolean<T> extends true ? MAYBE : UNKNOWN;

/**
 * **IfFalse**`<T, IF, ELSE>`
 * Type utility which checks for literal `false` value and then switches
 * the  type accordingly to the `IF` or `ELSE` types.
 * 
 * Note: the wide _boolean_ type or any non-boolean type results in false / `ELSE`; 
 * if you are looking for different behavior consider `IfSoftTrue` instead
 */
export type IfFalse<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable,
> = IsFalse<T> extends true ? IF : ELSE;


/**
 * **IfSoftTrue**`<T, IF, ELSE, MAYBE, UNKNOWN>`
 * 
 * Type utility which transforms the type based on `T`'s boolean state:
 * 
 * - `false` - converts to the `IF` type
 * - `true` - converts to the `ELSE` type
 * - `boolean` - converts to the `MAYBE` state (which is union of `IF` and `ELSE` by default)
 * - `Not(boolean)` - converts to the `UNKNOWN` state which by default is `Exclude<T, boolean>`
 */
export type IfSoftFalse<
  T extends boolean,
  TRUE extends Narrowable,
  FALSE extends Narrowable,
  MAYBE extends Narrowable = TRUE | FALSE,
  UNKNOWN extends Narrowable = Exclude<T, boolean>
> = //
  T extends false 
    ? TRUE
    : T extends true
      ? FALSE
      : IsBoolean<T> extends true ? MAYBE : UNKNOWN;

/**
 * **IsBooleanLiteral**
 *
 * Type utility which returns true/false if the boolean value is a _boolean literal_ versus
 * just the wider _boolean_ type.
 */
export type IsBooleanLiteral<T extends Narrowable> = IsTrue<T> extends true
  ? true
  : IsFalse<T> extends true
  ? true
  : false;

export type IfBoolean<
  T extends Narrowable, 
  TRUE, 
  FALSE,
> = IsBoolean<T> extends true ? TRUE : FALSE;

/**
 * **IfBooleanLiteral**
 *
 * Branch utility which returns `TRUE` type when `T` is a boolean literal and `FALSE` otherwise
 */
export type IfBooleanLiteral<
  T extends boolean,
  TRUE extends Narrowable,
  FALSE extends Narrowable
> = IsBooleanLiteral<T> extends true ? TRUE : FALSE;

/**
 * **ReturnsTrue**`<T>`
 * 
 * Type utility which indicates whether the _return value_ of `T` is 
 * a `true` value. Return value are always either `true` or `false`.
 * 
 * Note: any non-functions passed in as `T` are always a **false** value
 * and so is a `boolean` value
 */
export type ReturnsTrue<T> = T extends AnyFunction
  ? ReturnType<T> extends true
    ? true
    : false
  : false;

/**
 * **ReturnsTrue**`<T>`
 * 
 * Type utility which indicates whether the _return value_ of `T` is 
 * a `false` value. Possible values are `true`, `false`, or `boolean`.
 * 
 * Note: any non-functions passed in as `T` are removed from the result set
 */
export type ReturnsFalse<T> = T extends AnyFunction
  ? ReturnType<T> extends false
    ? true
    : IsEqual<ReturnType<T>, boolean> extends true ? boolean : false
  : false;

/**
 * **ReturnsBoolean**`<T>`
 * 
 * Type utility which indicates whether the _return value_ of `T` is 
 * a `false` value. Possible values are `true`, `false`, or `boolean`.
 * 
 * Note: any non-functions passed in as `T` are always a **false** value
 */
export type ReturnsBoolean<T> = T extends AnyFunction
  ? IfBoolean<ReturnType<T>, true, false>
  : false;

