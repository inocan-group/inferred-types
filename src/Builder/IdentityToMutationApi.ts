import { MutationIdentity } from "~/Mutation";
import { entries } from "~/utility";

/**
 * Exposes a Mutation Function when provided a Mutation Identity HO function
 */
export type MutationApi<T extends Record<string, (s: any) => (...args: any[]) => any>> = {
  [P in keyof T]: ReturnType<T[P]>;
};

// { abc: s => (args1) => s,  }
// { abc: (args1) => s, }

/**
 * Converts a MutationIdentity dictionary API into a MutionApi once the
 * "state" is known.
 */
export function IdentityToMutationApi<TState extends object>(state: TState) {
  return function IdentityApi<TApi extends { [key: string]: MutationIdentity<TState, any> }>(
    identity: TApi
  ) {
    const api: any = {};

    for (const [k, v] of entries(identity)) {
      api[k] = v(state);
    }

    return api as MutationApi<TApi>;
  };
}
