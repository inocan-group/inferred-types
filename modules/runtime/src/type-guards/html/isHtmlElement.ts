import { isObject } from "../isObject";

/**
 * **isHtmlElement**`(val)`
 *
 * Type guard which checks whether `val` is an `HtmlElement`.
 */
export function isHtmlElement(val: unknown): val is HTMLElement {
  return isObject(val) && "attributes" in val && "firstElementChild" in val && "innerHTML" in val;
}
