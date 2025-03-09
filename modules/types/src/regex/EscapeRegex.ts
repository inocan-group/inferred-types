import type { AsFromTo } from "inferred-types/types";

export type EscapeRegex = AsFromTo<{
    ".": "\\.";
    "*": "\\*";
    "+": "\\+";
    "?": "\\?";
    "^": "\\^";
    "$": "\\$";
    "{": "\\{";
    "}": "\\}";
    "(": "\\(";
    ")": "\\)";
    "|": "\\|";
    "[": "\\[";
    "]": "\\]";
    "\\": "\\\\";
}>;
