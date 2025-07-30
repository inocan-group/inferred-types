import type {
    AfterFirst,
    AnyObject,
    Container,
    Dictionary,
    First,
    IsDictionary,
    IsObjectLiteral,
    Keys,
    ObjectKey,
    StringKeys,
} from "inferred-types/types";

type Process<
    TKeys extends readonly ObjectKey[],
    TObj extends Record<ObjectKey, unknown>,
    TResult extends readonly unknown[] = [],
> = [] extends TKeys
    ? TResult
    : Process<
        AfterFirst<TKeys>,
        TObj,
        [
            ...TResult,
            First<TKeys> extends keyof TObj
                ? TObj[First<TKeys>]
                : never,
        ]
    >;

type ProcessStr<
    TKeys extends readonly string[],
    TObj extends AnyObject,
    TResult extends readonly unknown[] = [],
> = [] extends TKeys
    ? TResult
    : Process<
        AfterFirst<TKeys>,
        TObj,
        [
            ...TResult,
            First<TKeys> extends keyof TObj
                ? TObj[First<TKeys>]
                : never,
        ]
    >;

/**
 * **Values**`<T>`
 *
 * Produces a tuple of all the _values_ in an object.
 */
export type Values<
    TObj extends Container,
> = TObj extends readonly unknown[]
    ? TObj
    : IsObject<TObj> extends true
        ?
        : ;


    // TObj extends Dictionary
    //     ? IsObjectLiteral<TObj> extends true
    //         ? [TOnlyStr] extends [true]
    //             ? ProcessStr<
    //                 StringKeys<TObj>,
    //                 TObj
    //             >

    //             : Process<
    //                 Keys<TObj> extends readonly ObjectKey[]
    //                     ? Keys<TObj>
    //                     : never,
    //                 TObj
    //             >
    //         : TObj extends Record<ObjectKey, infer Val>
    //             ? Val[]
    //             : never
    //     : never;
