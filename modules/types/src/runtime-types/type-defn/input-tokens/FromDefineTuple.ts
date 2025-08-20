import type {
    DefineObject,
    DefineTuple,
    FromInputToken__Object,
    FromInputToken__String,
    FromInputToken__Tuple,
    InputToken
} from "inferred-types/types";

export type FromDefineTuple<T extends readonly InputToken[]> = {
    [K in keyof T]: T[K] extends string
        ? FromInputToken__String<T[K]>
        : T[K] extends DefineObject
            ? FromInputToken__Object<T[K]>
            : T[K] extends DefineTuple
                ? FromInputToken__Tuple<T[K]>
                : never
};
