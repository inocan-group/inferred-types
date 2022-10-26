/**
 * **IsNumericLiteral**
 *
 * Type utility which returns true/false if the numeric value a _numeric literal_ versus
 * just the _number_ type.
 */
export type IsNumericLiteral<T extends number> = number extends T ? false : true;
