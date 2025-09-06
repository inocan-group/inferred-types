import type {
    As,
    AsString,
    Dictionary,
    ExplicitlyEmptyObject,
    IsWideObject,
    Join,
    Keys,
    KeyValue,
    Surround,
    ToKv
} from "inferred-types/types";

type Prefix<T extends boolean> = As<T extends true
    ? "\n  "
    : "", string>;

type Process<
    T extends readonly KeyValue[],
    E extends boolean,
> = Join<{
    [K in keyof T]: T[K]["key"] extends infer Key extends string
        ? `${Prefix<E>}${Key}: ${AsString<T[K]["value"]>}`
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
    TObj extends object,
    TExpand extends boolean = false,
> = Keys<TObj>["length"] extends 0
    ? "{}"
    : IsWideObject<TObj> extends true
        ? string
        : TObj extends ExplicitlyEmptyObject
            ? "{}"
            : Process<ToKv<As<TObj, Dictionary>>, false> extends infer P extends string
                ? Surround<
                    P,
                    TExpand extends false ? "{ " : "{",
                    TExpand extends false ? " }" : "\n}"
                >
                : never;
