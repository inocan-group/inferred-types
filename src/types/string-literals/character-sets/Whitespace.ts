import type { WHITESPACE_CHARS } from "src/constants/index";
import { Mutable, TupleToUnion } from "src/types/index";

/**
 * **Whitespace**
 *
 * Characters typically representing "white space"
 *
 * **Related:** `OptWhitespace`
 */
export type Whitespace = TupleToUnion<Mutable<typeof WHITESPACE_CHARS>>;

/**
 * Allows for a whitespace character (optionally)
 *
 * **Related:** `Whitespace`
 */
export type OptWhitespace = Whitespace | "";
