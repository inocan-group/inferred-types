import type { As } from "types/boolean-logic";
import type { TwoDigitSecond } from "types/datetime";
import type { Err } from "types/errors";
import type { StartsWithTemplateLiteral } from "types/interpolation";
import type {
    NumericChar,
    NumericChar__ZeroToFive,
    StripLeading
} from "types/string-literals";

type E<T extends string> = Err<
    `parse-time/seconds`,
    `TakeSeconds<${T}> was unable to find seconds at the head of the parse string.`,
    { parse: T }
>;

type Take<T extends string> = string extends T
    ? Error | { take: TwoDigitSecond<"branded">; rest: string }
    : StartsWithTemplateLiteral<T> extends true
        ? Error | { take: TwoDigitSecond<"branded">; rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends NumericChar__ZeroToFive
                ? C2 extends NumericChar
                    ? {
                        take: TwoDigitSecond<`${C1}${C2}`>;
                        rest: Rest;
                    }
                    : E<T>
                : E<T>
            : E<T>;

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
            Error | { take: TwoDigitSecond<"branded">; rest: string }
        >

    : As<
        Take<T>,
        Error | { take: TwoDigitSecond<"branded">; rest: string }
    >;
