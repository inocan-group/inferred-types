import type { StartsWith } from "types/boolean-logic";
import type { AfterFirst, First } from "types/lists";
import type { StripLeading } from "inferred-types/types";

/**
 * **StripFirst**`<T,U>`
 *
 * Strips the first element of `U` which is found at the HEAD
 * of `T`.
 *
 * ```ts
 * // "bar"
 * type Test = StripFirst<"foobar", ["bar", "baz", "foo"]>;
 * ```
 */
export type StripFirst<
    T extends string,
    U extends readonly string[]
> = [] extends U
    ? T
    : First<U> extends ""
        ? StripFirst<T, AfterFirst<U>>
        : StartsWith<T, First<U>> extends true
            ? StripLeading<T, First<U>>
            : StripFirst<T, AfterFirst<U>>;
