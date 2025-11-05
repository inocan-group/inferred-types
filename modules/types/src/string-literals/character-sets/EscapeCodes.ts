import {ESCAPE_CODE_CHARS} from "inferred-types/constants"

/**
 * Common Escape Code characters (ESC, BEL)
 */
export type EscapeCodeChars = typeof ESCAPE_CODE_CHARS[number];
