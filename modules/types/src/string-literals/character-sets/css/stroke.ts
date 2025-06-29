import type { Opt } from "../Optional";
import type { CssColorLight } from "./color";
import type { CssGlobal } from "./global";
import type { CssSizingLight } from "./sizing";

export type CssStroke = CssColorLight | CssGlobal;

export type CssStrokeDasharray = "none"
    | `${number}${Opt<`, ${number}`>}${Opt<`, ${number}`>}${Opt<`, ${number}${string}`>}`
    | `${number}${Opt<`, ${number}%`>}${Opt<`, ${number}%`>}${Opt<`, ${number}%${string}`>}`
    | `${number}${Opt<`, ${number}px`>}${Opt<`, ${number}px`>}${Opt<`, ${number}px${string}`>}`
    | CssGlobal;

export interface CssStrokeProperties {
    "stroke"?: CssStroke;
    "stroke-dasharray"?: CssStrokeDasharray;
    "stroke-dashoffset"?: string;
    "stroke-linecap"?: string;
    "stroke-linejoin"?: string;
    "stroke-miterlimit"?: `${number}` | CssGlobal;
    "stroke-opacity"?: CssSizingLight;
    "stroke-width"?: CssSizingLight;
}
