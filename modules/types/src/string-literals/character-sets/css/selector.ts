import type { AlphaChar, CssPseudoClass, CssPseudoClassDefn, HtmlBodyElement } from "types/string-literals";

export type CssIdSelector = `#${AlphaChar}${string}`;
export type CssClassSelector = `.${AlphaChar}${string}`;
/**
 * A CSS Tag Selector.
 *
 * - acts as an alias to the `HtmlBodyElement` type.
 */
export type CssTagSelector = HtmlBodyElement;

/**
 * **BareCssSelector**`<TId, TClass, TTag>`
 *
 * A CSS Selector.
 *
 * A strongly typed **CSS** _selector_ which allows for
 * the element selector (minus a pseudo class).
 *
 *
 * - `TId`, `TClass`, and `TTag` provide means to _narrow_ type
 * types of `CssIdSelector`'s, `CssClassSelector`'s, and
 * `CssTagSelectors` respectively
 *
 * **Related:**
 * - `CssSelector` _(adds typing for pseudo classes)_
 */
export type BareCssSelector<
    TId extends CssIdSelector = CssIdSelector,
    TClass extends CssClassSelector = CssClassSelector,
    TTag extends CssTagSelector = CssTagSelector,
> = TId | TTag | TClass;

/**
 * **CssSelector**`<[TId],[TClass],[TTag],[TPseudo]>`
 *
 * A strongly typed **CSS** _selector_.
 */
export type CssSelector<
    TId extends CssIdSelector = CssIdSelector,
    TClass extends CssClassSelector = CssClassSelector,
    TTag extends CssTagSelector = CssTagSelector,
    TPseudo extends CssPseudoClass = CssPseudoClass,
>
    = | TId | TClass | TTag
    | `${TId}${CssPseudoClassDefn<TPseudo>}`
    | `${TClass}${CssPseudoClassDefn<TPseudo>}`
    | `${TTag}${CssPseudoClassDefn<TPseudo>}`;
