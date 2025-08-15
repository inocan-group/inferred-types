import type { IsTemplateLiteral, Narrowable } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **isTemplateLiteral(val)** -> "maybe" / false
 *
 * This function is not really ready for too many use cases but the intention is to make
 * it more useful over time as we develop "runtime types".
 *
 * In any event, calling this function will provide a proper `true`/`false` value in the
 * type system indicating whether the _type_ includes a "template literal" (aka, a string
 * literal with `${string}`, `${number}`, `${boolean}` in it).
 *
 * The runtime system, however, is largely dumb. It will return `false` if the value passed
 * in is _not_ a string but otherwise the string "maybe" is returned.
 */
export function isTemplateLiteral<T extends Narrowable>(val: T): IsTemplateLiteral<T> {
    return isString(val)
        ? "maybe" as unknown as IsTemplateLiteral<T>
        : false as IsTemplateLiteral<T>;
}
