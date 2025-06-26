import type { DefaultNesting, Nesting, RetainUntil__Nested } from "inferred-types/types";
import { DEFAULT_NESTING } from "inferred-types/constants";
import {
    afterFirst,
    asArray,
    asChars,
    err,
    isNestingEndMatch,
    isNestingStart,
    isNestingTuple,
    isNumber,
    mutable,
    toStringLiteral,
} from "inferred-types/runtime";

function findIdx<
    TChars extends readonly string[],
    TFind extends string | readonly string[],
    TNesting extends Nesting,
>(
    chars: TChars,
    find: TFind,
    nesting: TNesting,
    stack: readonly string[] = [],
    result: string = "",
    idx: number = 0
) {
    const f = asArray(find) as string[];

    if (chars.length === 0) {
        if (stack.length > 0) {
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

    if (f.includes(chars[0]) && stack.length === 0) {
        return idx;
    }

    if (isNestingEndMatch(chars[0], stack, nesting) === true) {
        const newStack = [...stack].slice(0, -1);

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
            idx + 1
        );
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
            idx + 1
        );
    }
    else {
        // Regular character, continue
        return findIdx(
            afterFirst(chars),
            find,
            nesting,
            stack,
            `${result}${chars[0]}`,
            idx + 1
        );
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
    const TFind extends string | readonly string[],
    const TInclude extends boolean = true,
    const TNesting extends Nesting = DefaultNesting

>(
    str: TStr,
    find: TFind,
    incl: TInclude = true as TInclude,
    nesting: TNesting = mutable(DEFAULT_NESTING) as TNesting
) {
    const idx = findIdx(asChars(str), find, nesting);

    if (isNumber(idx)) {
        const endIdx = incl ? idx + 1 : idx;
        return str.slice(0, endIdx) as TFind extends readonly string[]
            ? RetainUntil__Nested<TStr, TFind[number], TInclude, TNesting>
            : TFind extends string
                ? RetainUntil__Nested<TStr, TFind, TInclude, TNesting>
                : never;
    }
    else {
        return idx as TFind extends readonly string[]
            ? RetainUntil__Nested<TStr, TFind[number], TInclude, TNesting>
            : TFind extends string
                ? RetainUntil__Nested<TStr, TFind, TInclude, TNesting>
                : never;
    }
}
