import type {

    SmartMark,
    SmartMarkPlus,
    StandardMark
} from "types/string-literals/character-sets/quotation-marks";

/**
 * **QuotationMark**
 *
 * Both standard quotation marks along with the most common
 * smart quotation marks:
 * ```md
 * standard: " | '
 * smart: “” | ‘’
 * ---
 * ```
 * **Related:** `QuotationMarkPlus`, `StandardMark`, `SmartMark`,
 * `OpeningMark`, `ClosingMark`
 */
export type QuotationMark = StandardMark | SmartMark;

/**
 * **QuotationMarkPlus**
 *
 * All quotation marks including:
 * ```md
 * standard: " | '
 * smart: “” | ‘’
 * specialized: 〝〞| ❛❜ | ❝❞ | 〟＂
 * ---
 * ```
 *
 * **Related:** `QuotationMarkPlus`, `StandardMark`, `SmartMark`,
 * `OpeningMark`, `ClosingMark`
 */
export type QuotationMarkPlus = StandardMark | SmartMarkPlus;
