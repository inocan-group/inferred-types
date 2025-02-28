import type {
    AfterFirst,
    AnyObject,
    As,
    First,
    IsObjectLiteral,
    Keys,
    KeyValue,
    ObjectKey,
} from "inferred-types/types";

type Process<
    TObj extends AnyObject,
    TKeys extends readonly (ObjectKey & keyof TObj)[],
    TKv extends readonly KeyValue[] = [],
> = [] extends TKeys
    ? TKv
    : Process<
        TObj,
        AfterFirst<TKeys>,
        [
            ...TKv,
            { key: First<TKeys>; value: TObj[First<TKeys>] },
        ]
    >;

/**
 * **ToKv**`<TObj, [TKeys]>`
 *
 * Type utility which receives an object and converts it to a tuple of `KeyValue`
 * objects.
 *
 * ```ts
 * // [ {key: "id", value: 123 }, {key: "foo", value: "bar" } ]
 * type Arr = ToKv<{ id: 123, foo: "bar" }>;
 * ```
 *
 * **Note:**
 * - you are converting from an **object** which has no official "natural sort order"
 * for the keys to an array which very much _does_ have a sort order
 * - by default we do provide you with a natural sort order and you can override this
 * if you like by passing in your own sort order into `TKeys`
 * - finally if you've heard enough about sort orders and want to take nuetral position
 * you can get a somewhat less strict tuple type by setting `TKeys` to `false`
 * - Ok ... _now that you're sorted_ ...
 *
 * **Related:** `KeyValue`, `FromKv`, `ObjectToTuple`, `TupleToObject`
 */
export type ToKv<
    TObj extends AnyObject,
    TKeys extends (readonly (ObjectKey & keyof TObj)[]) | false = As<Keys<TObj>, (readonly (ObjectKey & keyof TObj)[])>,
> = IsObjectLiteral<TObj> extends true
    ? TKeys extends readonly (ObjectKey & keyof TObj)[]
        ? Process<TObj, TKeys>
        : Array<
            { [K in keyof TObj]: { key: K; value: TObj[K] } }[keyof TObj]
        >
    : KeyValue[];
