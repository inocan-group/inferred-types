import type { InputToken } from "types/runtime-types/type-defn/input-tokens/InputToken";

/**
 * A tuple who's elements are all `InputToken`'s
 *
 * - this type is meant to be used with utilities like
 * `FromDefineTuple`, `FromInputToken`, etc.
 */
export type DefineTuple = readonly InputToken[];
