import { AlphaNumericChar } from "../AlphaNumeric";
import { CommonHtmlElement, HtmlBodyElement } from "./html-element";

export type CssIdSelector = `#${string}${AlphaNumericChar}`;
export type CssClassSelector = `.${string}${AlphaNumericChar}`;
/**
 * A CSS Tag Selector.
 *
 * - acts as an alias to the `HtmlBodyElement` type.
 */
export type CssTagSelector = HtmlBodyElement;



/**
 * A CSS Selector.
 *
 * A union of `CssIdSelector`, `CssClassSelector`, and `CssTagSelector`.
 * However, because you might have a known set of Class selectors this
 * is exposed as a generic which you can use to narrow down the scope.
 */
export type CssSelector<
  T extends CssClassSelector = CssClassSelector
> = CssIdSelector | T | CssTagSelector;
