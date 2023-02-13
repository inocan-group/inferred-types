import { createConstant } from "./createConstant";

/**
 * **COMMA**
 * 
 * A constant used for serializing a comma in cases
 * where a comma has special meaning (for instance 
 * CSV data where a raw comma is considered a 
 * separator)
 */
export const COMMA = createConstant("comma");

/**
 * **SerializedComma**
 * 
 * A serialized representation of a `,` value.
 */
export type SerializedComma = typeof COMMA;
