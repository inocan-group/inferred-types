import { Shape } from "inferred-types/dist/types/index";
import {  stripTrailing } from "src/runtime/index"

/**
 * **getTokenData**`(token)`
 *
 * Given a `Shape` token, this function will extract the
 * data parameters from the token.
 */
export const getTokenData = <T extends Shape>(token: T) => {
  const [_name, ...rest] = stripTrailing(token, ">>").split("::");

  return rest;
}
