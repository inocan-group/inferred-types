import type {
    As,
    HasLeadingTemplateLiteral,
    NumericChar,
    StripLeading,
} from "inferred-types/types";

type Take<T extends string> = string extends T
    ? { take: `${number}` | null; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? { take: string | null; rest: string }
        : T extends `${infer C1}${infer C2}${infer C3}${infer C4}${infer Rest}`
            ? C1 extends NumericChar
                ? C2 extends NumericChar
                    ? C3 extends NumericChar
                        ? C4 extends NumericChar
                            ? { take: As<`${C1}${C2}${C3}${C4}`, `${number}`>; rest: Rest }
                            : { take: null; rest: T }
                        : { take: null; rest: T }
                    : { take: null; rest: T }
                : { take: null; rest: T }
            : { take: null; rest: T };

/**
 * **TakeYear**`<T, TIgnoreLeading>`
 *
 * Looks for `FourDigitYear` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: FourDigitYear, rest: Rest }`
 *
 * If there is no match:
 *
 * - `{ take: null, rest: Rest }`
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeYear<
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
    { take: null; rest: string } | { take: `${number}`; rest: string }
>
;
