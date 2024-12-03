import { CssGlobal } from "./global";

type Positions = | "normal"
| "start"
| "center"
| "end"
| "flex-start"
| "flex-end"
| "baseline"
| "first baseline"
| "space-between"
| "space-around"
| "space-evenly"
| "stretch"
| "safe center"
| "unsafe center"
| CssGlobal;

export type CssAlignContent = Positions;
export type CssAlignItems = Positions | "anchor-center";
export type CssAlignSelf = Positions | "anchor-center";

export type CssAlignProperties = {
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content) */
  "align-content"?: CssAlignContent;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) */
  "align-items"?: CssAlignItems;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self) */
  "align-self"?: CssAlignSelf;
}
