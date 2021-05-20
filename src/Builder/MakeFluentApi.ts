/* eslint-disable unicorn/consistent-function-scoping */
import { MutationIdentity } from "~/Mutation";
import { MutationApi } from "~/Builder";
import { entries } from "~/utility";
import { FluentApi } from "~/types";
import { Builder, TypeGuard } from "./Builder";

/**
 * Use the type guard to validate whether the current configuration meets
 * the requirements for `TState` and if it does then add the `unwrap()`
 * function to the API to allow
 */
export function MakeFluentApi<
  TState extends object,
  TApiDefn extends { [key: string]: MutationIdentity<Partial<TState>, any> },
  TExclude extends string
>(state: Partial<TState>, validate: TypeGuard<TState>, apiDefinition: TApiDefn) {
  return <TMutApi extends MutationApi<{ [key: string]: MutationIdentity<Partial<TState>, any> }>>(
    // mutation api
    api: TMutApi
  ) => {
    const proxyApi: any = {};

    for (const [k, target] of entries(api)) {
      proxyApi[k] = (...args: any[]) => {
        state = target(args);

        return Builder<TState, TApiDefn>(validate, apiDefinition)<typeof state, TExclude>(state);
      };
    }

    return proxyApi as FluentApi<TMutApi>;
  };
}
