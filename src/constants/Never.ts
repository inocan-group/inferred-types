import { createConstant } from "inferred-types/dist/constants/index";

/**
 * **Never**
 *
 * A runtime constant that is meant to represent the `never` type.
 *
 * **Related:** you can use the `never()` runtime utility to give a
 * runtime value but force it's type to `never`.
 */
export const Never = createConstant("never") as never;
