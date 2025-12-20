import type {
    IsAny,
    IsNever,
    IsoDate30,
    IsUnknown,
    NumericChar,
    Unbrand
} from "inferred-types/types";

interface DayToNumber {
    "01": 1;
    "02": 2;
    "03": 3;
    "04": 4;
    "05": 5;
    "06": 6;
    "07": 7;
    "08": 8;
    "09": 9;
    "10": 10;
    "11": 11;
    "12": 12;
    "13": 13;
    "14": 14;
    "15": 15;
    "16": 16;
    "17": 17;
    "18": 18;
    "19": 19;
    "20": 20;
    "21": 21;
    "22": 22;
    "23": 23;
    "24": 24;
    "25": 25;
    "26": 26;
    "27": 27;
    "28": 28;
    "29": 29;
    "30": 30;
    "31": 31;
}

type ValidMonth = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";

type EndDiv4 = "00" | "04" | "08" | "12" | "16" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "68" | "72" | "76" | "80" | "84" | "88" | "92" | "96";

type IsLeapYearDecomposed<Y1 extends string, Y2 extends string, Y3 extends string, Y4 extends string>
    = `${Y3}${Y4}` extends "00"
        ? `${Y1}${Y2}` extends EndDiv4 ? true : false
        : `${Y3}${Y4}` extends EndDiv4 ? true : false;

// Simplified validation that avoids complex default parameters
type IsValidDate<
    Y1 extends string,
    Y2 extends string,
    Y3 extends string,
    Y4 extends string,
    TMonth extends string,
    TDate extends number
> = Unbrand<TMonth> extends "02"
    ? TDate extends 29
        ? IsLeapYearDecomposed<Y1, Y2, Y3, Y4> extends true
            ? true
            : false
        : TDate extends 30 | 31
            ? false // Double Leap support removed for performance
            : true
    : Unbrand<TMonth> extends IsoDate30
        ? TDate extends 31
            ? false
            : true
        : true;

type IsFourDigitString<T extends string> = T extends `${NumericChar}${NumericChar}${NumericChar}${NumericChar}` ? true : false;

type ParseIsoFullDate<T extends string>
    = T extends `${infer Y1}${infer Y2}${infer Y3}${infer Y4}-${infer M1}${infer M2}-${infer D1}${infer D2}`
        ? `${D1}${D2}` extends keyof DayToNumber
            ? `${M1}${M2}` extends ValidMonth
                ? IsFourDigitString<`${Y1}${Y2}${Y3}${Y4}`> extends true
                    ? IsValidDate<Y1, Y2, Y3, Y4, `${M1}${M2}`, DayToNumber[`${D1}${D2}`]>
                    : false
                : false
            : false
        : T extends `${infer Y1}${infer Y2}${infer Y3}${infer Y4}${infer M1}${infer M2}${infer D1}${infer D2}`
            ? `${D1}${D2}` extends keyof DayToNumber
                ? `${M1}${M2}` extends ValidMonth
                    ? IsFourDigitString<`${Y1}${Y2}${Y3}${Y4}`> extends true
                        ? IsValidDate<Y1, Y2, Y3, Y4, `${M1}${M2}`, DayToNumber[`${D1}${D2}`]>
                        : false
                    : false
                : false
            : false;

/**
 * **IsIsoFullDate**`<T>`
 *
 * Tests whether `T` is an ISO 8601 Date (not DateTime) which is
 * of the format:
 *
 * - `YYYY-MM-DD`, _or_
 * - `YYYYMMDD`
 *
 * **Note:**
 * - if a type passes this test then it guaranteed to be a valid
 * ISO Date string
 * - in the type system you can't upgrade it to the "blessed"
 * branded type of `IsoDate` but if your runtime uses the
 * `isIsoDate()` type guard it will pass and be upgraded.
 */
export type IsIsoFullDate<T> = [IsAny<T>] extends [true]
    ? boolean
    : [IsNever<T>] extends [true]
            ? false
            : [IsUnknown<T>] extends [true]
                    ? boolean
                    : T extends string
                        ? string extends T
                            ? boolean
                            : ParseIsoFullDate<T>
                        : false;
