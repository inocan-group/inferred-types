import { identity } from "~/utility";
import { Narrowable } from "~/types";
import { omit } from "native-dash";
import { keys } from "./keys";

export type ObjFilterCallback<T extends object> = (k: keyof T, state: T) => boolean;

/**
 * **dictFilter**
 * 
 * Provides a means ot filter down the properties on a given object.
 */
export function dictFilter<N extends Narrowable, T extends Record<string, N>>(obj: T, cb: ObjFilterCallback<T>) {

  return omit(obj, ...keys(obj).filter(k => cb(k, obj)));
}

const k = keys({ id: 1, color: "green", favorite: true }, ["favorite"]);
const f = dictFilter({ id: 1, color: "green", favorite: true }, (k, t) => {
  return typeof t[k] === "boolean";
});
