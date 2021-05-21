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
  TExclude extends string = "",
  TComplete extends boolean = false
>(state: Partial<TState>, validate: TypeGuard<TState>, apiDefinition: TApiDefn) {
  const valid = validate(state);

  // return function for mutation API
  return <TMutApi extends MutationApi<{ [key: string]: MutationIdentity<Partial<TState>, any> }>>(
    // mutation api
    api: TMutApi
  ): FluentApi<TMutApi, TExclude, TComplete> => {
    const proxyApi: any = {};

    for (const [k, target] of entries(api)) {
      proxyApi[k] = (...args: any[]) => {
        // mutate state
        state = target(args);

        return validate(state)
          ? // completed state
            Builder<TState, TApiDefn>(validate, apiDefinition)(state)
          : // incomplete/partial state
            Builder<TState, TApiDefn>(validate, apiDefinition)(state);
      };
    }

    return valid
      ? { ...proxyApi, unwrap: () => state as TState }
      : {
          ...proxyApi,
          unwrap: () => {
            throw new Error(
              `Called unwrap() before state reached a valid completion state. Current value of state is:\n${JSON.stringify(
                state,
                null,
                2
              )}`
            );
          },
        };
  };
}
