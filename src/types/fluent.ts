/**
 * Represents a _fluent_ API structure for an API
 */
export type FluentApi<T extends Record<string, (...args: any[]) => any>> = {
  [P in keyof T]: (...args: Parameters<T[P]>) => FluentApi<T>;
};

/**
 * Represents a specific function that sits on Fluent API surface
 */
export type FluentFn<A, F extends (...args: any[]) => any> = (...args: Parameters<F>) => A;
