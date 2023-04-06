import { createConstant } from "src/constants";

/**
 * **NOT_DEFINED**
 * 
 * A runtime constant which indicates that some value has not been defined (yet).
 */
export const NOT_DEFINED = createConstant("not-defined");

export type NotDefined = typeof NOT_DEFINED;
