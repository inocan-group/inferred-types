import type { DefineObject, FromDefineObject } from "inferred-types/types";

export function fromDefineObject<T extends DefineObject>(defn: T) {
  return defn as unknown as FromDefineObject<T>;
}
