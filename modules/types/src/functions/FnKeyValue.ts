import type {
    Expand,
    Mutable,
    ObjectKey,
    TypedFunction,
} from "inferred-types/types";

/**
 * Built-in function property keys which should NOT be treated as user props.
 */
type BuiltinFnKeys =
    | "arguments"
    | "caller"
    | "length"
    | "name"
    | "prototype"
    | "apply"
    | "call"
    | "bind"
    | "toString";

type Process<
    T extends TypedFunction,
> = Omit<Pick<T, Extract<keyof T, ObjectKey>>, BuiltinFnKeys>;

/**
 * **FnKeyValue**`<T>`
 *
 * Return a dictionary of key/value pairs from a function. If no key/value
 * pairs are assigned to the function base then an empty object is returned.
 */
export type FnKeyValue<
    T extends TypedFunction,
> = Expand<Mutable<Process<T>>>;
