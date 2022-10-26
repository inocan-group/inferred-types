/**
 * **IsBooleanLiteral**
 *
 * Type utility which returns true/false if the boolean value is a _boolean literal_ versus
 * just the wider _boolean_ type.
 */
export type IsBooleanLiteral<T extends boolean> = boolean extends T ? false : true;
