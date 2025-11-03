import type { HEXADECIMAL_CHAR } from "inferred-types/constants";
import type {
    Suggest,
} from "inferred-types/types";

/**
 * Valid hexadecimal character
 *
 * **Related:** `IsHexadecimal`, `Hexadecimal`, `SuggestHexadecimal`
 */
export type HexadecimalChar = typeof HEXADECIMAL_CHAR[number];

/**
 * A string suggestion for hexadecimal types
 */
export type SuggestHexadecimal = Suggest<"#FFFF" | "#CBDB">;
