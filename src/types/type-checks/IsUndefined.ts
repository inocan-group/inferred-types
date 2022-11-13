import { Narrowable } from "../Narrowable";

/**
 * **IsUndefined**
 *
 * Boolean type utility returns `true` if `T` is undefined; `false` otherwise
 */
export type IsUndefined<T extends Narrowable> = T extends undefined ? true : false;

/**
 * **IfUndefined**
 *
 * Branch utility which returns `IF` type when `T` is an _undefined_ value
 * otherwise returns `ELSE` type
 */
export type IfUndefined<T, IF, ELSE> = IsUndefined<T> extends true ? IF : ELSE;
