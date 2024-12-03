import { Opt } from "../Optional";
import { CssSizingLight } from "./sizing";

export type CssPadding = CssSizingLight
| `${CssSizingLight}, ${CssSizingLight}${Opt<`, ${CssSizingLight}`>}${string}`;

export type CssPaddingBlock = `${CssSizingLight}${Opt<`, ${CssSizingLight}`>}${string}`;;

export type CssPaddingBlockEnd = CssSizingLight;
export type CssPaddingBlockStart = CssSizingLight;

export type CssPaddingInline = `${CssSizingLight}${Opt<`, ${CssSizingLight}`>}${string}`;
export type CssPaddingInlineEnd = CssSizingLight;
export type CssPaddingInlineStart = CssSizingLight;

export type CssPaddingLeft = CssSizingLight;
export type CssPaddingRight = CssSizingLight;
export type CssPaddingTop = CssSizingLight;
export type CssPaddingBottom = CssSizingLight;

export type CssPaddingProperties = {
  padding?: CssPadding;
  "padding-block"?: CssPaddingBlock;
  "padding-block-end"?: CssPaddingBlockEnd;
  "padding-block-start"?: CssPaddingBlockStart;
  "padding-inline"?: CssPaddingInline;
  "padding-inline-end"?: CssPaddingInlineEnd;
  "padding-inline-start"?: CssPaddingInlineStart;
  "padding-left"?: CssPaddingLeft;
  "padding-right"?: CssPaddingRight;
  "padding-top"?: CssPaddingTop;
  "padding-bottom"?: CssPaddingBottom;
}
