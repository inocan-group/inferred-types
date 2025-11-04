import { HasOptionalElements } from "types/boolean-logic";
import { SliceArray } from "types/lists/Slice";
import { GetRequiredElementCount } from "types/lists/Variadic";

/**
 * **TakeRequiredElements**`<T>`
 *
 * Returns only the **required** elements in `T`.
 *
 * **Related:** `TakeOptionalElements`
 */
export type TakeRequiredElements<T extends readonly unknown[]> =
HasOptionalElements<T> extends true
? SliceArray<T, 0, GetRequiredElementCount<T>>
: T;


