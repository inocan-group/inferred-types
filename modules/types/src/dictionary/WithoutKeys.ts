import type {
    Dictionary,
    ExpandDictionary,
    ObjectKey
} from "inferred-types/types";

/**
 * **WithoutKeys**`<TObj, TKeys>`
 *
 * Removes the keys in `TKeys` from an object `TObj`.
 *
 * **Note:** This is functionally equivalent to the `Omit<T,U>` built-in but:
 *
 * - allows passing in a union type (like Omit)
 * - or a tuple of ObjectKey's (distinct from Omit).
 */
export type WithoutKeys<
    TObj extends Dictionary,
    TKeys extends ObjectKey | readonly ObjectKey[],
> = TKeys extends readonly ObjectKey[]
    ? Omit<
        TObj,
        TKeys[number]
    >
    : TKeys extends ObjectKey
        ? ExpandDictionary<
            Omit<TObj, TKeys>
        >
        : never;
