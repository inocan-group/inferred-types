import type { HasOptionalElements } from "types/boolean-logic";
import type { GetRequiredElementCount, SliceArray } from "types/lists";

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
