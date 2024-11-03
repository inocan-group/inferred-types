import type { WHITESPACE_CHARS } from "src/constants/index";

/**
 * **Whitespace**
 *
 * Characters typically representing "white space"
 *
 * **Related:** `OptWhitespace`
 */
export type Whitespace = typeof WHITESPACE_CHARS[number];

/**
 * Allows for a whitespace character (optionally)
 *
 * **Related:** `Whitespace`
 */
export type OptWhitespace = Whitespace | "";
