import { Completed } from "~/Builder";

/**
 * Represents a _fluent_ API structure for an API
 */
export type FluentApi<
  T extends Record<string, (...args: any[]) => any>,
  R extends boolean = false,
  E extends string = ""
> = {
  [P in keyof T]: (
    ...args: Parameters<T[P]>
  ) => R extends true
    ? Completed<Omit<FluentApi<T, R>, E>, ReturnType<T[P]>>
    : Omit<FluentApi<T, R>, E>;
};

/**
 * Represents a specific function that sits on Fluent API surface
 */
export type FluentFn<A, F extends (...args: any[]) => any> = (...args: Parameters<F>) => A;
