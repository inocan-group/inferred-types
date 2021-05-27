/* eslint-disable no-use-before-define */
import { MutationIdentity } from "~/Mutation";
import { FluentApi, ToFluent, Transformer } from "~/types";
import { dictionaryTransform } from "~/utility";
import { ConfiguredBuilder } from "./Builder";
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
 *    foo: (a,b,c) => { foo: ..., bar: ... },
 *    bar: () => { foo: ..., bar: ... }
 * }
 * ```
 */
export function MutationToFluentApi<
  TState extends object,
  TApi extends { [key: string]: MutationIdentity<Partial<TState>, any> },
  TEscapeApi extends { [E in keyof TEscapeApi]: any }
>(
  mutationApi: MutationApi<TApi>,
  escapeApi: TEscapeApi,
  builder: ConfiguredBuilder<TState, TApi, TEscapeApi>
) {
  // mutate internal state and then return fluent API
  const transform: Transformer<
    MutationApi<TApi>,
    FluentApi<ToFluent<MutationApi<TApi>, TEscapeApi>, TEscapeApi, "">
  > = (fn) => {
    return (...args: Parameters<typeof fn>) => {
      const newState = fn(args);
      return builder(newState);
    };
  };

  const fluent: FluentApi<
    ToFluent<MutationApi<TApi>, TEscapeApi>,
    TEscapeApi,
    ""
  > = dictionaryTransform(mutationApi, transform);

  const api: FluentApi<ToFluent<MutationApi<TApi>, TEscapeApi>, TEscapeApi> = {
    ...fluent,
    escapeApi,
  };

  return api;
}
