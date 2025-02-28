import type { CssGlobal } from "./global";
import type { CssSizing } from "./sizing";

type Overflow =
    | "visible"
    | "hidden"
    | "clip"
    | "scroll"
    | "auto";

/**
 * **CssOverflowX**
 *
 * a union of valid values for the **CSS** [`overflow-x`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) property.
 *
 * The overflow-x CSS property sets what shows when content overflows a
 * block-level element's left and right edges. This may be nothing, a
 * scroll bar, or the overflow content. This property may also be set
 * by using the overflow shorthand property.
 */
export type CssOverflowX = Overflow;

/**
 * **CssOverflowY**
 *
 * a union of valid values for the **CSS** [`overflow-y`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y) property.
 *
 * The overflow-y CSS property sets what shows when content overflows a
 * block-level element's top and bottom edges. This may be nothing, a
 * scroll bar, or the overflow content. This property may also be set
 * by using the overflow shorthand property.
 */
export type CssOverflowY = Overflow;

export type CssOverflowBlock = Overflow;
export type CssOverflowInline = Overflow;

export type CssOverflowAnchor = "auto" | "none";

/**
 * **CssOverflowClipMargin**
 *
 * a union of valid values for the **CSS** [`overflow-clip-margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin) property.
 *
 * The overflow-clip-margin CSS property determines how far outside
 * its bounds an element with overflow: clip may be painted before
 * being clipped. The bound defined by this property is called the
 * overflow clip edge of the box.
 */
export type CssOverflowClipMargin =
    | CssSizing
    | `content-box ${CssSizing}`
    | CssGlobal;

export interface CssOverflowProperties {
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) */
    "overflow"?: string;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor) */
    "overflow-anchor"?: CssOverflowAnchor | CssGlobal;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-block) */
    "overflow-block"?: CssOverflowBlock | CssGlobal;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin) */
    "overflow-clip-margin"?: string;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-inline) */
    "overflow-inline"?: CssOverflowInline | CssGlobal;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap) */
    "overflow-wrap"?: string;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) */
    "overflow-x"?: CssOverflowX | CssGlobal;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y) */
    "overflow-y"?: CssOverflowY | CssGlobal;
}
