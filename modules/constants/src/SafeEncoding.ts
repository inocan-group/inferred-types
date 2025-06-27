export const SAFE_ENCODING__QUOTES = {
    [`"`]: "^<dq>",
    [`'`]: "^<sq>",
    [`\``]: "^<grave>",
} as const;

export const SAFE_ENCODING__WHITESPACE = {
    " ": "^<sp>",
    "\t": "^<tab>",
    "\n": "^<n>",
    "\r": "^<r>",
} as const;

export const SAFE_ENCODING__BRACKETS = {
    "[": "^<osb>",
    "]": "^<csb>",
    "(": "^<op>",
    ")": "^<cp>",
    "{": "^<oc>",
    "}": "^<cc>",
} as const;

export const SAFE_ENCODING_KEYS = {
    ...SAFE_ENCODING__BRACKETS,
    ...SAFE_ENCODING__QUOTES,
    ...SAFE_ENCODING__WHITESPACE,
} as const;
