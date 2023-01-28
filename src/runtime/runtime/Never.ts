import { createConstant } from "src/types/constants";


/**
 * **Never**
 * 
 * A runtime constant that is meant to represent the `never` type.
 */
export const Never = createConstant("never") as never;
