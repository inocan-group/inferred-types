import type { Opt, OptPercent, Suggest } from "inferred-types/types";
import type { CssGlobal } from "./global";
import type { CssSizing, CssSizingLight } from "./sizing";
import type { CssTextWrap } from "./text";

export type CssOpacity = `${number}${OptPercent}`;

/**
 * **CssCursor**
 *
 * a union of valid values for the **CSS** `cursor` property.
 */
export type CssCursor = "help" | "wait" | "crosshair" | "zoom-in" | "grab" | "auto" | "default" | "none" | "context-menu" | "pointer" | "progress" | "cell" | "text" | "vertical-text" | "alias" | "copy" | "move" | "no-drop" | "not-allowed" | "grabbing" | "all-scroll" | "col-resize" | "row-resize" | "n-resize" | "e-resize" | "s-resize" | "w-resize" | "ne-resize" | "nw-resize" | "se-resize" | "sw-resize" | "eq-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "zoom-in" | "zoom-out";

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
export type CssFlexGrow = Suggest<"1" | "2" | "3" | CssGlobal>;

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
export type CssFlexFlow
    = | "row" | "row-reverse" | "column" | "column-reverse"
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
export type CssFlex
    = | "none"
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
export type CssFlexBasis
    = | "none"
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
export type CssListStyle
    = | "square"
    | "inside"
    | `url('${string}')`
    | "none"
    | "georgian inside"
    | "georgian outside"
    | `georgian inside url('${string}')`
    | `georgian outside url('${string}')`
    | CssGlobal;

export type CssRotation = "auto"
    | `${number}deg`
    | `auto ${number}deg`
    | "reverse"
    | `${number}turn`
    | CssGlobal;

export type CssLetterSpacing = "normal" | CssSizing | CssGlobal;

export type CssImageOrientation = "none" | "from-image" | CssGlobal;

/**
 * The image-rendering CSS property sets an image scaling algorithm. The property
 * applies to an element itself, to any images set in its other properties, and
 * to its descendants.
 */
export type CssImageRendering = "auto" | "crisp-edges" | "pixelated" | CssGlobal;

/**
 * The image-resolution CSS property specifies the intrinsic resolution of all raster
 * images used in or on the element. It affects content images such as replaced elements
 * and generated content, and decorative images such as background-image images.
 *
 * The image resolution is defined as the number of image pixels per unit length, e.g.,
 * pixels per inch. By default, CSS assumes a resolution of one image pixel per CSS px
 * unit; however, the image-resolution property allows a different resolution to be s
 * pecified.
 *
 * **NOTE:** this is an **experimental** browser feature
 */
export type CssImageResolution
    = | "from-image"
    | `${number}dpi`
    | `${number}dpi snap`
    | `from-image ${number}dpi`
    | `from-image ${number}dpi snap`;

type Punctuation
    = | "none"
    | "first"
    | "last"
    | "allow-end";

export type CssHangingPunctuation = Punctuation
    | `${Punctuation} ${Punctuation}`
    | `${Punctuation} ${Punctuation} ${Punctuation}`
    | CssGlobal;

export type CssFloat
    = | "none"
    | "left"
    | "right"
    | "inline-start"
    | "inline-end"
    | CssGlobal;

export type CssAppearance = "none" | "auto" | "menulist-button" | "textfield" | CssGlobal;

export type CssBackdropFilter = "none"
    | `blur(${CssSizing})`
    | `brightness(${number}%)`
    | `contrast(${number}%)`
    | `drop-shadow(${string})`
    | `grayscale(${number}%)`
    | `hue-rotate(${CssRotation})`
    | `invert(${number}%)`
    | `opacity(${number}%)`
    | `sepia(${number}%)`
    | `saturate(${number}%)`;

/** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/content) */
export type CssContent
    = | "normal"
    | "none"
    | "open-quote"
    | "close-quote"
    | "no-open-quote"
    | "no-close-quote"
    | `url(${string})`
    | `linear-gradient(${string})`
    | `image-set(${string})`
    | `counter(${string})`
    | `counters(${string})`
    | `attr(${string})`
    | `"${string}"`;

export type CssMixBlendMode
    = | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity"
    | "plus-darker"
    | "plus-lighter"
    | CssGlobal;

export type CssPerspectiveOrigin
    = | `${"left" | "center" | "right" | "top" | "bottom" | `${number}%`}`
    | `${"left" | "center" | "right"} ${"top" | "center" | "bottom"}`
    | `${"left" | "right"} ${number}% ${"top" | "bottom"} ${number}%`;

type Direction = "tb" | "lr" | "rl";

export type CssWritingMode
    = | `horizontal-${Direction}`
    | `vertical-${Direction}`
    | CssGlobal;

export type CssWordBreak
    = | "normal"
    | "break-all"
    | "keep-all"
    | "auto-phrase"
    | "break-word"
    | CssGlobal;

export type CssWhiteSpaceCollapse
    = | "collapse"
    | "preserve"
    | "preserve-breaks"
    | "preserve-spaces"
    | "break-spaces"
    | CssGlobal;

type _CssWhiteSpace
    = | "normal"
    | "nowrap"
    | "pre"
    | "pre-wrap"
    | "pre-line"
    | "break-spaces";

export type CssWhiteSpace
    = | _CssWhiteSpace
    | `${_CssWhiteSpace} ${CssTextWrap}`;

export type CssTiming = `${number}${"ms" | "s"}`;

export type CssPointerEvent
    = | "auto"
    | "none"
    | "visiblePainted"
    | "visibleFill"
    | "visibleStroke"
    | "visible"
    | "painted"
    | "fill"
    | "stroke"
    | "bounding-box"
    | "all";

export type CssTranslate
    = | "none"
    | `${CssSizingLight}${Opt<` ${CssSizingLight}`>}${string}`;
