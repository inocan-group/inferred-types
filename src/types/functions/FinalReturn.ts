/**
 * A type utility which looks at a chain for functions and reduces the type
 * to the final `ReturnType` of the chain.
 * 
 * ```ts
 * // number
 * type T = FinalReturn<() => (foo: string) => (bar: string) => () => number>;
 * ```
 */
export type FinalReturn<T> = T extends (...args: unknown[]) => unknown
  ? FinalReturn<ReturnType<T>>
  : T;
