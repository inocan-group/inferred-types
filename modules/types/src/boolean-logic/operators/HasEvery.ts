import type { And, Or } from "inferred-types/types";

/**
 * **HasEvery**`<T,U>`
 *
 * Boolean operator which tests weather the list contained by `T` has
 * _every_ element of `U`.
 *
 * - This utility uses the strict `equality` operation
 * - Use `ExtendsEvery` if you want to looser operation
 */
export type HasEvery<
  T extends readonly unknown[],
  U extends readonly unknown[],
> = And<{
  [K in keyof U]: Or<{
    [Key in keyof T]: U[K] extends T[Key] ? true : false
  }>
}>;
