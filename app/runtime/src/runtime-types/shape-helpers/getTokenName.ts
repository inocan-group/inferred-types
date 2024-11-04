import { Shape } from "@inferred-types/types";
import { stripLeading } from "@inferred-types/runtime"

/**
 * **getTokenName**`(token)`
 *
 * Given a `Shape` token, this function will extract the
 */
export const getTokenName = <T extends Shape>(token: T) => {
  const [name, ..._rest] = stripLeading(token, "<<").split("::");

  return name;
}
