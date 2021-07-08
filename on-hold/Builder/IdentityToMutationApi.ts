import { MutationIdentity } from "~/Mutation";
import { iterateDict } from "~/utility";

/**
 * Exposes a Mutation Function when provided a Mutation Identity HO function
 */
export type MutationApi<T extends Record<string, (s: any) => (...args: any[]) => any>> = {
  [P in keyof T]: ReturnType<T[P]>;
};

/**
 * Converts an API surface of `MutationIdentity` functions into the same API surface
 * but the functions now are just mutation functions which have an enclosed reference
 * to the _state_ which is being managed.
 *
 * ```ts
 * {
 *    foo: s => (a, b, c) => s
 *    bar: s => () => s
 * }
 * ```
 *
 * is converted to
 *
 * ```ts
 * {
 *    foo: (a, b, c) => s
 *    bar: () => s
 * }
 * ```
 */
export function IdentityToMutationApi<TState extends object, TCurrent extends Partial<TState>>(
  state: TCurrent
) {
  return <TApi extends { [key: string]: MutationIdentity<any, any> }>(identity: TApi) => {
    const api: any = {};

    for (const [k, v] of iterateDict(identity)) {
      api[k] = v(state);
    }

    return api as MutationApi<TApi>;
  };
}
