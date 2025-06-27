import type { NON_BREAKING_SPACE } from "inferred-types/constants";

/** The Unicode codepoint for a non-breaking space */
export type NBSP = "\u00A0" & {
    [NON_BREAKING_SPACE]: "Unicode Non-Breaking Space";
};

export type NonBreakingSpace = "\u00A0";
