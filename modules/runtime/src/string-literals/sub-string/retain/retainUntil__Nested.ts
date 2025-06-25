import { DEFAULT_NESTING } from "inferred-types/constants";
import {
    afterFirst,
    asChars,
    err,
    isNestingStart,
    isNumber,
    mutable,
    toStringLiteral,
    isNestingEndMatch,
    isNestingTuple,
} from "inferred-types/runtime";
import { DefaultNesting, Nesting, RetainUntil__Nested } from "inferred-types/types";

function findIdx<
    TChars extends readonly string[],
    TNesting extends Nesting,
>(
    chars: TChars,
    find: string,
    nesting: TNesting,
    stack: readonly string[] = [],
    result: string = "",
    idx: number = 0
) {
    if(chars.length === 0) {
        if(stack.length > 0) {
            return err(
                `unbalanced/retainUntil__Nested`,
                `The characters passed into retainUntil_Nested were unbalanced in the nesting!`,
                { find, stack: toStringLiteral(stack), content: result }
            );
        }
        else {
            return err(
                `not-found/retainUntil__Nested`,
                `The characters passed into retainUntil_Nested had a balanced nesting but the character '${find}' was never found at the root of the nesting stack!`,
                { find, content: result }
            );
        }
    }

    if(chars[0] === find && stack.length === 0) {
        return idx;
    }

    if(isNestingEndMatch(chars[0], stack, nesting) === true) {
        const newStack = [...stack].slice(0,-1);
        
        // Special check: if this character ends nesting AND is our target AND stack becomes empty
        if (chars[0] === find && newStack.length === 0) {
            return idx;
        }
        
        return findIdx(
            afterFirst(chars),
            find,
            nesting,
            newStack,
            `${result}${chars[0]}`,
            idx+1
        )
    }
    else if (isNestingStart(chars[0], nesting) === true) {
        // Special handling for NestingTuple: only allow stack depth of 1
        const shouldLimitStack = isNestingTuple(nesting) && stack.length > 0;

        return findIdx(
            afterFirst(chars),
            find,
            nesting,
            shouldLimitStack ? stack : [...stack, chars[0]],
            `${result}${chars[0]}`,
            idx+1
        )
    }
    else {
        // Regular character, continue
        return findIdx(
            afterFirst(chars),
            find,
            nesting,
            stack,
            `${result}${chars[0]}`,
            idx+1
        )
    }

}

/**
 * **retainUntil__Nested**(str, find, [incl], [nesting])
 *
 * Returns a sub-string of `str`, terminating with `find` character
 * which exists at the base of the nesting stack.
 *
 * - if the find character is _not found_ at the base of the nesting
 * stack an error will be returned.
 */
export function retainUntil__Nested<
    const TStr extends string,
    const TFind extends string,
    const TInclude extends boolean = true,
    const TNesting extends Nesting = DefaultNesting

>(
    str: TStr,
    find: TFind,
    incl: TInclude = true as TInclude,
    nesting: TNesting = mutable(DEFAULT_NESTING) as TNesting
) {

    const idx = findIdx(asChars(str), find, nesting);

    if(isNumber(idx)) {
        const endIdx = incl ? idx + 1 : idx;
        return str.slice(0, endIdx) as RetainUntil__Nested<TStr,TFind,TInclude,TNesting>;
    } else {
        return idx as RetainUntil__Nested<TStr,TFind,TInclude,TNesting>;
    }

}
