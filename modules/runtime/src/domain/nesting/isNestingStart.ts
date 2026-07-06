import type { Err, Nesting } from "inferred-types/types";
import { err, isNestingKeyValue, isNestingTuple } from "inferred-types/runtime";

export function isNestingStart<
    TChar extends string,
    TNesting extends Nesting
>(
    char: TChar,
    nesting: TNesting
): boolean | Err<"invalid-type/nesting", string, { nesting: TNesting; char: TChar }> {
    if (isNestingTuple(nesting)) {
        const [start, _] = nesting;
        return start.includes(char);
    }
    else if (isNestingKeyValue(nesting)) {
        return Object.keys(nesting).includes(char);
    }
    else {
        return err(
            `invalid-type/nesting`,
            `The isNestingStart('${char}', nesting) function received an invalid nesting type. Remember that start and end characters MUST be single length characters`,
            { nesting, char }
        );
    }
}
