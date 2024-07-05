import { SimpleScalarToken, SimpleToken } from "src/types/runtime-types";

/**
 * **simpleToken**`(token)`
 *
 * Creates a `SimpleToken` which assured to be a valid type.
 */
export const simpleToken = <T extends SimpleToken>(token: T) => token;

/**
 * **simpleScalarToken**`(token)`
 *
 * Creates a `SimpleScalarToken` which assured to be a valid type.
 */
export const simpleScalarToken = <T extends SimpleScalarToken>(token: T) => token;


