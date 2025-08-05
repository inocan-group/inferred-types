import type {
    AfterFirst,
    Container,
    Dictionary,
    Err,
    First,
    IsAny,
    IsNever,
    IsWideObject,
    ObjectKeys,
} from "inferred-types/types";

type GetValues<
    TObj extends Dictionary,
    TKeys extends readonly PropertyKey[],
    TValues extends readonly unknown[] = []
> = [] extends TKeys
    ? TValues
    : GetValues<
        TObj,
        AfterFirst<TKeys>,
        First<TKeys> extends keyof TObj
            ? [ ...TValues, TObj[First<TKeys>] ]
            : never
    >;

type Validate<T extends Container> = [IsAny<T>] extends [true]
? Err<`invalid-type/values`, `Values<T> was called where T was the 'any' type`>
: [IsNever<T>] extends [true]
? Err<`invalid-type/values`, `Values<T> was called where T was the 'never' type`>
: T

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
> = Validate<T> extends Error
? Validate<T>
: T extends readonly unknown[]
    ? T
: T extends Dictionary
    ? IsWideObject<T> extends true
        ? T extends Record<PropertyKey, infer V>
            ? V[]  // For wide objects, return array of value type
            : unknown[]
        : ObjectKeys<T> extends readonly PropertyKey[]
            ? GetValues<T,ObjectKeys<T>>
    : never
: never;


type X = Values<{foo: string; bar: number}>;
type Y = Values<Record<string,string>>;
type Z = Values<any>;
