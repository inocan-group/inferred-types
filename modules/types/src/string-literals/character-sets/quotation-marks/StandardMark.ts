/**
 * **SingleQuote**
 * 
 * Standard _non_-smart single quote mark.
 */
export type SingleQuote = `'`;

/**
 * **DoubleQuote**
 * 
 * Standard _non_-smart double quote mark.
 */
export type DoubleQuote = `"`;

/**
 * **StandardMark**
 * 
 * Either a single or double _non_-smart quotation mark
 * 
 * **Related:** `SmartMark`, `QuotationMark`
 */
export type StandardMark = SingleQuote | DoubleQuote;
