import type { CssGlobal } from "inferred-types/types";

export type CssJustifyContent = "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "left"
    | "right"
    | "normal"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch"
    | "safe center"
    | "unsafe center"
    | CssGlobal;

type Positions = "stretch"
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "self-start"
    | "self-end"
    | "left"
    | "right"
    | "anchor-center"
    | "baseline"
    | "first baseline"
    | "last baseline"
    | "safe center"
    | "unsafe center"
    | "legacy left"
    | "legacy right"
    | "legacy center"
    | CssGlobal;

export type CssJustifyItems = Positions;

export type CssJustifySelf = Positions;

export interface CssJustifyProperties {
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) */
    "justify-content"?: CssJustifyContent;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items) */
    "justify-items"?: CssJustifyItems;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self) */
    "justify-self"?: CssJustifySelf;
}
