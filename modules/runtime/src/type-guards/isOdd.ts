import { isInteger, isNumber } from "inferred-types/runtime";
import { OddNumber } from "inferred-types/types";

export function isOdd(val: unknown): val is OddNumber {
    return isNumber(val) && isInteger(val) && val % 2 !== 0
}
