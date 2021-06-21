/* eslint-disable no-use-before-define */

import { MutationIdentity } from "./MutationIdentity";

export type MutationFunction<T extends any, P extends any[]> = (...args: P) => T;
// export type MutationApi<A extends object, MutationFunction<T,P>> = {[key: U in A]: MutationFunction<T,P>}
// export type MutationApi<T extends any, K extends string & keyof A, A extends { [key: K]:  MutationFunction<T,P>} =

/**
 * **MutationFunction**
 *
 * Given a `MutationIdentity` higher-order function to work with, _this_ higher order expression
 * allows you to specify the structure of "state" `T` with the first function call; the
 * remaining function then serves as a strongly typed way to do partial application and get
 * back just the _mutation function_ responsible for changing the state. The mutation function
 * will take the form of:
 *
 * ```ts
 * const fn: (...args: P) => T = MutationFunction<T>()(mutationIdentity);
 * ```
 */
export function createMutationFunction<T extends any>(state: T) {
  return <M extends MutationIdentity<T, P>, P extends any[]>(mutationIdentity: M) => {
    return mutationIdentity(state);
  };
}
