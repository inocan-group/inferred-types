import type { If, IsEqual, ObjectKey, RemoveIndexKeys, Filter, UnionToTuple } from "inferred-types/types";

type _Keys<T extends object> = UnionToTuple<keyof RemoveIndexKeys<T>> extends
readonly ObjectKey[]
    ? UnionToTuple<keyof RemoveIndexKeys<T>>
    : never;

type _Len<T extends object> = _Keys<T> extends ObjectKey[]
    ? _Keys<T>["length"]
    : 0;

type _Validate<T extends object> = "value" extends keyof T
    ? true
    : false;

/**
 * **IsVueRef**`<T>`
 *
 * Boolean type utility that detects whether the type passed in
 * is a VueJS `Ref<...>` type or this library's `VueRef<...>`
 * (which serves as a lightweight proxy type for Vue's `Ref`).
 */
export type IsVueRef<T> = T extends object
    ? If<
        IsEqual<_Len<T>, 0>,
        false,
        Filter<_Keys<T>, string>["length"] extends 1
            ? _Validate<T>
            : false
    >
    : false;
