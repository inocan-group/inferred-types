import type { CssColor } from "./color";
import type { CssGlobal } from "./global";
import type { CssSizing } from "./sizing";

/**
 * CSS Border Styles
 * ([reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style))
 */
export type CssBorderStyle =
    | "none"
    | "hidden"
    | "dotted"
    | "dashed"
    | "solid"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset";

/**
 * CSS Border Width
 * ([reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width))
 */
export type CssBorderWidth =
    | "thin"
    | "medium"
    | "thick"
    | CssSizing;

export type CssBorderImageSource = `url(${string})`
    | `url(${string}) ${number}`
    | `url(${string}) ${number} space`
    | `linear-gradient(${string},${string}) ${number} / ${CssSizing}`
    | `url(${string}) ${number} ${number} / ${CssSizing} ${string} / ${string}`
    | CssGlobal;

/**
 * **CssBorderCollapse**
 *
 * The border-collapse CSS property sets whether cells inside a <table> have shared
 * or separate borders.
 *
 * - [reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse)
 */
export type CssBorderCollapse = "collapse" | "separate" | CssGlobal;

/**
 * The border-image-repeat CSS property defines how the edge regions and
 * middle region of a source image are adjusted to fit the dimensions of
 * an element's border image. The middle region can be displayed by using
 * the keyword "fill" in the border-image-slice property.
 */
export type CssBorderImageRepeat =
    | "stretch"
    | "repeat"
    | "round"
    | "space";

export type CssBorderInlineSizing = CssBorderStyle
    | CssSizing
    | `${CssSizing} ${CssBorderStyle}`
    | `${CssSizing} ${CssBorderStyle} ${string}`;

