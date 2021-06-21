/**
 * **SameKeys**
 *
 * Creates a _type_ with the same _keys_ as `T` but sets all values of these keys to `A` (which is
 * **any** by default).
 * 
 * Note: meant to be used as part of an _extends_ clause in most cases.
 */
export type SameKeys<T extends object, A extends any = any> = {
  [P in keyof T]: A;
};
