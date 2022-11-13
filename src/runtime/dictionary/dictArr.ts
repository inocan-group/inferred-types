import { Keys, Narrowable, OptionalKeys, RequiredKeys, UniqueForProp } from "src/types";

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

export type DictArrApi<T extends Record<string, Narrowable>, A extends readonly T[]> = {
  length: number;
  toLookup<PL extends RequiredKeys<T, string> & keyof T & string>(
    prop: PL
  ): UniqueForProp<A, PL> extends string ? Record<UniqueForProp<A, PL>, T> : Record<string, T>;
  sum<PS extends RequiredKeys<T, number> | OptionalKeys<T, number>>(prop: PS): number;
  count<PC extends OptionalKeys<T>>(prop: PC): number;
  unique<PU extends Keys<T> & keyof T>(prop: PU): Uniqueness<T[PU]>;
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
      const v = new Set<T[P]>();
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
