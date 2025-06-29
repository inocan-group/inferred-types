import type { Email } from "inferred-types/types";
import { LOWER_ALPHA_CHARS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

/**
 * **isEmail**`(val)`
 *
 * type guard which validates that the value passed in
 * in the correct shape to be an email address. It checks:
 *
 * 1. that leads with alphabetic char
 * 2. has a `@` character
 * 3. has at least one `.` char after the `@`
 * 4. top-level domain has at least 2 characters
 */
export function isEmail(val: unknown): val is Email {
    if (!isString(val)) {
        return false;
    }
    const parts: string[] = val?.split("@");
    const domain = parts[1]?.split(".");
    const tld = domain ? domain.pop() as string : "";
    const firstChar = val[0].toLowerCase();

    return isString(val) && (
        LOWER_ALPHA_CHARS.includes(firstChar as any)
        && parts.length === 2
        && domain.length >= 1
        && tld.length >= 2
    );
}
