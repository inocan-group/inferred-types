import type {
    AnyObject,
    AsString,
    Dictionary,
    ExplicitlyEmptyObject,
    IsWideContainer,
    Join,
    Keys,
    KeyValue,
    ObjectKey,
    Or,
    Surround,
    ToKv
} from "inferred-types/types";

type Prefix<T extends boolean> = T extends true
    ? "\n  "
    : "";

type Process<
    T extends readonly KeyValue[],
    E extends boolean,
> = Join<{
    [K in keyof T]: T[K]["key"] extends string
        ? `${Prefix<E>}${T[K]["key"]}: ${AsString<T[K]["value"]>}`
        : never
}, "; ">;

/**
 * **ObjectToCssString**`<T>`
 *
 * Converts a Javascript object into a CSS representation.
 *
 * **Related:** `ObjectToJsString`, `ObjectToJsonString`, `ObjectToTuple`
 */
export type ObjectToCssString<
    TObj extends Dictionary,
    TExpand extends boolean = false,
> = Or<[
    TObj extends ExplicitlyEmptyObject ? true : false,
    Keys<TObj>["length"] extends 0 ? true : false
]> extends true
    ? "{}"
    : Surround<
            Process<ToKv<TObj>, false>,
            TExpand extends false ? "{ " : "{",
            TExpand extends false ? " }" : "\n}"
        >;
