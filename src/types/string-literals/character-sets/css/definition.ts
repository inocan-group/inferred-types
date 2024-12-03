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
  appearance?: CssAppearance;
  "backdrop-filter"?: CssBackdropFilter;
  /**
   * The valid values for the
   * [**display**](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
   * property in CSS.
   */
  display?: CssDisplay;
  position?: CssPosition;
  "aspect-ratio"?: CssAspectRatio;
  opacity?: CssOpacity;
  overflowX?: CssOverflowX;
  overflowY?: CssOverflowY;
  gap?: CssGap;

  flex?: CssFlex;
  "flex-grow"?: CssFlexGrow;
  "flex-shrink"?: CssFlexShrink;
  "flex-direction"?: CssFlexDirection;
  "flex-flow"?: CssFlexFlow;
  "flex-basis"?: CssFlexBasis;

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
   */
  "block-size"?: CssSizing;

  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-size) */
  "border-size"?: CssSizing;

  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/content) */
  content?: CssContent;

  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/color) */
  color?: CssColor;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/height) */
  height?: CssSizing;
  width?: CssSizing;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective) */
  perspective?: CssSizingLight | "none" | CssGlobal;
  "perspective-origin"?: CssPerspectiveOrigin;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) */
  "mix-blend-mode": CssMixBlendMode;

  "letter-spacing"?: CssLetterSpacing;
  /**
   * The lighting-color CSS property defines the color of the light source for the
   * <feDiffuseLighting> and <feSpecularLighting> SVG lighting filter primitives within an
   * SVG <filter>. If present, it overrides the element's lighting-color attribute.
   *
   * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/lighting-color)
   */
  "lighting-color"?: CssColor;

  "object-fit"?: CssObjectFit;
  "object-position"?: CssObjectPosition;
  order?: `${number}` | CssGlobal;

  "image-orientation"?: CssImageOrientation;
  "image-rendering"?: CssImageRendering;
  "image-resolution"?: CssImageResolution;

  "hanging-punctuation"?: CssHangingPunctuation;

  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height) */
  "min-height"?: CssSizing;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width) */
  "min-width"?: CssSizing;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size) */
  "min-block-size"?: CssSizing;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size) */
  "min-inline-size"?: CssSizing;

  "stop-color"?: CssColorLight  | CssGlobal;
  "stop-opacity"?: `${number}` | `${number}%` | CssGlobal;

  "tab-size"?: `${number}` | CssSizingLight | CssGlobal;
  "table-layout"?: "auto" | "fixed" | CssGlobal;

  translate?: CssTranslate | CssGlobal;
  quotes?: string;
  r?: CssSizingLight | CssGlobal;

  "pointer-events"?: PointerEvent | CssGlobal;

  resize?: "both" | "horizontal" | "vertical" | "none" | CssGlobal;
  rotate?: CssRotation | `x ${CssRotation}` | `y ${CssRotation}` | `z ${CssRotation}` | CssGlobal;
  "row-gap"?: CssSizing;
  rx?: CssSizing;
  ry?: CssSizing;


  x?: CssSizing;
  y?: CssSizing;
  "white-space"?: CssWhiteSpace;
  "white-space-collapse"?: CssWhiteSpaceCollapse;
  "windows"?: string;
  "will-change"?: string;
  "word-break"?: CssWordBreak;
  "word-spacing"?: "normal" | CssSizing;
  "writing-mode"?: CssWritingMode;

  "z-index"?: `${number}` | "auto" | CssGlobal;
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

