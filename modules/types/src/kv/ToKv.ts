import type {
    As,
    DefaultOptions,
    Dictionary,
    EmptyObject,
    Fallback,
    IndexOf,
    IsFalse,
    IsLiteralLikeObject,
    KeyValue,
    MergeObjects,
    ObjectKey,
    ObjectKeys,
    OptionalKeysTuple,
    SortOptions,
    UnionFilter,
} from "inferred-types/types";

export type ToKvOptions = MergeObjects<
    SortOptions, // offset will always be "key"
    {
        recurse?: number | boolean
    }
>

type Recurse<
    TVal,
    TOpt extends Required<ToKvOptions>
> = TVal extends Dictionary
? [IsFalse<TOpt["recurse"]>] extends [true]
    ? TVal
    : ToKv<TVal>
: TVal;

type Convert<
    TObj extends Dictionary,
    TKeys extends readonly ObjectKey[],
    TOpt extends Required<ToKvOptions>,
    TOptional extends readonly ObjectKey[] = OptionalKeysTuple<TObj>,
    TKv extends readonly KeyValue[] = [],
> = TKeys extends [infer Head extends ObjectKey, ...infer Rest extends ObjectKey[]]
? Head extends keyof TObj
    ? Head extends TOptional[number]
        ? Convert<
            TObj,
            Rest,
            TOpt,
            TOptional,
            [
                ...TKv,
                KeyValue<Head, Recurse<TObj[Head],TOpt> | undefined, false>
            ]
        >

        : Convert<
            TObj,
            Rest,
            TOpt,
            TOptional,
            [
                ...TKv,
                KeyValue<Head, Recurse<TObj[Head],TOpt>, true>
            ]
        >
    : never
: TKv;

type Options<T extends ToKvOptions> = {
    order: Fallback<T["order"], "natural">;
    start: Fallback<T["start"], []>;
    end: Fallback<T["end"], []>;
    offset: Fallback<T["offset"], "key">;
    recurse: Fallback<T["recurse"], false>;
} & Required<ToKvOptions>



/**
 * **ToKv**`<TObj, [TOpt]>`
 *
 * Type utility which receives a Dictionary based object and converts
 * it to a tuple of `KeyValue` objects.
 *
 * ```ts
 * // [ {key: "id", value: 123 }, {key: "foo", value: "bar" } ]
 * type Arr = ToKv<{ id: 123, foo: "bar" }>;
 * ```
 *
 * ### Options
 *
 * The optional second generic provides an object hash:
 *
 * 1. Sorting
 *
 *   - by default the "natural order" found in the dictionary is used to
 *   sort the resultant array
 *   - you can, however, "pin" keys to the start or end
 *   - you can also sort the keys in "asc" and "desc" order
 *      - if a sort `order` is provided other than the default of "natural",
 *      the symbol keys will be added to the start and then all string keys
 *      will be sorted in the order specified
 *   - all sorting functionality is provided by the `Sort<...>` utility
 *
 * 2. Depth
 *
 *    - by default the conversion of dictionary objects to an array is only done
 *    at the root level (e.g., values which are dictionaries are left as that type)
 *    - if you would like to _recurse_ into object values you can modify the
 *    `depth` property:
 *        - `true` will recurse infinitely
 *        - any numeric value will cap the depth of recursion to the specified depth
 *
 *
 * **Related:** `KeyValue`, `FromKv`, `toKeyValue()`, `fromKeyValue()`
 */
export type ToKv<
    TObj extends Dictionary,
    TOpt extends ToKvOptions = EmptyObject
> = IsLiteralLikeObject<TObj> extends true
    ? Convert<
        TObj,
        As<ObjectKeys<Required<TObj>>, readonly ObjectKey[]>,
        Options<TOpt>
    >
    : KeyValue[];
