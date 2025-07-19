import type { As } from "types/boolean-logic";
import type { Err } from "types/errors";
import type { NumericChar, NumericChar__ZeroToFive, StripLeading } from "types/string-literals";
import type { TwoDigitMinute } from "types/datetime";
import { HasLeadingTemplateLiteral } from "types/interpolation";

type E<T extends string> = Err<`parse-time/min`, `Unable to take minutes from '${T}'!`>

type Take<T extends string> = string extends T
    ? E<T> | { take: TwoDigitMinute<"branded">; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? E<T> | { take: TwoDigitMinute<"branded">; rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends NumericChar__ZeroToFive
                ? C2 extends NumericChar
                    ? {
                        take: TwoDigitMinute<`${C1}${C2}`>;
                        rest: Rest
                    }
                    : E<T>
                : E<T>
            : E<T>;

/**
 * **TakeMinutes**`<T, TIgnoreLeading>`
 *
 * Looks for valid two-digit minutes (00-59) at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TwoDigitMinute, rest: Rest }`
 *
 * If there is no match:
 *
 * - `{ take: null, rest: T }`
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeMinutes<
    T extends string,
    TIgnoreLeading extends string | null = null
> = TIgnoreLeading extends string
    ? string extends TIgnoreLeading
        ? Err<`parse-time/min`> | { take: TwoDigitMinute<"branded">; rest: string }
        : As<
            Take<
                As<StripLeading<T, TIgnoreLeading>, string>
            >,
                Err<`parse-time/min`> | { take: TwoDigitMinute<"branded">; rest: string }
        >
    : As<
        Take<T>,
        Err<`parse-time/min`> | { take: TwoDigitMinute<"branded">; rest: string }
    >;
