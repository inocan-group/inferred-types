import type { EvenNumber } from "inferred-types/types";
import { isInteger, isNumber } from "inferred-types/runtime";

export function isEven(val: unknown): val is EvenNumber {
    return isNumber(val) && isInteger(val) && val % 2 === 0;
}
