import { Narrowable } from "~/types";
import { omit } from "native-dash";
import { keys } from "../keys";

export type ObjFilterCallback<T extends object, R extends boolean> = (k: keyof T, state: T) => R;

/**
 * **dictFilter**
 *
 * Provides a means ot filter down the properties on a given object.
 */
export function dictFilter<N extends Narrowable, T extends Record<string, N>, R extends boolean>(
  obj: T,
  cb: ObjFilterCallback<T, R>
) {
  const remove = keys(obj).filter((k) => !cb(k, obj));

  return omit(obj, ...keys(obj).filter((k) => !cb(k, obj))) as Exclude<T, typeof remove>;
}
