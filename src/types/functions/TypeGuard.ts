import { Narrowable } from "src/types/index";

/**
 * **TypeGuard**
 *
 * a typing for a **TS** type-guard which evaluates an _unknown_ input
 * and determines if it is of type `T`.
 */
export type TypeGuard<T, U = Narrowable> = <UU extends U>(value: UU) => value is T & UU;
