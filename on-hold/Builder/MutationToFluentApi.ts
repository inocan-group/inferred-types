/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-use-before-define */
import { MutationIdentity } from "~/Mutation";
import { FluentApi, ToFluent, TypeGuard } from "~/types";
import { dictionaryTransform } from "~/utility";
import { Builder } from "./Builder";
import { MutationApi } from "./IdentityToMutationApi";

/**
 * Wraps a mutation API so that when a function is called:
 *
 * 1. The mutation to state is completed, and then
 * 2. returns a new call to Builder to re-establish the fluent API
 * 
 * Note: this also allows an `EscapeApi` to sit next to the fluent API
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
  TExclude extends string
>(validate: TypeGuard<TState>, apiDefinition: TApi) {
  // receives the two API's and merges them
  return (mutationApi: MutationApi<TApi>, escapeApi: TEscapeApi) => {
    // mutate internal state and then return fluent API
    type Api = FluentApi<ToFluent<MutationApi<TApi>, TEscapeApi>, TEscapeApi, any>;
    const fluent = dictionaryTransform<MutationApi<TApi>, Api>(mutationApi, (i, k) => {
      const fn = i[k];
      return <TNewState extends Partial<TState>>(...args: Parameters<typeof fn>) => {
        const newState = fn(args) as TNewState;

        // recurse back to Builder 
        return validate(newState)
          ? Builder(validate, apiDefinition)(newState)
          : Builder(validate, apiDefinition)(newState);
      };
    });

    return { ...fluent, escapeApi } as FluentApi<ToFluent<MutationApi<TApi>, TEscapeApi>, TEscapeApi, TExclude | "test">;
  };
}
