import type { AnyObject, IsVueRef, UnionToTuple } from "inferred-types/types";

/**
 * **KeysUnion**`<T>`
 *
 * Creates a union type of all the _string_ keys in `T`.
 *
 * **Related:** `Keys`, `StringKeys`
 */
export type KeysUnion<T extends object> = {
    [K in keyof T]: K extends string ? Readonly<K> : never;
}[keyof T];

type _StringKeys<T extends AnyObject> = UnionToTuple<
    {
        [K in keyof T]: K extends string ? Readonly<K> : never;
    }[keyof T]
>;

/**
 * **SKeys**`<T>`
 *
 * Creates a tuple of all _string_ keys of `T`.
 *
 * **Related:** `Keys`, `StringKeys`
 * @deprecated prefer use of `StringKeys`
 */
export type SKeys<T extends AnyObject> = IsVueRef<T> extends true
    ? ["value"]
    : _StringKeys<T> extends readonly string[]
        ? _StringKeys<T>
        : never;

/**
 * **StringKeys**`<T>`
 *
 * Creates a tuple of all _string_ keys of `T`.
 *
 * **Related:** `Keys`
 */
export type StringKeys<T extends AnyObject> = IsVueRef<T> extends true
    ? ["value"]
    : _StringKeys<T> extends readonly string[]
        ? _StringKeys<T>
        : never;
