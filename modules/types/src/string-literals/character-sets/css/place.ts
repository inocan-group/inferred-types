import { CssAlignContent, CssAlignItems, CssAlignSelf } from "./align"
import { CssGlobal } from "./global"
import { CssJustifyContent, CssJustifyItems, CssJustifySelf } from "./justify"


export type CssPlaceContent = `${CssAlignContent} ${CssJustifyContent}`
| CssAlignContent
| CssGlobal;

export type CssPlaceItems = `${CssAlignItems} ${CssJustifyItems}`
| CssAlignContent
| CssGlobal;

export type CssPlaceSelf = `${CssAlignSelf} ${CssJustifySelf}`
| CssAlignContent
| CssGlobal;


export type CssPlaceProperties = {
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/place-content) */
  "place-content"?: CssPlaceContent;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items) */
  "place-items"?: CssPlaceItems;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/place-self) */
  "place-self"?: CssPlaceSelf;
}
