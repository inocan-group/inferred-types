import { Nesting } from "inferred-types/types";
import { err, isNestingKeyValue, isNestingTuple } from "inferred-types/runtime";

export function isNestingEnd<
    TChar extends string,
    TNesting extends Nesting
>(
    char: TChar,
    nesting: TNesting
) {
    if (isNestingTuple(nesting)) {
        const [ start, end ] = nesting;
        if (end) {
            return end.includes(char);
        } else {
            // When end is undefined, any non-start character ends the nesting
            return !start.includes(char);
        }
    } else if (isNestingKeyValue(nesting)) {
        return Object.values(nesting).includes(char);
    } else {
        return err(
            `invalid-type/nesting`,
            `The isNestingStart('${char}', nesting) function received an invalid nesting type. Remember that start and end characters MUST be single length characters`,
            { nesting, char }
        )
    }

}
