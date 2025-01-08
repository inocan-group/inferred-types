import type { CssFontProperties, Suggest } from "inferred-types/types";
import type { CssAbsolutionPositioningProperties } from "./absolute";
import type { CssAlignProperties } from "./align";
import type { CssAnimationProperties } from "./animation";
import type { CssBackgroundProperties } from "./background";
import type { CssBorderProperties } from "./border";
import type { CssBoxProperties } from "./box";
import type { CssBreakProperties } from "./break";
import type { CssColor, CssColorLight } from "./color";
import type { CssAspectRatio, CssDisplay, CssPosition } from "./display-position";
import type { CssGlobal } from "./global";
import type { CssJustifyProperties } from "./justify";
import type { CssMarginProperties } from "./margin";
import type { CssObjectFit, CssObjectPosition } from "./object";
import type { CssOffsetProperties } from "./offset";
import type { CssOutlineProperties } from "./outline";
import type { CssOverflowProperties } from "./overflow";
import type { CssPaddingProperties } from "./padding";
import type { CssPlaceProperties } from "./place";
import type {
  CssAppearance,
  CssBackdropFilter,
  CssContent,
  CssCursor,
  CssFlex,
  CssFlexBasis,
  CssFlexDirection,
  CssFlexFlow,
  CssFlexGrow,
  CssFlexShrink,
  CssFloat,
  CssGap,
  CssHangingPunctuation,
  CssImageOrientation,
  CssImageRendering,
  CssImageResolution,
  CssLetterSpacing,
  CssListStyle,
  CssMixBlendMode,
  CssOpacity,
  CssPerspectiveOrigin,
  CssRotation,
  CssTranslate,
  CssWhiteSpace,
  CssWhiteSpaceCollapse,
  CssWordBreak,
  CssWritingMode,
} from "./props";
import type { CssSizing, CssSizingLight } from "./sizing";
import type { CssStrokeProperties } from "./stroke";
import type { CssTextProperties } from "./text";
import type { CssTransformProperties } from "./transform";

/**
 * **CssDefinition**
 *
 * Provides a means to define a CSS selector in a type strong manner.
 *
 * - each _key_ is a possible CSS property with a type definition provided to constrain it
 * - it is also indexed so that any property without a strong type definition can still be
 * added as a string value.
 */
