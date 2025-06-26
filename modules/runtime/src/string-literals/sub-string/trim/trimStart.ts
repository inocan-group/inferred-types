import type { TrimStart } from "inferred-types/types";

/**
 * **trimStart**`(input)`
 *
 * A runtime utility which trims whitespace on the leading/left side
 * of a string and returns a type-strong string literal where possible.
 */
export function trimStart<T extends string>(input: T): TrimStart<T> {
    return input.trimStart() as TrimStart<T>;
}
