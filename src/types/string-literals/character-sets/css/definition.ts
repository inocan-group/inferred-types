import { CssAbsolutionPositioningProperties } from "./absolute";
import { CssAlignProperties } from "./align";
import { CssAnimationProperties } from "./animation";
import { CssBackgroundProperties } from "./background";
import {  CssBorderProperties } from "./border";
import { CssBoxProperties } from "./box";
import { CssBreakProperties } from "./break";
import { CssColor, CssColorLight } from "./color";
import { CssAspectRatio, CssDisplay, CssPosition } from "./display-position"
import { CssGlobal } from "./global";
import { CssJustifyProperties } from "./justify";
import { CssMarginProperties } from "./margin";
import { CssObjectFit, CssObjectPosition } from "./object";
import { CssOffsetProperties } from "./offset";
import { CssOutlineProperties } from "./outline";
import { CssOverflowProperties, CssOverflowX, CssOverflowY } from "./overflow";
import { CssPaddingProperties } from "./padding";
import { CssPlaceProperties } from "./place";
import {
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
  CssWritingMode
} from "./props";
import { CssSizing, CssSizingLight } from "./sizing";
import { CssStrokeProperties } from "./stroke";
import { CssTextProperties } from "./text";
import { CssTransformProperties } from "./transform";


type _CssDefinition = {
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance) */
  appearance?: CssAppearance;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) */
  "backdrop-filter"?: CssBackdropFilter;
  /**
   * The valid values for the
   * [**display**](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
   * property in CSS.
   */
  display?: CssDisplay;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/position) */
  position?: CssPosition;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) */
  "aspect-ratio"?: CssAspectRatio;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity) */
  opacity?: CssOpacity;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) */
  gap?: CssGap;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) */
  flex?: CssFlex;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) */
  "flex-grow"?: CssFlexGrow;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) */
  "flex-shrink"?: CssFlexShrink;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) */
  "flex-direction"?: CssFlexDirection;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow) */
  "flex-flow"?: CssFlexFlow;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis) */
  "flex-basis"?: CssFlexBasis;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/float) */
  float?: CssFloat;

  /**
   * a union of valid values for the **CSS** [`list-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style) property.
   *
   * The list-style CSS shorthand property allows you to set all the list style properties
   * at once.
   */
  "list-style"?: CssListStyle;

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
  "block-size"?: CssSizing;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-size) */
  "border-size"?: CssSizing;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/content) */
  content?: CssContent;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/color) */
  color?: CssColor;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) */
  cursor?: CssCursor | CssGlobal;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/height) */
  height?: CssSizing;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/width) */
  width?: CssSizing;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective) */
  perspective?: CssSizingLight | "none" | CssGlobal;
  "perspective-origin"?: CssPerspectiveOrigin;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) */
  "mix-blend-mode": CssMixBlendMode;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing) */
  "letter-spacing"?: CssLetterSpacing;
  /**
   * The lighting-color CSS property defines the color of the light source for the
   * <feDiffuseLighting> and <feSpecularLighting> SVG lighting filter primitives within an
   * SVG <filter>. If present, it overrides the element's lighting-color attribute.
   *
   * - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/lighting-color)
   */
  "lighting-color"?: CssColor;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) */
  "object-fit"?: CssObjectFit;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) */
  "object-position"?: CssObjectPosition;
  order?: `${number}` | CssGlobal;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation) */
  "image-orientation"?: CssImageOrientation;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering) */
  "image-rendering"?: CssImageRendering;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/image-resolution) */
  "image-resolution"?: CssImageResolution;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punction) */
  "hanging-punctuation"?: CssHangingPunctuation;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height) */
  "min-height"?: CssSizing;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) */
  "min-width"?: CssSizing;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size) */
  "min-block-size"?: CssSizing;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size) */
  "min-inline-size"?: CssSizing;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/stop-color) */
  "stop-color"?: CssColorLight  | CssGlobal;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/stop-opacity) */
  "stop-opacity"?: `${number}` | `${number}%` | CssGlobal;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size) */
  "tab-size"?: `${number}` | CssSizingLight | CssGlobal;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) */
  "table-layout"?: "auto" | "fixed" | CssGlobal;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/translate) */
  translate?: CssTranslate | CssGlobal;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/quotes) */
  quotes?: string;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/r) */
  r?: CssSizingLight | CssGlobal;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) */
  "pointer-events"?: PointerEvent | CssGlobal;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/resize) */
  resize?: "both" | "horizontal" | "vertical" | "none" | CssGlobal;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate) */
  rotate?: CssRotation | `x ${CssRotation}` | `y ${CssRotation}` | `z ${CssRotation}` | CssGlobal;
  "row-gap"?: CssSizing;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/rx) */
  rx?: CssSizing;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/ry) */
  ry?: CssSizing;


  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/x) */
  x?: CssSizing;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/y) */
  y?: CssSizing;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) */
  "white-space"?: CssWhiteSpace;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space-collapse) */
  "white-space-collapse"?: CssWhiteSpaceCollapse;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/widows) */
  "widows"?: string;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) */
  "will-change"?: string;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break) */
  "word-break"?: CssWordBreak;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing) */
  "word-spacing"?: "normal" | CssSizing;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) */
  "writing-mode"?: CssWritingMode;

  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) */
  "z-index"?: `${number}` | "auto" | CssGlobal;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom) */
  "zoom"?: `${number}` | `${number}%` | "normal" | "reset" | CssGlobal;
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
& CssTransformProperties;

/**
 * **CssDefinition**
 *
 * Provides a means to define a CSS selector in a type strong manner.
 *
 * - each _key_ is a possible CSS property with a type definition provided to constrain it
 * - it is also indexed so that any property without a strong type definition can still be
 * added as a string value.
 */
export type CssDefinition = _CssDefinition | { [key: string]: string };

