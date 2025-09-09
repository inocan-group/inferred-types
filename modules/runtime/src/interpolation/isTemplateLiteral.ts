import type { IsTemplateLiteral } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **isStaticTemplate(val)** -> boolean
 *
 * Tests whether the passed in `val` has static template tags (e.g., `{{string}}`,
 * `{{number}}`, etc.). If the string passed in is a literal string the resolution
 * to a discrete `true`/`false` value should be able to be done at design time.
 */
export function isStaticTemplate<T extends string>(val: T): IsTemplateLiteral<T> {
    return isString(val)
        ? "maybe" as unknown as IsTemplateLiteral<T>
        : false as IsTemplateLiteral<T>;
}
