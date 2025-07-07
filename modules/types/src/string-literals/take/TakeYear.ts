import type {
    HasLeadingTemplateLiteral,
    NumericChar,
} from "inferred-types/types";

/**
 * **TakeYear**`<T>`
 *
 * Looks for `FourDigitYear` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: FourDigitYear, rest: Rest }`
 *
 * If there is no match:
 *
 * - `{ take: null, rest: Rest }`
 */
export type TakeYear<
    T extends string,
> = string extends T
    ? { take: string | null, rest: string}
    : HasLeadingTemplateLiteral<T> extends true
        ? { take: string | null, rest: string}
    : T extends `${infer C1}${infer C2}${infer C3}${infer C4}${infer Rest}`
        ? C1 extends NumericChar
            ? C2 extends NumericChar
                ? C3 extends NumericChar
                    ? C4 extends NumericChar
                        ? { take: `${C1}${C2}${C3}${C4}`, rest: Rest }
                        : { take: null, rest: T }
                    : { take: null, rest: T }
                : { take: null, rest: T }
            : { take: null, rest: T }
        : { take: null, rest: T };
