import type { InputToken } from "inferred-types/types";

/**
 * A tuple who's elements are all `InputToken`'s
 *
 * - this type is meant to be used with utilities like
 * `FromDefineTuple`, `FromInputToken`, etc.
 */
export type DefineTuple = readonly InputToken[];
