import { AlphaChar, NumericChar } from 'inferred-types/types';

/**
 * **AlphanumericChar**
 *
 * A character which is either a letter (upper or lower) or a number.
 */
export type AlphanumericChar = AlphaChar | NumericChar;
