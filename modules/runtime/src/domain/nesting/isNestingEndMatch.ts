import { valuesOf } from "inferred-types";
import { Nesting } from "inferred-types/types";
import { isNestingEnd, isNestingKeyValue, isNestingTuple, isUndefined, last, reverseLookup } from "inferred-types/runtime";


export function isNestingEndMatch<
    TChar extends string,
    TStack extends readonly string[],
    TNesting extends Nesting
>(char: TChar, stack: TStack, nesting: TNesting) {
    if(isNestingEnd(char, nesting) !== true) {
        return false;
    }
    else if(isNestingKeyValue(nesting)) {
        const match = valuesOf(nesting) as string[];
        const lookup = reverseLookup(nesting);
        if(last(stack) === lookup[char]) {
            return true;
        } else {
            return false;
        }

    }
    else if(isNestingTuple(nesting)) {
        const [ start, end ] = nesting;
        if(isUndefined(end)) {
            return start.includes(char)
                ? false
                : true;
        } else {
            return end.includes(char)
                ? true
                : false
        }
    }
}
