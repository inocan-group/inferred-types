import type { Dictionary, IsDictionary } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";

type ContainerType<T> = T extends any[]
    ? any[]
    : IsDictionary<T> extends true
        ? Dictionary
        : T extends Map<any, any>
            ? Map<any, any>
            : T extends Set<any>
                ? Set<any>
                : T extends WeakMap<any, any>
                    ? WeakMap<any, any>
                    : object;

export function isContainer<T>(value: T): value is T & ContainerType<T> {
    return !!(Array.isArray(value) || isDictionary(value));
}
