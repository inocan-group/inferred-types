import { isInteger, isNumber } from "inferred-types/runtime";
import { EvenNumber } from "inferred-types/types";

export function isEven(val: unknown): val is EvenNumber {
    return isNumber(val) && isInteger(val) && val % 2 === 0
}
