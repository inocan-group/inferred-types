/* eslint-disable no-use-before-define */
import { MutationIdentity } from "~/Mutation";

export function BuilderApi<T extends object>() {
  return function BuilderKeyValue<
    V extends MutationIdentity<PT, any>,
    K extends string,
    O extends Record<K, V>,
    PT extends T
  >(key: K, value: V): O {
    return { [key as K]: value } as O;
  };
}
