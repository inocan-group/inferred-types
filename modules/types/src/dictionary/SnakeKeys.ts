import type {
    AfterFirst,
    As,
    Dictionary,
    EmptyObject,
    ExpandDictionary,
    ExpandRecursively,
    First,
    Keys,
    MakeKeysOptional,
    ObjectKey,
    ObjectKeys,
    OptionalKeysTuple,
    SnakeCase,
} from "inferred-types/types";

export type Convert<
    T extends Dictionary,
    K extends readonly (ObjectKey & keyof T)[] = As<ObjectKeys<T>, readonly (ObjectKey & keyof T)[]>,
    O extends Dictionary = EmptyObject
> = K extends [infer Head extends ObjectKey & keyof T, ...infer Rest extends readonly (ObjectKey & keyof T)[]]
        ? Convert<
            T,
            Rest,
            O & (
                Head extends string
                    ? Record<As<SnakeCase<Head>, string>, T[Head]>
                    : Record<Head, T[Head]>
            )
        >
    : ExpandRecursively<O>;

/**
 * Converts an object's keys to the **kebab-case** equivalent
 * while keeping the values the same.
 */
export type SnakeKeys<
    T extends Dictionary,
> = Required<T> extends infer ReqDict extends Dictionary
? Convert<ReqDict> extends infer ReqDict extends Dictionary
    ? OptionalKeysTuple<T> extends infer OptKeys extends readonly ObjectKey[]
        ? {
            [K in keyof OptKeys]: OptKeys[K] extends string
                ? SnakeCase<OptKeys[K]>
                : OptKeys[K]
        } extends infer OptKeys extends readonly ObjectKey[]
            ? MakeKeysOptional<ReqDict, OptKeys>
        : never
    : never
: never
: never;
