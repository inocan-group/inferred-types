import type { Opt } from "inferred-types/types";
import type {
    CssGlobal,
    CssRotation,
    CssSizingLight
} from "types/string-literals/character-sets/css";

export type CssTransform
    = | `matrix(${number}${Opt<`, ${number}${string}`>})`
    | `matrix3d(${number}${Opt<`, ${number}${string}`>})`
    | `perspective(${CssSizingLight})`
    | `rotate(${CssRotation})`
    | `rotate3d(${string})`
    | `rotateX(${CssRotation})`
    | `rotateY(${CssRotation})`
    | `rotateZ(${CssRotation})`
    | `translate(${CssSizingLight}, ${CssSizingLight})`
    | `translate3d(${CssSizingLight}, ${CssSizingLight})`
    | `translateX(${CssSizingLight})`
    | `translateY(${CssSizingLight})`
    | `translateZ(${CssSizingLight})`
    | `scale(${number}, ${number})`
    | `scale3d(${number}, ${number}, ${number})`
    | `scaleX(${number})`
    | `scaleY(${number})`
    | `scaleZ(${number})`
    | `rotate(${CssRotation})`
    | `skew(${CssRotation}, ${CssRotation})`
    | `skewX(${CssRotation})`
    | `skewY(${CssRotation})`;

export type CssTransformBox
    = | "content-box"
    | "border-box"
    | "fill-box"
    | "stroke-box"
    | "view-box";

export type CssTransformOrigin
    = | `${"left" | "center" | "right" | "top" | "bottom" | `${number}%`}`
    | `${"left" | "center" | "right" | `${number}%`} ${"top" | "center" | "bottom" | `${number}%`} ${CssSizingLight}`
    | `${"left" | "right" | "center"} ${"center" | "top" | "bottom"} ${CssSizingLight}`;

export type CssTransformStyle
    = | "flat"
    | "preserve-3d";

export interface CssTransformProperties {
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) */
    "transform"?: CssTransform | `${CssTransform} ${string}` | CssGlobal;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box) */
    "transform-box"?: CssTransformBox | CssGlobal;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin) */
    "transform-origin"?: CssTransformOrigin | CssGlobal;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style) */
    "transform-style"?: CssTransformStyle | CssGlobal;
}
