import type { AnyMap, AnySet, AnyWeakMap, Dictionary, IsNull, IsUndefined } from "inferred-types/types";

export type BaseType<T> = T extends string
    ? string
    : T extends number
        ? number
        : IsNull<T> extends true
            ? null
            : IsUndefined<T> extends true
                ? undefined
                : T extends boolean
                    ? boolean
                    : T extends readonly unknown[]
                        ? readonly unknown[]
                        : T extends Dictionary
                            ? Dictionary
                            : T extends AnyMap
                                ? AnyMap
                                : T extends AnySet
                                    ? AnySet
                                    : T extends AnyWeakMap
                                        ? AnyWeakMap
                                        : unknown;
