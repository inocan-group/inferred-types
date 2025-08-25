import type {
    As,
    Dictionary,
    EmptyObject,
    ExpandRecursively,
    MakeKeysOptional,
    ObjectKey,
    ObjectKeys,
    OptionalKeysTuple,
    PascalCase,
} from "inferred-types/types";

/* eslint-disable ts/no-unused-vars, unused-imports/no-unused-vars */

type Convert<
    T extends Dictionary,
    K extends readonly (ObjectKey & keyof T)[] = As<ObjectKeys<T>, readonly (ObjectKey & keyof T)[]>,
    O extends Dictionary = EmptyObject
> = K extends [infer Head extends ObjectKey & keyof T, ...infer Rest extends readonly (ObjectKey & keyof T)[]]
    ? Convert<
        T,
        Rest,
            O & (
                Head extends string
                    ? Record<As<PascalCase<Head>, string>, T[Head] extends Dictionary ? PascalKeys<T[Head]> : T[Head]>
                    : Record<Head, T[Head] extends Dictionary ? PascalKeys<T[Head]> : T[Head]>
            )
    >
    : ExpandRecursively<O>;

/**
 * **PascalKeys**`<T>`
 *
 * Converts an object's keys to the **PascalCase** equivalent
 * while keeping the values the same.
 */
export type PascalKeys<
    T extends Dictionary
> = Required<T> extends infer ReqDict extends Dictionary
    ? Convert<ReqDict> extends infer ReqDict extends Dictionary
        ? OptionalKeysTuple<T> extends infer OptKeys extends readonly ObjectKey[]
            ? {
                [K in keyof OptKeys]: OptKeys[K] extends string
                    ? PascalCase<OptKeys[K]>
                    : OptKeys[K]
            } extends infer OptKeys extends readonly ObjectKey[]
                ? MakeKeysOptional<ReqDict, OptKeys>
                : never
            : never
        : never
    : never;
