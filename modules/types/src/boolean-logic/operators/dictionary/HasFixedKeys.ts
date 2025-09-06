import { Dictionary, IsNever, ObjectKey, RemoveIndexKeys } from "inferred-types/types";


export type HasFixedKeys<
    T extends Record<ObjectKey, unknown>
> = T extends Record<infer K, infer V>
    ? IsNever<K> extends true
        ? false
    : keyof T extends PropertyKey
        ? "a"
        : Omit<T, string|symbol>
: never;

