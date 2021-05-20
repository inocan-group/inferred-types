/**
 * **FluentWrapper**
 *
 * The `FluentWrapper<T, A, D, E>` type exposes an API defined by `A`
 *
 *
 * where the API is intended to
 * allows users of the API to manage an internal state of `Partial<T>` until it
 * eventually achieves a state of `<T>`.
 *
 * is a data structure that is _in the process of_ being
 * fullly configured as the type `T`.
 *
 * In this transient state, `Configured<T>` can move back and forth between
 * a full and partial representation of `T`. When it achieves full representation
 * it exposes an `unwrap()` function to extract the
 *
 * It is always allows the full flexibility of being a `Partial<T>`
 * but it can also be ornamented with the `Completed<Partial<T>>` to
 * indicated that if it were to be _unwrapped_ it will unwrap to `T` not
 * `Partial<T>`.
 */
// export type FluentWrapper<T, A extends object, D extends boolean, E extends string> =
//   | Partial<T>
//   | Completed<Partial<T>>;

// export type FluentFunction<F extends {K: (...args: P) => F}, K extends keyof F & string, P extends any[]> = F

/**
 * **FluentApi**
 *
 * A dictionary object which exposes a set of functions which return the same API surface.
 */
// export type FluentApi<K extends string,   A extends Record<K, (<P extends any[]>(...args: P) => A)>>
