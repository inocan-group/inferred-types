import { FluentApi } from "~/types";
import { MutationIdentity } from "../Mutation";
import { IdentityToMutationApi } from "./IdentityToMutationApi";
import { MakeFluentApi } from "./MakeFluentApi";

/* eslint-disable no-use-before-define */
/**
 * Adds an _unwrap_ function -- to an existing API `A` -- which returns
 * state of type `S`.
 */
export type Completed<A, S> = A & { unwrap: () => S };

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
>(validate: TypeGuard<TState>, apiDefinition: TApi) {
  // type guard and API established
  // return function to get current state and return builder API
  return <
    TCurrent extends Partial<TState>,
    TExclude extends string = "",
    TComplete extends boolean = TCurrent extends TState ? true : false
  >(
    state: TCurrent
  ) => {
    // provide state to higher order API to return mutation-based API
    const mutationApi = IdentityToMutationApi<Partial<TState>>(state)(apiDefinition);
    // convert to fluent API style where mutations return the API
    return MakeFluentApi<TState, TApi, TExclude, TComplete>(
      state,
      validate,
      apiDefinition
    )(mutationApi);
  };
}
