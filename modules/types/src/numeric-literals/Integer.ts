export interface IntegerBrand { __brand: "integer" }

/**
 * **Integer**
 *
 * Represents an integer in the type system while the poor
 * old runtime just sees a number.
 *
 * **Related:** `toInteger()`, `isInteger()`
 */
export type Integer = number & IntegerBrand;
