import { Keys, Length } from "~/types";

/**
 * Provides the _keys_ of an object with the `keyof T` made explicit.
 */
export function keys<T extends {}, W extends readonly string[]>(obj: T, ...without: W) {
  const v = without.length > 0
    ? Object.keys(obj).filter(k => !without.includes(k)) as unknown as Array<Exclude<keyof T, Keys<W>>>
    : Object.keys(obj) as unknown as Array<keyof T>;

  return v as unknown as Length<W> extends 0 ? Array<keyof T> : Array<Exclude<keyof T, Keys<W>>>;
}
