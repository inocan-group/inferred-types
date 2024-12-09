import type { FullWidthQuotation, LeftDoubleMark, LeftHeavyDoubleTurned, LeftHeavySingleTurned, LeftReversedDoublePrime, LeftSingleMark } from "./individual-smart-marks";
import type { DoubleQuote, SingleQuote } from "./StandardMark";

/**
 * **OpeningMark**
 *
 * Any standard quote mark along with standard opening "smart marks".
 *
 * **Related:** `OpeningMarkPlus`,`ClosingMark`
 */
export type OpeningMark = SingleQuote | DoubleQuote | LeftSingleMark | LeftDoubleMark;

/**
 * **OpeningMarkPlus**
 *
 * All opening marks including both generic single and double quotes, standard smart quotes and more specialized smart quotes.
 *
 * **Related:** `OpeningMark`,`ClosingMark`
 */
export type OpeningMarkPlus = SingleQuote | DoubleQuote | LeftSingleMark | LeftDoubleMark | LeftReversedDoublePrime | LeftHeavySingleTurned | LeftHeavyDoubleTurned | LeftReversedDoublePrime | FullWidthQuotation;
