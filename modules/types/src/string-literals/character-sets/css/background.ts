import type { CssColor, CssSizing, Suggest } from "inferred-types/types";

export interface CssBackgroundProperties {
    "background"?: string;
    "background-attachment"?: string;
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
