import type { Suggest } from "inferred-types/types";
import type { CssColor } from "./color";
import type { CssSizing } from "./sizing";

export interface CssBackgroundProperties {
    "background"?: string;
    "background-attachement"?: string;
    "background-blend-mode"?: string;
    "background-clip"?: string;
    "background-color"?: Suggest<CssColor>;
    "background-image"?: string;
    "background-origin"?: string;
    "background-position"?: string;
    "background-position-x"?: string;
    "background-position-y"?: string;
    "background-repeat"?: string;
    "background-size"?: CssSizing;
}
