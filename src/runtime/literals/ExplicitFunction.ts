/* eslint-disable no-use-before-define */
export type ExplicitFunction<P extends unknown[], R> = (...args: P) => R;

/**
 * Takes a given function and converts it to an explicit representation
 * where the generics represent the _parameter_ and _return_ typings.
 */
export function ExplicitFunction<T extends (...args: unknown[]) => unknown>(fn: T) {
  return fn as ExplicitFunction<Parameters<T>, ReturnType<T>>;
}
