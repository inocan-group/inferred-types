import type { ExplicitlyEmptyObject } from "./EmptyObject";

/**
 * **Empty**
 *
 * values/types considered to be "empty"
 */
export type Empty = undefined | null | ExplicitlyEmptyObject | [] | "";
