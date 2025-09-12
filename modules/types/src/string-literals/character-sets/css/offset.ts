import type { CssGlobal, CssRotation, CssSizing } from "inferred-types/types";

type NamedPosition = "bottom" | "top" | "left" | "right" | "center" | "auto" | "normal";

export type CssOffsetPosition
    = | `${NamedPosition} ${CssSizing | NamedPosition}${string}`
    | `${CssSizing}${string}`
    | CssGlobal;

export type CssOffsetPath
    = | `ray(${string})`
    | `url(${string})`
    | `circle(${string})`
    | `ellipse(${string})`
    | `polygon(${string})`
    | `path(${string})`
    | `rect(${string})`
    | `xywh(${string})`
    | CssGlobal;

export type CssOffsetDistance = "0" | CssSizing | CssGlobal;

export interface CssOffsetProperties {
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/offset) */
    "offset"?: string;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path) */
    "offset-path"?: CssOffsetPath;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance) */
    "offset-distance"?: CssOffsetDistance;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-position) */
    "offset-position"?: CssOffsetPosition;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-rotate) */
    "offset-rotate"?: CssRotation;
}
