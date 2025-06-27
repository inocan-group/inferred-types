import type {
    AfterFirst,
    As,
    Contains,
    Dictionary,
    First,
    IsObjectLiteral,
    Keys,
    KeyValue,
    ObjectKey,
    OptionalKeysTuple,
} from "inferred-types/types";

type Process<
    TObj extends Dictionary,
    TKeys extends readonly (ObjectKey & keyof TObj)[] = As<Keys<TObj>, readonly (keyof TObj & ObjectKey)[]>,
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
                ? {
                    key: First<TKeys>;
                    value: TObj[First<TKeys>];
                    required: false;
                }
                : {
                    key: First<TKeys>;
                    value: TObj[First<TKeys>];
                }
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
> = IsObjectLiteral<TObj> extends true
    ? As<Process<TObj>, readonly KeyValue[]>
    : KeyValue[];
