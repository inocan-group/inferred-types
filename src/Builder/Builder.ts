import { TypeGuard } from "~/types";

import { MutationIdentity } from "../Mutation";
import { IdentityToMutationApi, MutationToFluentApi } from "./index";

/* eslint-disable no-use-before-define */

export type BuilderComplete<C, S> = C extends infer U ? (U extends S ? "" : "unwrap") : never;

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
  TApi extends { [key: string]: MutationIdentity<any, any> }
>(validate: TypeGuard<TState>, apiDefinition: TApi) {
  /**
   * The non-fluent API component of the Builder API
   */
  type IEscape<T extends object = {}> = { unwrap: () => TState; current: Partial<TState> } & T;

  return <TCurrent extends Partial<TState>>(state: TCurrent) => {
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
    // determine the exclusions
    type Complete = BuilderComplete<TCurrent, TState>;
    // transform mutation API to fluent API
    return MutationToFluentApi<TState, TApi, IEscape, Complete>(validate, apiDefinition)(mutationApi, escapeApi);
  };
}
