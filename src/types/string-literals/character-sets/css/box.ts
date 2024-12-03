import {  CssColorLight } from "./color";
import { CssGlobal } from "./global";
import { CssSizingLight } from "./sizing";

export type CssBoxAlign =
| "start"
| "center"
| "end"
| "baseline"
| "stretch"
| CssGlobal;

/**
 * [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break)
 */
export type CssBoxDecorationBreak =
| "slice"
| "clone"
| CssGlobal;

/** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) */
export type CssBoxShadow =
| "none"
| `inset ${string}${CssColorLight}`
| `${CssSizingLight}${string}${CssColorLight}`
| `${CssSizingLight}${string},${string}`
| CssGlobal;

/** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) */
export type CssBoxSizing =
| "border-box"
| "content-box"
| CssGlobal;


export type CssBoxProperties = {
  "box-decoration-break"?: CssBoxDecorationBreak;
  "box-shadow"?: CssBoxShadow;
  "box-sizing"?: CssBoxSizing;
}
