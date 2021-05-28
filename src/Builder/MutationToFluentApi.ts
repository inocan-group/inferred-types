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
 * This function expects an API surface similar to this:
 *
 * ```ts
 * {
 *    foo: (a, b, c) => s
 *    bar: () => s
 * }
 * ```
 *
 * and will return:
 *
 * ```ts
 * {
 *    foo: (a, b, c) => { foo: ..., bar: ... },
 *    bar: () => { foo: ..., bar: ... }
 * }
 * ```
 */
export function MutationToFluentApi<
  TState extends object,
  TApi extends { [key: string]: MutationIdentity<any, any> },
  TEscapeApi extends { [E in keyof TEscapeApi]: any },
  TExclude extends string
>(validate: TypeGuard<TState>, apiDefinition: TApi) {
  return <R extends FluentApi<ToFluent<MutationApi<TApi>, TEscapeApi>, TEscapeApi>>(mutationApi: MutationApi<TApi>, escapeApi: TEscapeApi) => {
    // mutate internal state and then return fluent API
    const transform: Transformer<MutationApi<TApi>, R> = (i, k) => {
      const fn = i[k];
      return (...args: Parameters<typeof fn>) => {
        const newState = { ...fn(args) };

        return validate(newState)
          ? Builder(validate, apiDefinition)(newState)
          : Builder(validate, apiDefinition)(newState);
      };
    };

    const fluent = dictionaryTransform(mutationApi, transform);

    const api: FluentApi<ToFluent<MutationApi<TApi>, TEscapeApi>, TEscapeApi, TExclude> = {
      ...fluent,
      ...escapeApi,
    };

    return api;
  };
}
