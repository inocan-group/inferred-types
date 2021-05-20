import { MutationIdentity } from "../Mutation";
import { IdentityToMutationApi } from "./IdentityToMutationApi";
import { ProxyValidateAndEnrich } from "./ValidateAndEnrich";

/* eslint-disable no-use-before-define */
/**
 * A modifier type which indicates that some internal state has
 * achieved a _completed_ state and is ready to be _unwrapped_.
 */
export type Completed<T> = T & { unwrap: () => T };

/**
 * HOF which takes _state_ -- once it has been validated with a type guard -- and passes it
 * through
 */
export const markCompleted = <T extends { unwrap: never }>(state: T) => ({
  ...state,
  unwrap: () => state,
});

export const ApiFn = <S extends object>() => <P extends any[]>(f: (...args: P) => S) => f;

// export const BuilderFunction = <S extends object>(f: ((s: S) => <P extends any[]>(fn: ((...args: P) => S)))) => f

export type TypeGuard<T> = (thing: unknown) => thing is T;

/**
 * **Builder**
 *
 * Creates a builder pattern that provides a user-friendly (and strongly typed)
 * means of configuring a defined data structure.
 */
export function Builder<
  TState extends object,
  TApi extends { [key: string]: MutationIdentity<Partial<TState>, any> }
>(validate: TypeGuard<TState>, apiDefinition: TApi, state: Partial<TState> = {}) {
  // return Builder API to user
  return ProxyValidateAndEnrich<TState>(
    state,
    validate
  )(IdentityToMutationApi(state)(apiDefinition))();
}
