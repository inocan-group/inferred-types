import type { Trim } from "inferred-types/types";

/**
 * **trim**(input)
 *
 * A runtime utility which trims whitespace on both sides of a string
 * and returns a type-strong string literal where possible.
 */
export function trim<T extends string>(input: T): Trim<T> {
    return input.trim() as Trim<T>;
}

