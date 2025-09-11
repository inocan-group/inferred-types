import type { Abs } from "inferred-types/types"

/**
 * **abs**`(num) -> number`
 *
 * Get's the absolute value of `num` providing a literal type if possible.
 */
export function abs<T extends number>(num: T): Abs<T> {
    return (
        num < 0 ? num * -1 : num
    ) as Abs<T>;
}
