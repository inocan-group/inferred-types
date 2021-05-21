import { Completed } from "~/Builder";

/**
 * Represents a _fluent_ API structure for an API where `E` will exclude parts of
 * API which should masked and `D` indicates whether the configuration is "done"
 * (meaning that the current state meets the requirements for the target state)
 */
export type FluentApi<
  T extends Record<string, (...args: any[]) => any>,
  E extends string = "",
  D extends boolean = false
> = {
  [P in keyof T]: (
    ...args: Parameters<T[P]>
  ) => D extends true ? Completed<FluentApi<T, E, true>, ReturnType<T[P]>> : FluentApi<T, E, false>;
};

/**
 * Represents a specific function that sits on Fluent API surface
 */
export type FluentFn<A, F extends (...args: any[]) => any> = (...args: Parameters<F>) => A;
