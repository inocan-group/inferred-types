import type {
    AfterFirst,
    Container,
    Dictionary,
    First,
    IsWideObject,
    ObjectKeys,
} from "inferred-types/types";

type GetValues<
    TObj extends Dictionary,
    TKeys extends readonly unknown[],
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
    : T extends Dictionary
        ? IsWideObject<T> extends true
            ? T extends Record<PropertyKey, infer V>
                ? V[]  // For wide objects, return array of value type
                : unknown[]
            : ObjectKeys<T> extends readonly unknown[]
                ? GetValues<T,ObjectKeys<T>>
        : never;


type X = ObjectKeys<{foo: string; bar: number}>;
