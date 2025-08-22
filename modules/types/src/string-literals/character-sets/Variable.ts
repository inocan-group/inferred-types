import type { AlphanumericChar } from "inferred-types/types";

/**
 * **VariableChar**
 *
 * Characters allowed in a variable name.
 *
 * **Related:** `PropertyChar`
 */
export type VariableChar = AlphanumericChar | "_" | ".";

/**
 * **VariableChar**
 *
 * Characters allowed as an object property name.
 *
 * **Related:** `VariableChar`
 */
export type PropertyChar = VariableChar | "-";
