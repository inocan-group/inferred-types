import type { CssGlobal } from "./global";

export type CssBreak
    = | "auto"
    | "avoid"
    | "always"
    | "all"
    | "avoid-page"
    | "page"
    | "left"
    | "right"
    | "recto"
    | "verso"
    | "avoid-column"
    | "region"
    | CssGlobal;

export type CssBreakInside
    = | "auto"
    | "avoid"
    | "avoid-page"
    | "avoid-column"
    | "avoid-region"
    | CssGlobal;

export interface CssBreakProperties {
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/break-after) */
    "break-after"?: CssBreak;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/break-before) */
    "break-before"?: CssBreak;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside) */
    "break-inside"?: CssBreakInside;
}
