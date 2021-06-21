/* eslint-disable no-use-before-define */
import { MutationIdentity } from "~/Mutation";

/**
 * Used to facilitate building **Identity APIs** to be used
 * in the `Builder` primitive.
 */
export function BuilderApi<T extends object>() {
  return function BuilderKeyValue<
    // identity function (s => fn => s)
    V extends MutationIdentity<PT, any>,
    // API property
    K extends string,
    // KV pair
    O extends Record<K, V>,
    /** Provide structure of Partial<T> while using extends to preserve type info */
    PT extends Partial<T>
  >(key: K, value: V): O {
    return { [key as K]: value } as O;
  };
}
