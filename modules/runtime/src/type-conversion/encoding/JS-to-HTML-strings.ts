import { createEncoder } from "inferred-types/runtime";

const _JS_TO_HTML = {
    // Basic HTML entities
    ["<"]: "&lt;",
    [">"]: "&gt;",
    ["&"]: "&amp;",
    ['"']: "&quot;",
    ["'"]: "&#39;", // Apostrophe (not always needed, but good practice)

    // Whitespace and control characters
    ["\u00A0"]: "&nbsp;", // Non-breaking space
    ["\u2003"]: "&emsp;", // Em space
    ["\u2002"]: "&ensp;", // En space
    ["\u2009"]: "&thinsp;", // Thin space
    ["\u202F"]: "&#8239;", // Narrow no-break space

    // Special symbols
    ["©"]: "&copy;",
    ["®"]: "&reg;",
    ["™"]: "&trade;",
    ["€"]: "&euro;",
    ["£"]: "&pound;",
    ["¥"]: "&yen;",
    ["¢"]: "&cent;",
    ["§"]: "&sect;",
    ["¶"]: "&para;",
    ["•"]: "&bull;",
    ["…"]: "&hellip;", // Horizontal ellipsis
    ["°"]: "&deg;",
    ["±"]: "&plusmn;",
    ["÷"]: "&divide;",
    ["×"]: "&times;",

    // Math symbols
    ["¼"]: "&frac14;",
    ["½"]: "&frac12;",
    ["¾"]: "&frac34;",
    ["∞"]: "&infin;",
    ["∑"]: "&sum;",
    ["∏"]: "&prod;",
    ["∫"]: "&int;",
    ["√"]: "&radic;",
    ["∂"]: "&part;",
    ["≈"]: "&asymp;",
    ["≠"]: "&ne;",
    ["≡"]: "&equiv;",
    ["≤"]: "&le;",
    ["≥"]: "&ge;",
    ["∧"]: "&and;",
    ["∨"]: "&or;",
    ["¬"]: "&not;",

    // Arrows
    ["←"]: "&larr;",
    ["→"]: "&rarr;",
    ["↑"]: "&uarr;",
    ["↓"]: "&darr;",
    ["↔"]: "&harr;",
    ["⇐"]: "&lArr;",
    ["⇒"]: "&rArr;",
    ["⇑"]: "&uArr;",
    ["⇓"]: "&dArr;",
    ["⇔"]: "&hArr;",

    // Miscellaneous
    ["♠"]: "&spades;",
    ["♣"]: "&clubs;",
    ["♥"]: "&hearts;",
    ["♦"]: "&diams;",
    ["♫"]: "&#9835;", // Music note
    ["⚠"]: "&#9888;", // Warning symbol
    ["✓"]: "&check;",
    ["✔"]: "&#10004;", // Checkmark
} as const;

export const { encoder: encodeJsStringToHtml, decoder: decodeHtmlStringToJs } = createEncoder(
    {
        ["<"]: "&lt;",
        [">"]: "&gt;",
        ['"']: "&quot;",
        ["'"]: "&#39;",
        ["\u00A0"]: "&nbsp;",
        ["\u2003"]: "&emsp;",
        ["\u2002"]: "&ensp;",
        ["\u2009"]: "&thinsp;",
        ["©"]: "&copy;",
        ["®"]: "&reg;",
        ["™"]: "&trade;",
        ["€"]: "&euro;",
        ["£"]: "&pound;",
        ["¥"]: "&yen;",
        ["¢"]: "&cent;",
        ["§"]: "&sect;",
        ["¶"]: "&para;",
        ["•"]: "&bull;",
        ["…"]: "&hellip;",
        ["°"]: "&deg;",
        ["±"]: "&plusmn;",
        ["÷"]: "&divide;",
        ["×"]: "&times;",
        ["¼"]: "&frac14;",
        ["½"]: "&frac12;",
        ["¾"]: "&frac34;",
        ["∞"]: "&infin;",
        ["∑"]: "&sum;",
        ["∏"]: "&prod;",
        ["∫"]: "&int;",
        ["√"]: "&radic;",
        ["∂"]: "&part;",
        ["≈"]: "&asymp;",
        ["≠"]: "&ne;",
        ["≡"]: "&equiv;",
        ["≤"]: "&le;",
        ["≥"]: "&ge;",
        ["∧"]: "&and;",
        ["¬"]: "&not;",
        // ["←"]: "&larr;",
        // ["→"]: "&rarr;",
        // ["↑"]: "&uarr;",
        // ["↓"]: "&darr;",
    }
);

