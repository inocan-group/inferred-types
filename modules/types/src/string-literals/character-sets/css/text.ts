import type { Suggest, CssColorLight, CssGlobal, CssSizingLight } from "inferred-types/types";

export type CssTextAlign
    = | "start"
    | "end"
    | "center"
    | "left"
    | "right"
    | "justify"
    | "match-parent";

export type CssTextDecorationStyle
    = | "solid"
    | "double"
    | "dotted"
    | "dashed"
    | "wavy"
    | CssGlobal;

export type CssTextDecorationLine
    = | "none"
    | "underline"
    | "overline"
    | "line-through";

export type CssTextWrap
    = | "wrap"
    | "nowrap"
    | "balance"
    | "pretty"
    | "stable"
    | CssGlobal;

export type CssTextWrapMode = "wrap" | "nowrap" | CssGlobal;

export type CssTextWrapStyle = "auto" | "balance" | "stable" | CssGlobal;

type Indent = "each-line" | "hanging";

export type CssTextIndent = CssSizingLight
    | `${CssSizingLight} ${Indent}`
    | `${CssSizingLight} ${Indent} ${Indent}`
    | CssGlobal;

export type CssTextJustify
    = | "none"
    | "auto"
    | "inter-word"
    | "inter-character"
    | "distribute"
    | CssGlobal;

export type CssTextOrientation = "mixed" | "upright" | "sideways" | "sideways-right" | "use-glyph-orientation" | CssGlobal;

export type CssTextOverflow
    = | "clip"
    | "ellipsis"
    | `"${string}"`
    | CssGlobal;

export type CssTextRendering = "auto" | "optimizeSpeed" | "optimizeLegility" | "geometricPrecision" | CssGlobal;

export type CssTextTransform
    = | "none"
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "full-width"
    | "full-size-kana"
    | "math-auto"
    | CssGlobal;

export type CssTextPosition
    = | "auto"
    | "from-font"
    | "under"
    | "left"
    | "right"
    | "under left"
    | "under right"
    | "left under"
    | "right under";

export interface CssTextProperties {
    "text-align"?: CssTextAlign;
    "text-align-last"?: CssTextAlign;

    "text-decoration-line"?: CssTextDecorationLine
        | `${CssTextDecorationLine} ${CssTextDecorationLine}${string}`
        | CssGlobal;
    "text-decoration-color"?: Suggest<CssColorLight | CssGlobal>;
    "text-decoration-thickness"?: "auto" | "from-font" | CssSizingLight | CssGlobal;
    "text-decoration-style"?: CssTextDecorationStyle;
    "text-indent"?: Suggest<CssTextIndent>;
    "text-emphasis"?: string;
    "text-justify"?: Suggest<CssTextJustify>;
    "text-orientation"?: CssTextOrientation;
    "text-shadow"?: `${CssSizingLight}${string}${CssColorLight}` | CssGlobal;
    "text-transform"?: CssTextTransform;
    "text-underline-offset"?: "auto" | CssSizingLight | CssGlobal;
    "text-underline-position"?: CssTextPosition;
    /**
     * The text-overflow CSS property sets how hidden overflow content is signaled to users.
     * It can be clipped, display an ellipsis (…), or display a custom string.
     *
     * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
     */
    "text-overflow"?: CssTextOverflow;

    "text-rendering"?: CssTextRendering;

    "text-wrap"?: CssTextWrap;
    "text-wrap-mode"?: CssTextWrapMode;
    "text-wrap-style"?: CssTextWrapStyle;
}
