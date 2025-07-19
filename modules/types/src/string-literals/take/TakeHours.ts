import type { As } from "types/boolean-logic";
import type { Err } from "types/errors";
import type {  NumericChar, StripLeading } from "types/string-literals";
import type { TwoDigitHour } from "types/datetime";
import { HasLeadingTemplateLiteral } from "types/interpolation";

type HoursErr<
    TParse extends string
> = Err<
    `parse-time/hours`,
    `Could not find or parse out the TwoDigitHour string from the head of: '${TParse}'`,
    { parse: TParse }
>;


type Take<T extends string> = string extends T
    ? Error | { take: TwoDigitHour<"branded">; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? Error | { take: TwoDigitHour<"branded">; rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends "0"
                ? C2 extends NumericChar
                    ? {
                        take: TwoDigitHour<`${C1}${C2}`>;
                        rest: Rest;
                    }
                    : HoursErr<T>
                : C1 extends "1"
                    ? C2 extends NumericChar
                        ? {
                            take: TwoDigitHour<`${C1}${C2}`>;
                            rest: Rest;
                        }
                        : HoursErr<T>
                    : C1 extends "2"
                        ? C2 extends "0" | "1" | "2" | "3"
                            ? {
                                take: TwoDigitHour<`${C1}${C2}`>;
                                rest: Rest
                            }
                            : HoursErr<T>
                        : HoursErr<T>
            : HoursErr<T>;

/**
 * **TakeHours**`<T, TIgnoreLeading>`
 *
 * Looks for `TwoDigitHour` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TwoDigitHour | null, rest: string }`
 *
 * Valid hours are 00-23.
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeHours<
    T extends string,
    TIgnoreLeading extends string | null = null
> = TIgnoreLeading extends string
    ? string extends TIgnoreLeading
        ? never
        : As<
            Take<
                As<StripLeading<T, TIgnoreLeading>, string>
            >,
            Error | { take: TwoDigitHour<"branded">; rest: string }
        >
    : Take<T>;
