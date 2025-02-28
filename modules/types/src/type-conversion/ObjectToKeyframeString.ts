import type { AnyObject, AsString, ExplicitlyEmptyObject, IsWideContainer, Join, ObjectKey, ObjectToTuple, Surround } from "inferred-types/types";

type Prefix<T extends boolean> = T extends true
    ? "\n  "
    : "";

type Process<
    T extends readonly Record<ObjectKey, any>[],
    E extends boolean,
> = Join<{
    [K in keyof T]: T[K] extends Record<infer Key extends string, infer Value>
        ? Value extends AnyObject
            ? `${Prefix<E>}${Key} ${AsString<Value>}`
            : never
        : never
}, "\n  ">;

/**
 * **ObjectToKeyframeString**`<T>`
 *
 * Converts a Javascript object into a CSS Keyframe representation.
 *
 * **Related:** `ObjectToJsString`, `ObjectToJsonString`, `ObjectToTuple`, `ObjectToCssString`
 */
export type ObjectToKeyframeString<
    TObj extends AnyObject,
    TExpand extends boolean = false,
> = TObj extends ExplicitlyEmptyObject
    ? "{}"
    : IsWideContainer<TObj> extends true
        ? string
        : Surround<
            Process<ObjectToTuple<TObj, true>, false>,
            TExpand extends false ? "{ " : "{\n  ",
            TExpand extends false ? " }" : "\n}"
        >;
