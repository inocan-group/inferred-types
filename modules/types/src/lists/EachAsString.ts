import type { AnyObject, AsString, ToJsonArray, ObjectToString } from "inferred-types/types";

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
                    ? ObjectToString<T[K]>
                    : T[K] extends readonly any[]
                        ? ToJsonArray<T[K]>
                        : T[K] extends Map<infer Key, infer Val>
                            ? `Map<${AsString<Key>},${AsString<Val>}>`
                            : "";
};
