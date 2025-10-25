import { narrow } from "./utils/narrow";

/**
 * the named nested configuration defined in this repo
 */
export const KNOWN_NESTING_CONFIGURATIONS = narrow(
    "brackets",
    "quotes",
    "brackets-and-quotes",
    "shallow-brackets",
    "shallow-brackets-and-quotes",
    "shallow-quotes"
)

/**
 * A paired bracketing strategy which matches on
 * bracket characters:
 *
 * - parenthesis: `(` -> `)`
 * - square brackets: `[` -> `]`
 * - angle brackets: `<` -> `>`
 * - and curlies: `{` -> `}`
 */
export const BRACKET_NESTING = narrow(
    {
        "{": "}",
        "[": "]",
        "<": ">",
        "(": ")"
    }
);

/**
 * A paired bracketing strategy which includes the three
 * main quotation symbols:
 *
 * - single quote (**'**),
 * - double quote (**"**),
 * - and backtick (**`**)
 */
export const QUOTE_NESTING = narrow({
    "\"": "\"",
    "'": "'",
    "`": "`"
});

/**
 * A paired bracketing strategy which includes:
 *
 * - all bracket characters
 * - all quote characters
 */
export const BRACKET_AND_QUOTE_NESTING = narrow({
    ...BRACKET_NESTING,
    ...QUOTE_NESTING
});

/**
 * **Shallow Bracket Nesting**
 *
 * A hierarchical nesting configuration where bracket characters
 * are recognized at level 0, but inside brackets no further
 * nesting is recognized (empty config `{}`).
 *
 * This prevents "unbalanced" errors in utilities that only
 * care about the root level.
 */
export const SHALLOW_BRACKET_NESTING = narrow({
    "(": { exit: ")", children: {} },
    "[": { exit: "]", children: {} },
    "{": { exit: "}", children: {} },
    "<": { exit: ">", children: {} }
});

/**
 * **Shallow Quote Nesting**
 *
 * A hierarchical nesting configuration where quote characters
 * are recognized at level 0, but inside quotes no further
 * nesting is recognized (empty config `{}`).
 *
 * This allows treating quoted content as literals, preventing
 * split characters inside quotes from being recognized.
 */
export const SHALLOW_QUOTE_NESTING = narrow({
    "\"": { exit: "\"",children:  {}},
    "'":  { exit: "'", children: {}},
    "`":  { exit: "`", children: {}}
});

/**
 * **Shallow Bracket and Quote Nesting**
 *
 * Combines shallow bracket and quote nesting strategies.
 * Both brackets and quotes are recognized at level 0, but
 * inside either, no further nesting is recognized.
 */
export const SHALLOW_BRACKET_AND_QUOTE_NESTING = narrow({
    ...SHALLOW_BRACKET_NESTING,
    ...SHALLOW_QUOTE_NESTING
});
