import { Keys, Narrowable, UniqueForProp } from "src/types";
import { OptionalKeys, RequiredKeys } from "src/types/dictionary";

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

export interface Uniqueness<T> {
  /** boolean flag to indicate whether the property was unique across all records */
  isUnique: boolean;
  /** the overall number of records which contained the property */
  size: number;
  /** specifies if undefined values were encountered for this property */
  includedUndefined: boolean;
  /** the unique values for the property across all records */
  values: readonly T[];
}

export type DictArrApi<O extends Record<string, Narrowable>, A extends readonly O[]> = {
  length: number;
  toLookup<PL extends RequiredKeys<O, string> & keyof O & string>(
    prop: PL
  ): Record<UniqueForProp<A, PL>, O>;
  sum<PS extends RequiredKeys<O, number> | OptionalKeys<O, number>>(prop: PS): number;
  count<PC extends OptionalKeys<O>>(prop: PC): number;
  unique<PU extends Keys<O> & keyof O>(prop: PU): Uniqueness<O[PU]>;
};

/**
 * converts an array of objects to a dictionary with keys formed from a given property
 * of the object and the value being the object itself.
 */
export const dictArr = <T extends Record<string, Narrowable>>(...dicts: readonly T[]) => {
  // build API
  const api: DictArrApi<T, typeof dicts> = {
    length: dicts.length,
    toLookup: (prop) => {
      // type D = typeof dicts;
      // type TA = UniqueForProp<D, typeof prop>;
      let dict: Record<string, T> = {};
      for (const obj of dicts) {
        const key = obj[prop] as string;
        dict = { ...dict, [key]: obj };
      }
      return dict;
    },
    /**
     * The unique values of a given property
     */
    unique: (prop) => {
      type P = typeof prop;
      const v = new Set<O[P]>();
      dicts.forEach((i) => v.add(i[prop]));
      const size = dictArr(...dicts).count(prop as any);
      const values = Array.from(v);
      const u: Uniqueness<T[P]> = {
        isUnique: values.includes(undefined as any) ? size === v.size - 1 : size === v.size,
        includedUndefined: values.includes(undefined as any) ? true : false,
        size,
        values,
      };
      return u;
    },
    sum: (prop) => {
      return dicts.reduce((acc, obj) => (prop in obj ? acc + (obj[prop] as number) : acc), 0);
    },
    count: (prop) => {
      return dicts.reduce(
        (acc, obj) => (prop in obj && typeof obj[prop] !== "undefined" ? acc + 1 : acc),
        0
      );
    },
  };

  return api;
};
