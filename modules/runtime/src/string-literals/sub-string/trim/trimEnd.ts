import type { TrimEnd } from "inferred-types/types";

/**
 * **trimEnd**(input)
 *
 * A runtime utility which trims whitespace on the tailing/right side of a string
 * and returns a type-strong string literal where possible.
 */
export function trimEnd<T extends string>(input: T): TrimEnd<T> {
    return input.trimEnd() as TrimEnd<T>;
}
