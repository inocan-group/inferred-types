import { Unset, IsEqual } from "src/types/index";


/**
 * **IsUnset**`<T>`
 *
 * Boolean operator which reports true/false on whether
 * `T` is the value `Unset`.
 */
export type IsUnset<T> = IsEqual<T,Unset>;
