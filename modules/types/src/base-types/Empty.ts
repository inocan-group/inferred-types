import type { ExplicitlyEmptyObject } from "inferred-types/types";

/**
 * **Empty**
 *
 * values/types considered to be "empty"
 */
export type Empty = undefined | null | ExplicitlyEmptyObject | [] | "";
