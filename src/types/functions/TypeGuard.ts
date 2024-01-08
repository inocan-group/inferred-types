import { Narrowable } from "..";

/**
 * **TypeGuard**
 *
 * a typing for a **TS** type-guard which evaluates an _unknown_ input
 * and determines if it is of type `T`.
 */
export type TypeGuard<T> = <U extends Narrowable>(value: U) => value is T & U;