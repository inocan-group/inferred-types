import { DefineObject, FromDefineObject } from "inferred-types/types";


export const fromDefineObject = <T extends DefineObject>(defn: T) => {
  return defn as unknown as FromDefineObject<T>;
}
