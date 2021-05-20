/* eslint-disable unicorn/consistent-function-scoping */
import { MutationIdentity } from "~/Mutation";
import { TypeGuard, MutationApi } from "~/Builder";
import { entries } from "~/utility";

/**
 * Takes a Dictionary API and converts it into a Fluent API
 * where calls to mutation functions returns the same Mutation API
 */
export type FluentApi<T extends Record<string, (...args: any[]) => any>> = {
  [P in keyof T]: (...args: Parameters<T[P]>) => T;
};

export type FluentFn<A, F extends (...args: any[]) => any> = (...args: Parameters<F>) => A;

/**
 * Use the type guard to validate whether the current configuration meets
 * the requirements for `TState` and if it does then add the `unwrap()`
 * function to the API to allow
 */
export function ProxyValidateAndEnrich<TState extends object>(
  state: Partial<TState>,
  validate: TypeGuard<TState>
) {
  return <TApi extends MutationApi<{ [key: string]: MutationIdentity<Partial<TState>, any> }>>(
    // mutation api
    api: TApi
  ) => {
    const proxyApi: any = {};

    for (const [k, target] of entries(api)) {
      proxyApi[k] = (...args: any[]) => {
        state = target(args);
        return validate(state)
          ? ({ ...proxyApi, unwrap: () => state } as FluentApi<TApi>)
          : (proxyApi as FluentApi<TApi>);
      };
      // new Proxy(target, {
      //   apply: (mutationFn, _thisArg, args) => {
      //     // mutate the state
      //     state = mutationFn(args);
      //     // based on whether type guard validates state,
      //     // reflect back the API or the API plus unwrap function
      //     return validate(state)
      //       ? ({ ...proxyApi, unwrap: () => state } as FluentApi<TApi>)
      //       : (proxyApi as FluentApi<TApi>);
      //   },
      // };
    }

    return validate(state)
      ? ({ ...proxyApi, unwrap: () => state } as FluentApi<TApi>)
      : (proxyApi as FluentApi<TApi>);
  };
}
