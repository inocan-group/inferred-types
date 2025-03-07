import type {
    AfterFirst,
    AnyObject,
    Dictionary,
    First,
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
 *
 * - if you know you're only concerned with _string_ keys
 * (aka, not symbols) then you can switch the generic `TOnlyStr`
 * to true to get a slightly higher performing type inference.
 */
export type Values<
    TObj extends Dictionary | readonly unknown[],
    TOnlyStr extends boolean = false,
> = TObj extends readonly unknown[]
    ? TObj
    : TObj extends Dictionary
        ? IsObjectLiteral<TObj> extends true
            ? [TOnlyStr] extends [true]
                ? ProcessStr<
                    StringKeys<TObj>,
                    TObj
                >

                : Process<
                    Keys<TObj> extends readonly ObjectKey[]
                        ? Keys<TObj>
                        : never,
                    TObj
                >
            : TObj extends Record<ObjectKey, infer Val>
                ? Val[]
                : never
        : never;
