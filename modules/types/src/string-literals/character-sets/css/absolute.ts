import type { CssSizing } from "inferred-types/types";

export interface CssAbsolutionPositioningProperties {

    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/top) */
    "top"?: CssSizing;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom) */
    "bottom"?: CssSizing;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/left) */
    "left"?: CssSizing;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/right) */
    "right"?: CssSizing;

    /**
     * The inset CSS property is a shorthand that corresponds to the top, right, bottom,
     * and/or left properties. It has the same multi-value syntax of the margin shorthand.
     *
     * This inset properties, including inset, have no effect on non-positioned elements.
     *
     * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset)
     */
    "inset"?: CssSizing | `${CssSizing} ${string}`;

    /**
     * The `inset-block` CSS property defines the logical block start and end offsets of an
     * element, which maps to physical offsets depending on the element's writing mode,
     * directionality, and text orientation. It corresponds to the top and bottom, or
     * right and left properties depending on the values defined for writing-mode, direction,
     * and text-orientation.
     *
     * This inset property has no effect on non-positioned elements.
     *
     * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block)
     */
    "inset-block"?: CssSizing | `${CssSizing} ${string}`;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-end) */
    "inset-block-end"?: CssSizing;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-start) */
    "inset-block-start"?: CssSizing;

    /**
     * The `inset-inline` CSS property defines the logical start and end offsets of an element
     * in the inline direction, which maps to physical offsets depending on the element's
     *
     * writing mode, directionality, and text orientation. It corresponds to the top and
     * bottom, or right and left properties depending on the values defined for writing-mode,
     * direction, and text-orientation.
     *
     * This inset property has no effect on non-positioned elements.
     *
     * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline)
     */
    "inset-inline"?: CssSizing | `${CssSizing} ${string}`;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-end) */
    "inset-inline-end"?: CssSizing;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-start) */
    "inset-inline-start"?: CssSizing;

}
