import type { As } from "types/boolean-logic";
import type { FourDigitYear } from "types/datetime";
import type { Err } from "types/errors";
import type { StartsWithTemplateLiteral } from "types/interpolation";
import type { NumericChar, StripLeading } from "types/string-literals";

type InvalidYear<T extends string> = Err<
    `parse-date/year`,
    `The year [${T}] passed in is not a valid ISO four digit year!`,
    { year: T }
>;

type Take<T extends string> = string extends T
    ? Error | { take: FourDigitYear<"branded">; rest: string }
    : StartsWithTemplateLiteral<T> extends true
        ? Error | { take: FourDigitYear<"branded">; rest: string }
        : T extends `${infer C1}${infer C2}${infer C3}${infer C4}${infer Rest}`
            ? C1 extends NumericChar
                ? C2 extends NumericChar
                    ? C3 extends NumericChar
                        ? C4 extends NumericChar
                            ? {
                                take: FourDigitYear<`${C1}${C2}${C3}${C4}`>;
                                rest: Rest;
                            }
                            : InvalidYear<T>
                        : InvalidYear<T>
                    : InvalidYear<T>
                : InvalidYear<T>
            : InvalidYear<T>;

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
 * - `Err<'year'>`
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeYear<
    T extends string,
    TIgnoreLeading extends string | null = null
> = string extends T
    ? Error | { take: FourDigitYear<"branded">; rest: string }

    : As<
        TIgnoreLeading extends string
            ? string extends TIgnoreLeading
                ? never
                : Take<
                    As<StripLeading<T, TIgnoreLeading>, string>
                >
            : Take<T>,
    Error | { take: FourDigitYear<"branded">; rest: string }
    >;
