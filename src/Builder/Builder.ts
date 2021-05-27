import { FluentApi, ToFluent, Keys } from "~/types";
import { MutationIdentity } from "../Mutation";
import { IdentityToMutationApi, MutationToFluentApi, CreateFluentApi, MutationApi } from "./index";

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
 * A Builder with type-guard and API definition, returns a function to set
 * the _current state_ of the builder's internal configuration.
 */
export type ConfiguredBuilder<
  TState extends object,
  TApi extends { [key: string]: MutationIdentity<Partial<TState>, any> },
  TEscape extends { [E in keyof TEscape]: any }
> = (state: Partial<TState>) => FluentApi<ToFluent<MutationApi<TApi>, TEscape>, TEscape>;

/**
 * **Builder**
 *
 * Creates a builder pattern that provides a user-friendly (and strongly typed)
 * means of configuring a defined data structure.
 *
 * The _first_ function call establishes a type-guard to validate when the desired
 * configuration has been achieved as well as the fluent API surface that should
 * be used to configure this builder.
 *
 * The _second_ function call allows for setting an initial configuration state.
 *
 * **Example:**
 *
 * ```ts
 * // configure
 * type Config = { foo: number };
 * const typeGuard = (thing: unknown): thing is Config { ... };
 * const config = Builder(typeGuard, api)();
 * // use (and unwrap)
 * const myConfig = config.set(5).add(3).unwrap();
 * ```
 */
export function Builder<
  TState extends object,
  TApi extends { [key: string]: MutationIdentity<Partial<TState>, any> }
>(validate: TypeGuard<TState>, apiDefinition: TApi) {
  /**
   * The non-fluent API component of the Builder API
   */
  type IEscape = { unwrap: () => TState; current: Partial<TState> };

  const builder: ConfiguredBuilder<TState, TApi, IEscape> = <TCurrent extends Partial<TState>>(
    state: TCurrent
  ) => {
    const escapeApi: IEscape = {
      current: state,
      unwrap: () => {
        if (!validate(state)) {
          throw new Error(
            `Attempt to unwrap() the state prior to it being completed! The configuration at this point is:\n${JSON.stringify(
              state,
              null,
              2
            )}`
          );
        }
        return state;
      },
    };

    // provide state to identity functions to make them mutation functions
    const mutationApi = IdentityToMutationApi(state)(apiDefinition);
    // create a fluent API from both fluent endpoints and escape endpoints
    const fluentApi = MutationToFluentApi<TState, TApi, IEscape>(mutationApi, escapeApi, builder);

    return fluentApi;
  };

  return builder;
}
