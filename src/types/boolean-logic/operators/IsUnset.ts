import { Unset, IsEqual } from "inferred-types/types";


/**
 * **IsUnset**`<T>`
 *
 * Boolean operator which reports true/false on whether
 * `T` is the value `Unset`.
 */
export type IsUnset<T> = IsEqual<T,Unset>;
