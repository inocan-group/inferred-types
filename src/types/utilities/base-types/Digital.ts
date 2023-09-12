import { Digit, NumericChar, NumericSign } from "src/types";

/**
 * **Digital**
 * 
 * A Tuple which represents a number as leading `NumericSign` and then 
 * an array of numeric digits.
 * 
 * **Related:** `DigitalLiteral`
 */
export type Digital = [ 
  NumericSign, 
  readonly [Digit, ...Digit[]] 
];

/**
 * **DigitalLiteral**
 * 
 * A Tuple which represents a number as a leading `NumericSign` and
 * then an array of numeric string literals.
 * 
 * **Related:** `Digital`
 */
export type DigitalLiteral = [ 
  NumericSign, 
  readonly [`${NumericChar}`, ...`${NumericChar}`[]] 
];
