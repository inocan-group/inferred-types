import type { MARKED } from "inferred-types/constants";
import type {
    Dictionary,
    ExpandRecursively,
    Extends,
    If,
    IsEqual,
    RemoveMarked,
} from "inferred-types/types";

type Marked = typeof MARKED;

type Process<
    TObj extends Dictionary,
    TValue,
    TOp extends "equals" | "extends",
> = RemoveMarked<{
    [K in keyof TObj]: If<
        TOp extends "equals" ? IsEqual<TValue, TObj[K]> : Extends<TObj[K], TValue>,
        TObj[K],
        Marked
    >
}>;

/**
 * **WithValue**`<TObj,TValue>`
 *
 * Reduces an object's type down to only those key/value pairs where the
 * value is of type `W`.
 * ```ts
 * const foo = { a: 1, b: "hi", c: () => "hello" }
 * // { c: () => "hello" }
 * type W = WithValue<typeof foo, Function>
 * ```
 *
 * **Related:** `WithoutValue`, `WithKeys`, `WithoutKeys`
 */
export type WithValue<
    TObj extends Dictionary,
    TValue,
    TOp extends ("equals" | "extends") = "extends",
> = ExpandRecursively<
    Process<
        TObj,
        TValue,
        TOp
    >
>;
