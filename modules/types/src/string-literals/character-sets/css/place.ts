import type {
    CssAlignContent,
    CssAlignItems,
    CssAlignSelf,
    CssGlobal,
    CssJustifyContent,
    CssJustifyItems,
    CssJustifySelf
} from "types/string-literals/character-sets/css";

export type CssPlaceContent = `${CssAlignContent} ${CssJustifyContent}`
    | CssAlignContent
    | CssGlobal;

export type CssPlaceItems = `${CssAlignItems} ${CssJustifyItems}`
    | CssAlignContent
    | CssGlobal;

export type CssPlaceSelf = `${CssAlignSelf} ${CssJustifySelf}`
    | CssAlignContent
    | CssGlobal;

export interface CssPlaceProperties {
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/place-content) */
    "place-content"?: CssPlaceContent;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items) */
    "place-items"?: CssPlaceItems;
    /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/place-self) */
    "place-self"?: CssPlaceSelf;
}
