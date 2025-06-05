import type {
    AnyObject,
    ExplicitlyEmptyObject,
    IsWideContainer,
    Join,
    KeyValue,
    Surround,
    ToKv
} from "inferred-types/types";
import type { AsString } from "./AsString";

type Prefix<T extends boolean> = T extends true
    ? "\n  "
    : "";

type Process<
    T extends readonly KeyValue[],
    E extends boolean,
> = Join<{
    [K in keyof T]: T[K]["key"] extends string
        ? T[K]["value"] extends string
            ? `${Prefix<E>}${T[K]["key"]}: "${T[K]["value"]}"`
            : `${Prefix<E>}${T[K]["key"]}: ${AsString<T[K]["value"]>}`
        : T[K]["key"] extends symbol
            ? T[K]["value"] extends string
                ? `${Prefix<E>}[key: symbol]: "${T[K]["value"]}"`
                : `${Prefix<E>}[key: symbol]: ${AsString<T[K]["value"]>}`
        : never
}, ", ">;

/**
 * **ObjectToJsString**`<T>`
 *
 * Converts a Javascript object into a string representation.
 *
 * **Related:** `ObjectToCssString`, `ObjectToJsonString`, `ObjectToTuple`
 */
export type ObjectToJsString<
    TObj extends AnyObject,
    TExpand extends boolean = false,
> = TObj extends ExplicitlyEmptyObject
    ? "{}"
    : IsWideContainer<TObj> extends true
        ? string
        : `{ ${Process<ToKv<TObj>, TExpand>} }`;


