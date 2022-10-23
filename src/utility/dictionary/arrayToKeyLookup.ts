import { RequiredKeys } from "src/types/dictionary";

/**
 * Passing in an array of strings, you are passed back a dictionary with
 * all the keys being the strings and values set to `true`.
 * ```ts
 * // { bar: true, bar: true } as const;
 * const d - dictArr(arr);
 *
 * const fooBar = arrayToKeyLookup("foo", "bar");
 * ```
 */
export function arrayToKeyLookup<T extends readonly string[]>(...keys: T): Record<T[number], true> {
  const obj: Record<string, true> = {};

  for (const key of keys) {
    obj[key] = true;
  }

  return obj;
}

/**
 * converts an array of objects to a dictionary with keys formed from a given property
 * of the object and the value being the object itself.
 */
export const dictArr = <O extends Record<string, any>, T extends readonly O[]>(...dicts: T) => ({
  toLookup: <P extends keyof O>(prop: P) => {
    // const
  },
});

const arr = [
  { name: "foo", title: "foo" },
  { name: "bar", title: "bar" },
] as const;
type T1 = { name: string; title: string; color?: string; value: number };
type T2 = RequiredKeys<T1>;
const d = dictArr<T1>([
  { name: "foo", title: "foo", value: 320 },
  { name: "bar", title: "bar", value: 654 },
]).toLookup("");
