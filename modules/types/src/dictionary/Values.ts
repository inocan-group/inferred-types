import type {
    AfterFirst,
    As,
    Container,
    First,
    IsObject,
    ObjectKeys,
} from "inferred-types/types";

type GetValues<
    TObj extends object,
    TKeys extends readonly PropertyKey[],
    TResult extends readonly unknown[] = []
> = [] extends TKeys
    ? TResult
    : GetValues<
        TObj,
        AfterFirst<TKeys>,
        First<TKeys> extends keyof TObj
            ? [ ...TResult, TObj[First<TKeys>] ]
            : never

    >;

/**
 * **Values**`<T>`
 *
 * Produces a tuple of all the _values_ in an object.
 *
 * - you _can_ run it on a tuple too but this is in effect an identity
 * function and will just return the tuple's values/types "as is"
 */
export type Values<
    T extends Container,
> = T extends readonly unknown[]
    ? T
    : IsObject<T> extends true
        ? GetValues<T, As<ObjectKeys<T>, readonly PropertyKey[]>>
        : never;
