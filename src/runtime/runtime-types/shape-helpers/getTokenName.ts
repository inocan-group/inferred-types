import { Shape } from "inferred-types/dist/types/index";
import { stripLeading } from "src/runtime/index"

/**
 * **getTokenName**`(token)`
 *
 * Given a `Shape` token, this function will extract the
 */
export const getTokenName = <T extends Shape>(token: T) => {
  const [name, ..._rest] = stripLeading(token, "<<").split("::");

  return name;
}
