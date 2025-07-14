import type {
    As,
    Err,
    HasLeadingTemplateLiteral,
    NumericChar,
    StripLeading,
    TwoDigitMonth,
} from "inferred-types/types";

type InvalidMonth<T extends string> = Err<
    `parse-date/month`,
    `The value '${T}' can not be parsed into a valid TwoDigitMonth!`,
    { month: T }
>;

type Take<T extends string> = string extends T
    ? Error | { take: TwoDigitMonth<"branded">; rest: string }
    : HasLeadingTemplateLiteral<T> extends true
        ? Error | { take: [TwoDigitMonth<"branded">]; rest: string }
        : T extends `${infer C1}${infer C2}${infer Rest}`
            ? C1 extends NumericChar
                ? C2 extends NumericChar
                    ? `${C1}${C2}` extends TwoDigitMonth<"normal">
                        ? {
                            take: TwoDigitMonth<"branded"> & `${C1}${C2}`;
                            rest: Rest;
                        }
                        : InvalidMonth<T>
                    : InvalidMonth<T>
                : InvalidMonth<T>
            : InvalidMonth<T>;

/**
 * **TakeMonth**`<T, TIgnoreLeading>`
 *
 * Looks for `TwoDigitMonth` at front of the string and if it finds
 * it will return:
 *
 * - `{ take: TwoDigitMonth, rest: Rest }`
 *
 * If there is no match:
 *
 * - `{ take: null, rest: T }`
 *
 * @param TIgnoreLeading - Optional character to ignore if found at the beginning of the string
 */
export type TakeMonth<
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

    Error |
    { take: TwoDigitMonth<"branded">; rest: string }
>;
