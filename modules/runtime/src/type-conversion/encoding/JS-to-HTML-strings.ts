import {
    createEncoder
} from "inferred-types/runtime";

export const {
    encoder: encodeJsStringToHtml,
    decoder: decodeHtmlStringToJs,
} = createEncoder(
    {
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        // "'": "&#39;",
        // "\u00A0": "&nbsp;",
        // "\u2003": "&emsp;",
        // "\u2002": "&ensp;",
        // "\u2009": "&thinsp;",
        // "©": "&copy;",
        // "®": "&reg;",
        // "™": "&trade;",
        // "€": "&euro;",
        // "£": "&pound;",
        // "¥": "&yen;",
        // "¶": "&para;",
        // "•": "&bull;",
        // "°": "&deg;",
        // "±": "&plusmn;",
        // "÷": "&divide;",
        // "×": "&times;",
        // "¼": "&frac14;",
        // "½": "&frac12;",
        // "¾": "&frac34;",
        // "∞": "&infin;",
        // "∑": "&sum;",
        // "≠": "&ne;",
        // "≡": "&equiv;",
        // "≤": "&le;",
        // "≥": "&ge;",
        // "→": "&rarr;",
        // "↑": "&uarr;",
        // "↓": "&darr;",
        // "♠": "&spades;",
        // "♣": "&clubs;",
        // "♥": "&hearts;",
        // "♦": "&diams;",
        // "⚠": "&#9888;", // Warning symbol
        // "✓": "&check;",
        // "←": "&larr;",
        // "≈": "&asymp;",

    // "♫": "&#9835;", // Music note
    // ["§"]: "&sect;",
    // ["…"]: "&hellip;",
    // ["∏"]: "&prod;",
    // ["∫"]: "&int;",
    // ["√"]: "&radic;",
    // ["∂"]: "&part;",
    // ["✔"]: "&#10004;",
    // ["∧"]: "&and;",
    // ["¬"]: "&not;",
    },
);
