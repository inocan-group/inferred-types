import { OptPercent } from "../Optional";
import { CssGlobal } from "./global";
import { CssSizing } from "./sizing";


export type CssOpacity = `${number}${OptPercent}`

/**
 * **CssCursor**
 *
 * a union of valid values for the **CSS** `cursor` property.
 */
export type CssCursor = "help" | "wait" | "crosshair" | "zoom-in" | "grab" | "auto" | "default" | "none" | "context-menu" | "pointer" | "progress" | "cell" | "text" | "vertical-text" | "alias" | "copy" | "move" | "no-drop" | "not-allowed" | "grabbing" | "all-scroll" | "col-resize" | "row-resize" | "n-resize" |  "e-resize" | "s-resize" | "w-resize" | "ne-resize" | "nw-resize" | "se-resize" | "sw-resize" | "eq-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "zoom-in" | "zoom-out";


/**
 * **CssGap**
 *
 * a union of valid values for the **CSS** `gap` property.
 */
export type CssGap = CssSizing | `${CssSizing} ${CssSizing}` | CssGlobal;


/**
 * **CssFlexGrow**
 *
 * a union of valid values for the **CSS** `flex-grow` property.
 */
export type CssFlexGrow = number | CssGlobal;


/**
 * **CssFlexShrink**
 *
 * a union of valid values for the **CSS** `flex-shrink` property.
 */
export type CssFlexShrink = number | CssGlobal;


/**
 * **CssFlexDirection**
 *
 * a union of valid values for the **CSS** `flex-direction` property.
 */
export type CssFlexDirection = "row" | "row-reverse" | "column" | "column-reverse" | CssGlobal;


/**
 * **CssFlexFlow**
 *
 * A union of valid values for the **CSS** [`flex-flow`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow) property.
 *
 * The flex-flow CSS shorthand property specifies the direction of a flex container,
 * as well as its wrapping behavior.
 */
export type CssFlexFlow =
| "row" | "row-reverse" | "column" | "column-reverse"
| "nowrap" | "wrap" | "wrap-reverse"
| "row nowrap" | "column wrap" | "column-reverse wrap-reverse"
| CssGlobal;


/**
 * **CssFlex**
 *
 * a union of valid values for the **CSS** [`flex`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) property.
 *
 * The flex CSS shorthand property sets how a flex item will grow or shrink to fit
 * the space available in its flex container.
 */
export type CssFlex =
| "none"
| "min-content"
| "auto"
| `${CssSizing}`
| `${CssSizing} ${CssSizing}`
| `${CssSizing} ${CssSizing} ${number}${string}`
| CssGlobal;

/**
 * **CssFlexBasis**
 *
 * a union of valid values for the **CSS** [`flex-basis`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis) property.
 *
 * The flex-basis CSS property sets the initial main size of a flex item. It sets the size
 * of the content box unless otherwise set with box-sizing.
 */
export type CssFlexBasis =
| "none"
| "min-content"
| "auto"
| `${CssSizing}`
| `${CssSizing} ${CssSizing}`
| `${CssSizing} ${CssSizing} ${number}${string}`
| CssGlobal;


/**
 * **CssListStyle**
 *
 * a union of valid values for the **CSS** [`list-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style) property.
 *
 * The list-style CSS shorthand property allows you to set all the list style properties
 * at once.
 */
export type CssListStyle =
| "square"
| "inside"
| `url('${string}')`
| "none"
| "georgian inside"
| "georgian outside"
| `georgian inside url('${string}')`
| `georgian outside url('${string}')`
| CssGlobal;
