export type IsScalar<T> = [T] extends [string]
  ? true
  : [T] extends [number]
  ? true
  : [T] extends [boolean]
  ? true
  : false;

/**
 * **IfScalar**
 *
 * Branch type utility which returns `IF` when `T` is a scalar value and `ELSE` otherwise
 */
export type IfScalar<T, IF, ELSE> = IsScalar<T> extends true ? IF : ELSE;
