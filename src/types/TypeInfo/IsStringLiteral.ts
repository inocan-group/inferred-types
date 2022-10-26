/**
 * **IsStringLiteral**
 *
 * Type utility which returns true/false if the string a _string literal_ versus
 * just the _string_ type.
 */
export type IsStringLiteral<T extends string> = string extends T ? false : true;
