import type { Opt } from "inferred-types/types";
import type { CssColorLight } from "./color";
import type { CssSizingLight } from "./sizing";

export type CssOutlineColor = CssColorLight;

export type CssOutlineOffset = CssSizingLight;

export type CssOutlineStyle
    = | "auto"
    | "none"
    | "dotted"
    | "dashed"
    | "solid"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset";

export type CssOutlineWidth
    = | "thin"
    | "medium"
    | "thick"
    | CssSizingLight;

export type CssOutline
    = | `${CssOutlineStyle}${Opt<` ${CssColorLight}`>}`
    | `${CssOutlineWidth}${Opt<` ${CssOutlineStyle}`>}${string}`;

export interface CssOutlineProperties {
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/outline) */
    "outline"?: CssOutline;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color) */
    "outline-color"?: CssOutlineColor;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset) */
    "outline-offset"?: CssOutlineOffset;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style) */
    "outline-style"?: CssOutlineStyle;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width) */
    "outline-width"?: CssOutlineWidth;
}
