/* eslint-disable no-use-before-define */
import { MutationIdentity } from "~/Mutation";

export function BuilderApi<T extends object>() {
  return function BuilderKeyValue<
    V extends MutationIdentity<Partial<T>, P>,
    P extends any[],
    K extends string,
    O extends Record<K, V>
  >(key: K, value: V): O {
    return { [key as K]: value } as O;
  };
}
