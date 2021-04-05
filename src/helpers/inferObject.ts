import { AppendToObject } from "../types";

export type InferredObject<T extends {}> = T extends infer R ? R & {} : {};

/** Given a structured run-time object, iterate over keys and append types */
export const inferObject = <T extends object>(v: T) => {
  let obj = v;

  Object.keys(v).forEach((key) => {
    const value = (v as any)[key];
    obj = fixup(v, key, value);
  });

  return obj;
};

function fixup<V, T extends object, K extends string = string>(obj: T, key: K, value: V) {
  return { ...obj, [key]: value } as AppendToObject<T, K, V>;
}
