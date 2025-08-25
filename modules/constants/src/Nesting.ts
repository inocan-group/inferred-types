/**
 * A paired bracketing strategy which matches on
 * bracket characters:
 *
 * - parenthesis: `(` -> `)`
 * - square brackets: `[` -> `]`
 * - angle brackets: `<` -> `>`
 * - and curlies: `{` -> `}`
 */
export const BRACKET_NESTING = {
    "{": "}",
    "[": "]",
    "<": ">",
    "(": ")"
} as const;

/**
 * A paired bracketing strategy which includes the three
 * main quotation symbols:
 *
 * - single quote (**'**),
 * - double quote (**"**),
 * - and backtick (**`**)
 */
export const QUOTE_NESTING = {
    "\"": "\"",
    "'": "'",
    "`": "`"
} as const;

/**
 * A paired bracketing strategy which includes:
 *
 * - all bracket characters
 * - all quote characters
 */
export const BRACKET_AND_QUOTE_NESTING = {
    "{": "}",
    "[": "]",
    "<": ">",
    "(": ")",
    "\"": "\"",
    "'": "'",
    "`": "`"
} as const;
