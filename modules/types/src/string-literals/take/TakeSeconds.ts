import type {
    As,
    HasLeadingTemplateLiteral,
    NumericChar,
    NumericChar__ZeroToFive,
    StripLeading,
    TwoDigitSecond,
} from "inferred-types/types";

type Take<T extends string> = string extends T
    ? { take: null; rest: string } | { take: TwoDigitSecond<"branded">; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? { take: null; rest: string } | { take: TwoDigitSecond<"branded">; rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends NumericChar__ZeroToFive
                ? C2 extends NumericChar
                    ? {
                        take: TwoDigitSecond<"branded"> & `${C1}${C2}`;
                        rest: Rest;
                    }
                    : { take: null; rest: T }
                : { take: null; rest: T }
            : { take: null; rest: T };

/**
 * **TakeSeconds**`<T, TIgnoreLeading>`
 *
 * Looks for valid two-digit seconds (00-59) at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TwoDigitSecond, rest: Rest }`
 *
 * If there is no match:
 *
 * - `{ take: null, rest: T }`
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeSeconds<
    T extends string,
    TIgnoreLeading extends string | null = null
> = TIgnoreLeading extends string
    ? string extends TIgnoreLeading
        ? never
        : As<
            Take<
                As<StripLeading<T, TIgnoreLeading>, string>
            >,
                { take: null; rest: string } | { take: TwoDigitSecond<"branded">; rest: string }
        >

    : As<
        Take<T>,
        { take: null; rest: string } | { take: TwoDigitSecond<"branded">; rest: string }
    >;
