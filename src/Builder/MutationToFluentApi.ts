/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-use-before-define */
import { MutationIdentity } from "~/Mutation";
import { FluentApi, ToFluent, Transformer, TypeGuard } from "~/types";
import { dictionaryTransform } from "~/utility";
import { Builder } from "./Builder";
import { MutationApi } from "./IdentityToMutationApi";

/**
 * Wraps a mutation function so that when a mutation function is called:
 *
 * 1. The mutation to state is completed, and then
 * 2. returns a new call to Builder to re-establish the fluent API
 * 
 * **Note:** one complication is that this fluent API must include not only
 * the fluent endpoints but the Escape endpoints as well.
 *
 * This function expects an API surface similar to this:
 *
 * ```ts
 * {
 *    foo: (a, b, c) => s,
 *    bar: () => s
 * }
 * ```
 *
 * and will return:
 *
 * ```ts
 * {
 *    foo: (a, b, c) => { FLUENT API },
 *    bar: () => { FLUENT API },
 *    unwrap: () => { STATE }
 * }
 * ```
 */
export function MutationToFluentApi<
  TState extends object,
  TApi extends { [key: string]: MutationIdentity<any, any> },
  TEscapeApi extends { [E in keyof TEscapeApi]: any },
  >(validate: TypeGuard<TState>, apiDefinition: TApi) {
  // receives the two API's and merges them
  return <TNewState extends Partial<TState>>(mutationApi: MutationApi<TApi>, escapeApi: TEscapeApi) => {
    // mutate internal state and then return fluent API
    const transform: Transformer<MutationApi<TApi>, ToFluent<MutationApi<TApi>, TEscapeApi>> = (i, k) => {
      const fn = i[k];
      return (...args: Parameters<typeof fn>) => {
        const newState = fn(args) as TNewState;

        return validate(newState)
          ? Builder(validate, apiDefinition)(newState)
          : Builder(validate, apiDefinition)(newState);
      };
    };

    return { ...dictionaryTransform(mutationApi, transform), ...escapeApi };
  };
}