export type CssDefinition = {
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance) */
  "appearance"?: Suggest<CssAppearance>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) */
  "backdrop-filter"?: Suggest<CssBackdropFilter>;
  /**
   * The valid values for the
   * [**display**](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
   * property in CSS.
   */
  "display"?: Suggest<CssDisplay>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/position) */
  "position"?: Suggest<CssPosition>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) */
  "aspect-ratio"?: Suggest<CssAspectRatio>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity) */
  "opacity"?: Suggest<CssOpacity>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) */
  "gap"?: Suggest<CssGap>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) */
  "flex"?: Suggest<CssFlex>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) */
  "flex-grow"?: Suggest<CssFlexGrow>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) */
  "flex-shrink"?: Suggest<CssFlexShrink>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) */
  "flex-direction"?: Suggest<CssFlexDirection>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow) */
  "flex-flow"?: Suggest<CssFlexFlow>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis) */
  "flex-basis"?: Suggest<CssFlexBasis>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/float) */
  "float"?: Suggest<CssFloat>;

  /**
   * a union of valid values for the **CSS** [`list-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style) property.
   *
   * The list-style CSS shorthand property allows you to set all the list style properties
   * at once.
   */
  "list-style"?: Suggest<CssListStyle>;

  /**
   * The block-size CSS property defines the horizontal or vertical size of an element's block,
   * depending on its writing mode. It corresponds to either the width or the height property,
   * depending on the value of writing-mode.
   *
   * If the writing mode is vertically oriented, the value of block-size relates to the width of
   * the element; otherwise, it relates to the height of the element. A related property is
   * inline-size, which defines the other dimension of the element.
   *
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size)
   */
  "block-size"?: Suggest<CssSizing>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-size) */
  "border-size"?: Suggest<CssSizing>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/content) */
  "content"?: Suggest<CssContent>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/color) */
  "color"?: Suggest<CssColor>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) */
  "cursor"?: Suggest<CssCursor | CssGlobal>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/height) */
  "height"?: Suggest<CssSizing>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/width) */
  "width"?: Suggest<CssSizing>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective) */
  "perspective"?: Suggest<CssSizingLight | "none" | CssGlobal>;
  "perspective-origin"?: Suggest<CssPerspectiveOrigin>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) */
  "mix-blend-mode"?: Suggest<CssMixBlendMode>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing) */
  "letter-spacing"?: Suggest<CssLetterSpacing>;
  /**
   * The lighting-color CSS property defines the color of the light source for the
   * <feDiffuseLighting> and <feSpecularLighting> SVG lighting filter primitives within an
   * SVG <filter>. If present, it overrides the element's lighting-color attribute.
   *
   * - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/lighting-color)
   */
  "lighting-color"?: Suggest<CssColor>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) */
  "object-fit"?: Suggest<CssObjectFit>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) */
  "object-position"?: Suggest<CssObjectPosition>;
  "order"?: Suggest<`${number}` | CssGlobal>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation) */
  "image-orientation"?: Suggest<CssImageOrientation>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering) */
  "image-rendering"?: Suggest<CssImageRendering>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/image-resolution) */
  "image-resolution"?: Suggest<CssImageResolution>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punction) */
  "hanging-punctuation"?: Suggest<CssHangingPunctuation>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height) */
  "min-height"?: Suggest<CssSizing>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) */
  "min-width"?: Suggest<CssSizing>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size) */
  "min-block-size"?: Suggest<CssSizing>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size) */
  "min-inline-size"?: Suggest<CssSizing>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/stop-color) */
  "stop-color"?: Suggest<CssColorLight | CssGlobal>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/stop-opacity) */
  "stop-opacity"?: Suggest<`${number}` | `${number}%` | CssGlobal>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size) */
  "tab-size"?: Suggest<`${number}` | CssSizingLight | CssGlobal>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) */
  "table-layout"?: Suggest<"auto" | "fixed" | CssGlobal>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/translate) */
  "translate"?: Suggest<CssTranslate | CssGlobal>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/quotes) */
  "quotes"?: Suggest<string>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/r) */
  "r"?: Suggest<CssSizingLight | CssGlobal>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) */
  "pointer-events"?: string;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/resize) */
  "resize"?: Suggest<"both" | "horizontal" | "vertical" | "none" | CssGlobal>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate) */
  "rotate"?: Suggest<CssRotation | `x ${CssRotation}` | `y ${CssRotation}` | `z ${CssRotation}` | CssGlobal>;
  "row-gap"?: Suggest<CssSizing>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/rx) */
  "rx"?: Suggest<CssSizing>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/ry) */
  "ry"?: Suggest<CssSizing>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/x) */
  "x"?: Suggest<CssSizing>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/y) */
  "y"?: Suggest<CssSizing>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) */
  "white-space"?: Suggest<CssWhiteSpace>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space-collapse) */
  "white-space-collapse"?: Suggest<CssWhiteSpaceCollapse>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/widows) */
  "widows"?: Suggest<string>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) */
  "will-change"?: Suggest<string>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break) */
  "word-break"?: Suggest<CssWordBreak>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing) */
  "word-spacing"?: Suggest<"normal" | CssSizing>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) */
  "writing-mode"?: Suggest<CssWritingMode>;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) */
  "z-index"?: Suggest<`${number}` | "auto" | CssGlobal>;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom) */
  "zoom"?: Suggest<`${number}` | `${number}%` | "normal" | "reset" | CssGlobal>;
}
& CssBorderProperties
& CssBackgroundProperties
& CssAbsolutionPositioningProperties
& CssOffsetProperties
& CssBreakProperties
& CssBoxProperties
& CssTextProperties
& CssStrokeProperties
& CssJustifyProperties
& CssAlignProperties
& CssPlaceProperties
& CssAnimationProperties
& CssMarginProperties
& CssPaddingProperties
& CssOutlineProperties
& CssOverflowProperties
& CssOffsetProperties
& CssTransformProperties
& CssFontProperties;
