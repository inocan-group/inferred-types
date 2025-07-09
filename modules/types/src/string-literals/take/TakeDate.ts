import type {
    As,
    Err,
    HasLeadingTemplateLiteral,
    NumericChar,
    StripLeading,
    TwoDigitDate,
} from "inferred-types/types";

type Take<T extends string> = string extends T
    ? Error | { take: TwoDigitDate<"branded">; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? Error | { take: TwoDigitDate<"branded">; rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends NumericChar
                ? C1 extends "0"
                    ? C2 extends "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
                        ? { take: TwoDigitDate<"branded"> & `${C1}${C2}`; rest: Rest }
                        : Err<'date'>
                    : C1 extends "1"
                        ? C2 extends NumericChar
                            ? {
                                take: TwoDigitDate<"branded"> & `${C1}${C2}`;
                                rest: Rest
                            }
                            : Err<'date'>
                        : C1 extends "2"
                            ? C2 extends NumericChar
                                ? { take: TwoDigitDate<"branded"> & `${C1}${C2}`; rest: Rest }
                                : Err<'date'>
                            : C1 extends "3"
                                ? C2 extends "0" | "1"
                                    ? {
                                        take: TwoDigitDate<"branded"> & `${C1}${C2}`;
                                        rest: Rest
                                    }
                                    : Err<'date'>
                                : Err<'date'>
                : Err<'date'>
            : Err<'date'>;

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
 * - `Err<'date'>`
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
                StripLeading<T, TIgnoreLeading>
            >
        : Take<T>,
    Error |
    { take: TwoDigitDate<"branded">; rest: string }
>;
