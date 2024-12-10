import type { Shape } from "inferred-types/types";
import { stripLeading } from "src/literals";

/**
 * **getTokenName**`(token)`
 *
 * Given a `Shape` token, this function will extract the
 */
export function getTokenName<T extends Shape>(token: T) {
  const [name, ..._rest] = stripLeading(token, "<<").split("::");

  return name;
}
