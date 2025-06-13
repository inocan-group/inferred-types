import type {
    AnyObject,
    AsString,
    ExplicitlyEmptyObject,
    IsWideContainer,
    Join,
    KeyValue,
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
        ? T[K]["value"] extends string
            ? `${Prefix<E>}"${T[K]["key"]}": "${T[K]["value"]}"`
            : `${Prefix<E>}"${T[K]["key"]}": ${AsString<T[K]["value"]>}`
        : never
}, ", ">;

/**
 * **ObjectToJsonString**`<T>`
 *
 * Converts a Javascript object into a JSON string representation.
 *
 * **Related:** `ObjectToCssString`, `ObjectToJsString`, `ObjectToTuple`
 */
export type ObjectToJsonString<
    TObj extends AnyObject,
    TExpand extends boolean = false,
> = TObj extends ExplicitlyEmptyObject
    ? "{}"
    : IsWideContainer<TObj> extends true
        ? string
        : `{ ${Process<ToKv<TObj>, TExpand>} }`;
