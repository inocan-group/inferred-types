import type {
    WHITESPACE_CHARS,
} from "inferred-types/constants";
import type { SpaceChars } from "inferred-types/types";

/**
 * **Whitespace**
 *
 * Characters typically representing "white space"
 *
 * **Related:** `OptWhitespace`, `WhitespaceAll`
 */
export type Whitespace = typeof WHITESPACE_CHARS[number];

/**
 * **WhitespaceAll**
 *
 * Characters typically representing "white space" (but also including
 * all variants of `SpaceChars` such as non-break spaces, em-space, etc.)
 *
 * **Related:** `WhiteSpace`, `OptWhitespace`
 */
export type WhitespaceAll = typeof WHITESPACE_CHARS[number] | SpaceChars;

/**
 * Allows for a whitespace character (optionally)
 *
 * **Related:**
 * - `Whitespace`, `WhitespaceAll`
 * - `OptWhitespaceAll`
 */
export type OptWhitespace = Whitespace | "";

/**
 * Allows for any whitespace character (optionally)
 *
 * **Related:**
 * - `WhitespaceAll`, `Whitespace`
 * - `OptWhitespace`
 */
export type OptWhitespaceAll = WhitespaceAll | "";
