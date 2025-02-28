import type { ExpandDictionary, ExpandRecursively, FnProps } from "inferred-types/types";

/**
 * **EscapeFunction**`<[T]>`
 *
 * An escape function is a function which takes no parameters and
 * marks itself by setting the key `escape` to the value **true**.
 *
 * If this utility is used with a generic it will ensure that the function
 * has the `escape` property set. If no generic is used then it will just
 * present a generalized shape for escape functions.
 * ```ts
 * // () => string & {escape: true}
 * type Esc = EscapeFunction<() => string>;
 * // () => unknown & {escape: true}
 * type Esc2 = EscapeFunction;
 * ```
 */
export type EscapeFunction = () => any & { escape: true };

export type AsEscapeFunction<T> = T extends EscapeFunction
    ? ExpandRecursively<T & ExpandDictionary<Record<"escape", true> & FnProps<T>>>
    : never;
