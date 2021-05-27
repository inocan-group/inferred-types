import { AppendToObject } from "../types";

export type InferredObject<T extends {}> = T extends infer R ? R & {} : {};

function fixup<V, T extends object, K extends string = string>(obj: T, key: K, value: V) {
  return { ...obj, [key]: value } as AppendToObject<T, K, V>;
}

/** Given a structured run-time object, iterate over keys and append types */
export const inferObject = <T extends object>(v: T) => {
  let obj = v;

  for (const key of Object.keys(v)) {
    const value = (v as any)[key];
    obj = fixup(v, key, value);
  }

  return obj;
};
