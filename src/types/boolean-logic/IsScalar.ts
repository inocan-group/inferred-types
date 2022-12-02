import { Narrowable } from "../Narrowable";

export type IsScalar<T extends Narrowable> = [T] extends [string]
  ? true
  : [T] extends [number]
  ? true
  : [T] extends [boolean]
  ? true
  : false;

/**
 * **IfScalar**`<T, IF, ELSE>`
 *
 * Branch type utility which returns `IF` when `T` is a scalar value (aka, string, number, or boolean) and `ELSE` otherwise
 */
export type IfScalar<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsScalar<T> extends true ? IF : ELSE;
