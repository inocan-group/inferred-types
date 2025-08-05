import type {
    AfterFirst,
    As,
    Contains,
    Dictionary,
    First,
    IsLiteralLikeObject,
    Keys,
    KeyValue,
    ObjectKey,
    ObjectKeys,
    OptionalKeysTuple,
} from "inferred-types/types";

type Process<
    TObj extends Dictionary,
    TKeys extends readonly ObjectKey[],
    TOptional extends readonly ObjectKey[] = OptionalKeysTuple<TObj>,
    TKv extends readonly KeyValue[] = [],
> = [] extends TKeys
    ? TKv
    : Process<
        TObj,
        AfterFirst<TKeys>,
        TOptional,
        [
            ...TKv,
            Contains<TOptional, First<TKeys>> extends true
                ? KeyValue<First<TKeys>, TObj[First<TKeys>] | undefined, false>
                : KeyValue<First<TKeys>, TObj[First<TKeys>], true>
        ]
    >;

/**
 * **ToKv**`<TObj, [TKeys]>`
 *
 * Type utility which receives a Dictionary based object and converts
 * it to a tuple of `KeyValue` objects.
 *
 * ```ts
 * // [ {key: "id", value: 123 }, {key: "foo", value: "bar" } ]
 * type Arr = ToKv<{ id: 123, foo: "bar" }>;
 * ```
 *
 * **Related:** `KeyValue`, `FromKv`, `SortByKey`
 */
export type ToKv<
    TObj extends Dictionary
> = IsLiteralLikeObject<TObj> extends true
    ? Process<
        TObj,
        As<ObjectKeys<Required<TObj>>, readonly ObjectKey[]>
    >
    : KeyValue[];