export type CssBorderProperties = {
    "border"?: string;
    /**
     * The border-spacing CSS property sets the distance between the borders of
     * adjacent cells in a <table>.
     * This property applies only when border-collapse is separate.
     */
    "border-spacing"?: CssSizing | `${CssSizing} ${string}`;
    "border-radius"?: CssSizing | `${CssSizing} ${string}`;
    "border-collapse"?: CssBorderCollapse;

    /**
     * Formats:
     *  - single
     *  - two: `[top & bottom,  left & right]`
     *  - three: `[top, left & right, bottom]`
     *  - four: `[top,  left,  right,  bottom]`
     */
    "border-style"?: CssBorderStyle
        | `${CssBorderStyle} ${CssBorderStyle}`
        | `${CssBorderStyle} ${CssBorderStyle} ${string}`;

    /**
     * Formats:
     *  - single
     *  - two: `[top & bottom,  left & right]`
     *  - three: `[top, left & right, bottom]`
     *  - four: `[top,  left,  right,  bottom]`
     */
    "border-width"?: CssBorderWidth
        | `${CssBorderWidth} ${string}`;

    "border-image"?: CssBorderImageSource;
    /**
     * The `border-image-outset` CSS property sets the distance by which an
     * element's border image is set out from its border box.
     *
     * The parts of the border image that are rendered outside the element's
     * border box with `border-image-outset` do not trigger overflow scrollbars
     * and don't capture mouse events.
     */
    "border-image-outset"?: CssSizing;
    /**
     * The border-image-repeat CSS property defines how the edge regions and
     * middle region of a source image are adjusted to fit the dimensions of
     * an element's border image. The middle region can be displayed by using
     * the keyword "fill" in the border-image-slice property.
     *
     * Format:
     *  - use once for all edges
     *  - use two -- `CssBorderImageRepeat` x 2 - for: `[ top & bottom, left & right ]`
     */
    "border-image-repeat"?: CssBorderImageRepeat
        | `${CssBorderImageRepeat} ${CssBorderImageRepeat}`;

    /**
     * The `border-image-slice` CSS property divides the image specified by
     * `border-image-source` into regions. These regions form the components
     * of an element's border image.
     *
     * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice)
     */
    "border-image-slice"?: `${number}` | `${number} fill`;
    "border-image-source"?: CssBorderImageSource | "none";

    /**
     * The `border-end-end-radius` CSS property defines a logical border
     * radius on an element, which maps to a physical border radius
     * that depends on the element's writing-mode, direction, and
     * text-orientation. This is useful when building styles to work
     * regardless of the text orientation and writing mode.
     */
    "border-end-end-radius"?: CssSizing;

    /**
     * The `border-end-start-radius` CSS property defines a logical border
     * radius on an element, which maps to a physical border radius depending
     * on the element's writing-mode, direction, and text-orientation. This is
     * useful when building styles to work regardless of the text orientation
     * and writing mode.
     */
    "border-end-start-radius"?: CssSizing;

    /**
     * Formats:
     *  - single
     *  - two: `[top & bottom,  left & right]`
     *  - three: `[top, left & right, bottom]`
     *  - four: `[top,  left,  right,  bottom]`
     */
    "border-color"?: CssColor
        | `${CssColor} ${string}`;
    /**
     * The border-block-color CSS property defines the color of the logical
     * block borders of an element, which maps to a physical border color
     * depending on the element's writing mode, directionality, and text
     * orientation
     */
    "border-block-color"?: CssColor;
    /**
     * The border-block-end-color CSS property defines the color of the logical
     * block-end border of an element, which maps to a physical border color
     * depending on the element's writing mode, directionality, and text orientation.
     */
    "border-block-end-color"?: CssColor;

    /**
     * The border-block-end-color CSS property defines the color of the logical
     * block-end border of an element, which maps to a physical border color
     * depending on the element's writing mode, directionality, and text
     * orientation.
     */
    "border-block-start-color"?: CssColor;

    /**
     * The border-inline CSS property is a shorthand property for setting
     * the individual logical inline border property values in a single place
     * in the style sheet.
     *
     * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline)
     */
    "border-inline"?: `${CssBorderWidth} ${string}`
        | `${CssColor} ${string}`
        | `${CssBorderStyle} ${string}`;

    "border-inline-style"?: CssBorderStyle;

    /**
     * The `border-inline-width` CSS property defines the width of the logical inline
     * borders of an element, which maps to a physical border width depending on the
     * element's writing mode, directionality, and text orientation. It corresponds to the
     * border-top-width and border-bottom-width, or border-left-width, and border-right-width
     * property depending on the values defined for writing-mode, direction, and text-orientation.
     *
     * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-width)
     */
    "border-inline-width"?: CssBorderWidth | `${CssBorderWidth} ${string}`;
    "border-inline-color"?: CssColor;

    "border-inline-start-style"?: CssBorderStyle;
    "border-inline-start-color"?: CssColor;
    "border-inline-start-width"?: CssBorderWidth;

    "border-inline-end-style"?: CssBorderStyle;
    "border-inline-end-color"?: CssColor;
    "border-inline-end-width"?: CssBorderWidth;

    "border-left"?: `${CssColor} ${string}`
        | `${CssBorderStyle} ${string}`
        | `${CssBorderWidth} ${string}`;
    "border-left-style"?: CssBorderStyle;
    "border-left-color"?: CssColor;
    "border-left-width"?: CssBorderWidth;
    "border-left-top-radius"?: CssSizing;
    "border-left-bottom-radius"?: CssSizing;

    "border-right"?: `${CssColor} ${string}`
        | `${CssBorderStyle} ${string}`
        | `${CssBorderWidth} ${string}`;
    "border-right-style"?: CssBorderStyle;
    "border-right-color"?: CssColor;
    "border-right-width"?: CssBorderWidth;
    "border-right-top-radius"?: CssSizing;
    "border-right-bottom-radius"?: CssSizing;

    "border-bottom"?: `${CssColor} ${string}`
        | `${CssBorderStyle} ${string}`
        | `${CssBorderWidth} ${string}`;
    "border-bottom-style"?: CssBorderStyle;
    "border-bottom-color"?: CssColor;
    "border-bottom-width"?: CssBorderWidth;

    "border-bottom-left-radius"?: CssSizing;
    "border-bottom-right-radius"?: CssSizing;

    "border-top"?: `${CssColor} ${string}`
        | `${CssBorderStyle} ${string}`
        | `${CssBorderWidth} ${string}`;
    "border-top-style"?: CssBorderStyle;
    "border-top-color"?: CssColor;
    "border-top-width"?: CssBorderWidth;
    "border-top-left-radius"?: CssSizing;
    "border-top-right-radius"?: CssSizing;

    /**
     * The `border-inline-end` CSS property is a shorthand property for setting the
     * individual logical inline-end border property values in a single place in
     * the style sheet.
     *
     * - [Refererence](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end)
     */
    "border-inline-end"?: CssBorderInlineSizing;
    /**
     * The `border-inline-start` CSS property is a shorthand property for setting the
     * individual logical inline-start border property values in a single place in
     * the style sheet.
     *
     * - [Refererence](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start)
     */
    "border-inline-start"?: CssBorderInlineSizing;

} | { [key: `border-${string}`]: string };
