import type { FullWidthQuotation, RightDoubleMark, RightHeavyDoubleTurned, RightHeavySingleTurned, RightReversedDoublePrime, RightSingleMark, DoubleQuote, SingleQuote } from "inferred-types/types";

/**
 * **ClosingMark**
 *
 * Any standard quote mark along with standard closing "smart marks".
 *
 * **Related:** `OpeningMarkPlus`,`ClosingMark`
 */
export type ClosingMark = SingleQuote | DoubleQuote | RightSingleMark | RightDoubleMark;

/**
 * **ClosingMarkPlus**
 *
 * All opening marks including both generic single and double quotes, standard smart quotes and more specialized smart quotes.
 *
 * **Related:** `OpeningMark`,`ClosingMark`
 */
export type ClosingMarkPlus = SingleQuote | DoubleQuote | RightSingleMark | RightDoubleMark | RightReversedDoublePrime | RightHeavySingleTurned | RightHeavyDoubleTurned | RightReversedDoublePrime | FullWidthQuotation;
