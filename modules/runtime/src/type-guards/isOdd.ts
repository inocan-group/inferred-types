import type { OddNumber } from "inferred-types/types";
import { isInteger, isNumber } from "inferred-types/runtime";

export function isOdd(val: unknown): val is OddNumber {
    return isNumber(val) && isInteger(val) && val % 2 !== 0;
}
