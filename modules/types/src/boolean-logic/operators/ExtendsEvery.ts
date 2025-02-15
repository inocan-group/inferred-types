import { And, Or } from "inferred-types/types";

/**
 * **ExtendsEvery**`<T,U>`
 *
 * Boolean operator which tests weather the elements in the list `T`
 * have at least one element which extends _every_ element in `U`.
 *
 * - This utility uses the strict `extends` operation
 * - Use `HasEvery` if you want to use the `equals` operation
 */
export type ExtendsEvery<
  T extends readonly unknown[],
  U extends readonly unknown[]
> = And<{
  [K in keyof T]: Or<{
    [Key in keyof U]: T[K] extends U[Key] ? true : false
  }>
}>;
