import type {
    Dictionary,
    ExpandDictionary,
    ObjectKey,
    TupleToUnion,
} from "inferred-types/types";

type Process<
    TObj extends Dictionary,
    TKeys extends ObjectKey,
> = [] extends TKeys
    ? TObj
    : Omit<TObj, TKeys>;

/**
 * **WithoutKeys**`<TObj, TKeys>`
 *
 * Removes the keys in `TKeys` from an object `TObj`. This is
 * functionally equivalent to the `Omit<T,U>` built-in but rather than
 * taking a union type it takes an array of keys.
 */
export type WithoutKeys<
    TObj extends Dictionary,
    TKeys extends ObjectKey | readonly ObjectKey[],
> = TKeys extends readonly ObjectKey[]
    ? Process<
        TObj,
        TupleToUnion<TKeys>
    >
    : ExpandDictionary<Process<
        TObj,
        TKeys extends readonly ObjectKey[]
            ? TupleToUnion<TKeys>
            : TKeys
    >>;
