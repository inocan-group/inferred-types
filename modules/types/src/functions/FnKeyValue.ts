import type {
    Expand,
    ObjectKey,
    TypedFunction,
} from "inferred-types/types";

type Process<
    T extends TypedFunction,
> = keyof T extends ObjectKey
    ? Pick<T, keyof T>
    : never;

/**
 * **FnKeyValue**`<T>`
 *
 * Return a dictionary of key/value pairs from a function. If no key/value
 * pairs are assigned to the function base then an empty object is returned.
 */
export type FnKeyValue<
    T extends TypedFunction,
> = Expand<Process<T>>;
