import type { Variable } from "inferred-types/types";
import { ALPHA_CHARS, NUMERIC_CHAR } from "inferred-types/constants";
import { asChars, isString, startsWithTypeguard } from "inferred-types/runtime";

const VALID = [
    ...ALPHA_CHARS,
    ...NUMERIC_CHAR,
    "_",
    ".",
];

function valid(chars: string[]): boolean {
    return chars.every(i => VALID.includes(i));
}

export function isVariable(val: unknown): val is Variable {
    return isString(val) && startsWithTypeguard(...ALPHA_CHARS)(val) && valid(asChars(val));
}
