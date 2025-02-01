import type { AnyObject, AsString, ToJsonValue } from "inferred-types/types";

export type EachAsString<
  T extends readonly unknown[],
> = {
  [K in keyof T]: T[K] extends string
    ? T[K]
    : T[K] extends number
      ? `${T[K]}`
      : T[K] extends boolean
        ? `${T[K]}`
        : T[K] extends AnyObject
          ? ToJsonValue<T[K]>
          : T[K] extends readonly any[]
            ? `Array(${T[K]["length"]} elements)`
            : T[K] extends Map<infer Key, infer Val>
              ? `Map<${AsString<Key>},${AsString<Val>}>`
              : "";
};
