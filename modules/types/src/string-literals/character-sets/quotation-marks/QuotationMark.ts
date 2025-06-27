import type { SmartMark, SmartMarkPlus } from "./SmartMark";
import type { StandardMark } from "./StandardMark";

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
