import { iterateDict } from "./iterateDict";

/**
 * **mapValues**
 * 
 * Maps over a dictionary, preserving the keys but allowing the values to be mutated.
 * 
 * ```ts
 * const colors = { red: 4, blue: 2, green: 3 };
 * // { red: 8, blue: 4, green: 6 }
 * const twoX = mapValues(colors, v => v * 2);
 * ```
 */
export function mapValues<T extends object, V>(obj: T, valueMapper: (k: T[keyof T]) => V) {
  return Object.fromEntries(
    [...iterateDict(obj)].map(([k, v]) => [k, valueMapper(v)])
  ) as { [K in keyof T]: V };
}