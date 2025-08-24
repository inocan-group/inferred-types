import type {
    As,
    Container,
    Err,
    IsAny,
    IsNever,
    IsTuple,
    Keys,
    UnionMemberEquals,
} from "inferred-types/types";

type Validate<T extends Container> = [IsAny<T>] extends [true]
    ? Err<`invalid-type/values`, `Values<T> was called where T was the 'any' type`>
    : [IsNever<T>] extends [true]
        ? Err<`invalid-type/values`, `Values<T> was called where T was the 'never' type`>
        : T;

// Single-pass implementation with bounded recursion to avoid deep instantiation errors
type GetValues<
    TObj extends Container,
    TKeys extends readonly (PropertyKey | (PropertyKey | undefined))[],
    TAcc extends readonly unknown[] = [],
> = [] extends TKeys
    ? TAcc // Return what we have so far to avoid deep recursion error
    : Required<TKeys> extends readonly [infer First, ...infer Rest]
        ? First extends keyof TObj
            ? Rest extends readonly PropertyKey[]
                ? IsTuple<TObj[First]> extends true
                    ? UnionMemberEquals<TObj[First], undefined> extends true
                        ? GetValues<
                            TObj,
                            Rest,
                            [
                                ...TAcc,
                                TObj[First]?
                            ]
                        >
                        : GetValues<
                            TObj,
                            Rest,
                            [
                                ...TAcc,
                                TObj[First]
                            ]
                        >
                    : GetValues<
                        TObj,
                        Rest,
                        [
                            ...TAcc,
                            TObj[First]
                        ]
                    >
                : never
            : never
        : TAcc;

/**
 * **Values**`<T>`
 *
 * Produces a tuple of all the _values_ in an object.
 *
 * - you _can_ run it on a tuple too but this is in effect an identity
 * function and will just return the tuple's values/types "as is"
 * - passing in `any` or `never` to this utility will result in an Error
 */
export type Values<
    T extends Container,
> = As<
Validate<T> extends Error
    ? Validate<T>
    : Keys<T> extends readonly unknown[]
        ? number extends Keys<T>["length"]
            ? T extends Record<any, infer V>
                ? V[]
                : T extends readonly (infer V)[]
                    ? V[]
                    : unknown[]
            : GetValues<T, Keys<T>>
        : never,
    readonly unknown[]
>;
