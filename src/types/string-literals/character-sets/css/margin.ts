import { Opt } from "../Optional";
import { CssSizingLight } from "./sizing";

export type CssMargin = CssSizingLight
| `${CssSizingLight}, ${CssSizingLight}${Opt<`, ${CssSizingLight}`>}${string}`;

export type CssMarginBlock = `${CssSizingLight}${Opt<`, ${CssSizingLight}`>}${string}`;;

export type CssMarginBlockEnd = CssSizingLight;
export type CssMarginBlockStart = CssSizingLight;

export type CssMarginInline = `${CssSizingLight}${Opt<`, ${CssSizingLight}`>}${string}`;
export type CssMarginInlineEnd = CssSizingLight;
export type CssMarginInlineStart = CssSizingLight;

export type CssMarginLeft = CssSizingLight;
export type CssMarginRight = CssSizingLight;
export type CssMarginTop = CssSizingLight;
export type CssMarginBottom = CssSizingLight;

export type CssMarginProperties = {
  margin?: CssMargin;
  "margin-block"?: CssMarginBlock;
  "margin-block-end"?: CssMarginBlockEnd;
  "margin-block-start"?: CssMarginBlockStart;
  "margin-inline"?: CssMarginInline;
  "margin-inline-end"?: CssMarginInlineEnd;
  "margin-inline-start"?: CssMarginInlineStart;
  "margin-left"?: CssMarginLeft;
  "margin-right"?: CssMarginRight;
  "margin-top"?: CssMarginTop;
  "margin-bottom"?: CssMarginBottom;
  "margin-trim"?: string;
}
