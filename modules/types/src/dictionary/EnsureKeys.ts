import type {
    AfterFirst,
    As,
    AsString,
    Dictionary,
    Err,
    Expand,
    First,
    IsWideObject,
    Keys,
    ObjectKey,
    IsDictionary
} from "inferred-types/types";

type BuildObj<
    TObj extends Dictionary,
    TEnsure extends readonly string[] | Dictionary,
    TType,
    TKey extends readonly ObjectKey[]
> = [] extends TKey
    ? TObj
    : First<TKey> extends keyof TObj
    // HAS KEY, VALIDATE TYPE
        ? TEnsure extends Dictionary
            ? First<TKey> extends keyof TEnsure
                ? TObj[First<TKey>] extends TEnsure[First<TKey>]
                    ? BuildObj<
                        TObj,
                        TEnsure,
                        TType,
                        AfterFirst<TKey>
                    >
                    : Err<
                    `invalid-type/${AsString<First<TKey>>}`,
                    `The key '${AsString<First<TKey>>}' on the originating object of EnsureKeys is not compatible with the type we are trying to ensure with.`,
                    {
                        fn: "EnsureKeys";
                        key: First<TKey>;
                        originType: TObj[First<TKey>];
                        ensureType: TEnsure[First<TKey>];
                    }
                    >
                : TObj[First<TKey>] extends TType
                    ? BuildObj<
                        TObj,
                        TEnsure,
                        TType,
                        AfterFirst<TKey>
                    >
                    : never

            : TObj[First<TKey>] extends TType
                ? BuildObj<
                    TObj,
                    TEnsure,
                    TType,
                    AfterFirst<TKey>
                >
                : Err<
                `invalid-type/${AsString<First<TKey>>}`,
                `The key '${AsString<First<TKey>>}' on the originating object does not extend the TType property set in EnsureKeys`,
                {
                    fn: "EnsureKeys";
                    key: First<TKey>;
                    originType: TObj[First<TKey>];
                    type: TType;
                }
                >

    // DOES NOT HAVE KEY, ADD
        : BuildObj<
            Expand<
        TObj
        & Record<
            First<TKey>,
            TEnsure extends readonly string[]
                ? TType
                : TEnsure extends Dictionary
                    ? First<TKey> extends keyof TEnsure
                        ? TEnsure[First<TKey>]
                        : never
                    : never
        >
            >,
            TEnsure,
            TType,
            AfterFirst<TKey>
        >;

/**
 * **EnsureKeys**`<TObj,TEnsure,[TType]>`
 *
 * Receives an object `TObj` and a specifier `TKeys` which
 * ensures that the specified _keys_ exist on the object.
 *
 * The _keys_ specifier may be either an array of keys or a dictionary of key/value pairs.
 *
 * - when _keys_ is a _dictionary_ then both the key and _type_ of that key
 * are inferred.
 * - otherwise, the optional `TType` (set to `unknown` by default) is used.
 */
export type EnsureKeys<
    TObj extends Dictionary,
    TEnsure extends readonly string[] | Dictionary,
    TType = unknown,
> = [IsWideObject<TObj>] extends [true]
    ? IsDictionary<TEnsure> extends true
        ? TEnsure
        : TEnsure extends readonly string[]
            ? Record<TEnsure[number], unknown>
            : never

    : TEnsure extends readonly string[]
        ? BuildObj<
            TObj,
            TEnsure,
            TType,
            TEnsure
        >

        : BuildObj<
            TObj,
            TEnsure,
            TType,
            As<Keys<TEnsure>, readonly ObjectKey[]>
        >;
