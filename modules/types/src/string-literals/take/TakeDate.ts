import type {
    As,
    HasLeadingTemplateLiteral,
    NumericChar,
    StripLeading,
} from "inferred-types/types";

type Take<T extends string> = string extends T
    ? { take: string | null, rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? { take: string | null, rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends NumericChar
                ? C1 extends "0"
                    ? C2 extends "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
                        ? { take: `${C1}${C2}`, rest: Rest }
                        : { take: null, rest: T }
                    : C1 extends "1"
                        ? C2 extends NumericChar
                            ? { take: `${C1}${C2}`, rest: Rest }
                            : { take: null, rest: T }
                        : C1 extends "2"
                            ? C2 extends NumericChar
                                ? { take: `${C1}${C2}`, rest: Rest }
                                : { take: null, rest: T }
                            : C1 extends "3"
                                ? C2 extends "0" | "1"
                                    ? { take: `${C1}${C2}`, rest: Rest }
                                    : { take: null, rest: T }
                                : { take: null, rest: T }
                : { take: null, rest: T }
            : { take: null, rest: T }

/**
 * **TakeDate**`<T, TIgnoreLeading>`
 *
 * Looks for `TwoDigitDate` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TwoDigitDate, rest: Rest }`
 *
 * If there is no match:
 *
 * - `{ take: null, rest: T }`
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeDate<
    T extends string,
    TIgnoreLeading extends string | null = null
> = As<
TIgnoreLeading extends string
    ? string extends TIgnoreLeading
        ? never
        : Take<
            As<StripLeading<T, TIgnoreLeading>, string>
        >
    : Take<T>,
    { take: null, rest: string} | { take: `${number}`, rest: string}
>;
