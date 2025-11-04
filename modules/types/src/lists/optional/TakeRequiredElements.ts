import type { HasOptionalElements } from "types/boolean-logic";
import type { SliceArray } from "types/lists/Slice";
import type { GetRequiredElementCount } from "types/lists/Variadic";

/**
 * **TakeRequiredElements**`<T>`
 *
 * Returns only the **required** elements in `T`.
 *
 * **Related:** `TakeOptionalElements`
 */
export type TakeRequiredElements<T extends readonly unknown[]>
    = HasOptionalElements<T> extends true
        ? SliceArray<T, 0, GetRequiredElementCount<T>>
        : T;
