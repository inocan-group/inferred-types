import { FullWidthQuotation, LeftDoubleMark, LeftHeavyDoubleTurned, LeftHeavySingleTurned, LeftReversedDoublePrime, LeftSingleMark, RightDoubleMark, RightHeavyDoubleTurned, RightHeavySingleTurned, RightReversedDoublePrime, RightSingleMark } from "./individual-smart-marks";

/**
 * **SmartMark**
 * 
 * Standard opening and closing smart quotation marks.
 * 
 * **Related:** `StandardMark`, `SmartMarkPlus`, `QuotationMark`,
 * `OpeningMark`, `ClosingMark`
 */
export type SmartMark = LeftDoubleMark  | RightDoubleMark | LeftSingleMark | RightSingleMark;

/**
 * **SmartMarkPlus**
 * 
 * Includes **all** "smart" quotation marks for both opening and
 * closing quotations.
 * 
 * ```md
 * common: “” | ‘’
 * specialized: 〝〞| ❛❜ | ❝❞ | 〟＂
 * ---
 * ```
 * 
 * **Related:** `SmartMark`, `StandardMark`, `QuotationMark`,
 * `OpeningMark`, `ClosingMark`
 */
export type SmartMarkPlus = SmartMark | LeftReversedDoublePrime | RightReversedDoublePrime | LeftHeavySingleTurned | RightHeavySingleTurned | LeftHeavyDoubleTurned | RightHeavyDoubleTurned | FullWidthQuotation;
