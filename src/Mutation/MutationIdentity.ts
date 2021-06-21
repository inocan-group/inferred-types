/* eslint-disable no-use-before-define */
/**
 * **MutationIdentity**
 *
 * Defines a function which is passed a state `T` and returns a function with
 * an arbitrary -- but strongly typed -- set of parameters `P` which _must_ return
 * the same state `T` back.
 *
 * This allows `T` to be mutated by a relatively unconstrained set of mutation functions with the
 * sole guarentee that the form `T` is preserved.
 */
export type MutationIdentity<T, P extends any[]> = (state: T) => (...args: P) => T;

/**
 * **MutationIdentity**
 *
 * A function which strongly types the construction of a `MutationIdentity`
 * higher-order function to be built. Usage:
 *
 * - The structure of the _state_ is defined in the first call as `T`
 * - The interior function than defines a mutation function which implicitly
 * defines the calling signature as `P` but is required to return the identity state
 * structure `T`.
 *
 * ```ts
 * type State = { foo: number, bar: number };
 * const incr = MutationIdentity<State>()(
 *    s => () => {...s, foo: s.foo++}
 * );
 * ```
 */
export function MutationIdentity<T>() {
  return function <M extends MutationIdentity<T, P>, P extends any[]>(m: M) {
    return m;
  };
}
