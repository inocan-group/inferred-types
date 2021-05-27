/**
 * **TypeGuard**
 *
 * a typing for a **TS** type-guard which evaluates an _unknown_ input
 * and determines if it is of type `T`.
 */
export type TypeGuard<T> = (thing: unknown) => thing is T;
