import { DATE_TYPE } from "inferred-types/constants";
import {
    FourDigitYear,
    ThreeDigitMillisecond,
    TimeZone,
    TwoDigitDate,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitMonth,
    TwoDigitSecond
} from "types/datetime/general";
import { RenderTime } from "types/datetime/RenderTime";
import { Err } from "types/errors";
import { Join } from "types/string-literals";

type IsoFormat = "auto" | DateType;


type ToYear<
    TType extends DateType = DateType,
    THas extends boolean = boolean,
    TYear extends FourDigitYear | null = FourDigitYear | null,
    TMonth extends TwoDigitMonth | null = TwoDigitMonth | null,
    TDate extends TwoDigitDate | null = TwoDigitDate | null,
    THour extends TwoDigitHour | null = TwoDigitHour | null,
    TMin extends TwoDigitMinute | null = TwoDigitMinute | null,
    TSec extends TwoDigitSecond | null = TwoDigitSecond | null,
    TMs extends ThreeDigitMillisecond | null = ThreeDigitMillisecond | null,
    TTz extends TimeZone<"strong"> | null = TimeZone<"strong"> | null
> = TYear extends FourDigitYear
    ? TYear
    : Err<
        `date/to-year`,
        `The parsed date passed into the toYear() function is unable to be completed as YEAR information was missing!`,
        {
            from: TType,
            hasTime: THas,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >;

type ToYearIndependent<
    TType extends DateType = DateType,
    THas extends boolean = boolean,
    TYear extends FourDigitYear | null = FourDigitYear | null,
    TMonth extends TwoDigitMonth | null = TwoDigitMonth | null,
    TDate extends TwoDigitDate | null = TwoDigitDate | null,
    THour extends TwoDigitHour | null = TwoDigitHour | null,
    TMin extends TwoDigitMinute | null = TwoDigitMinute | null,
    TSec extends TwoDigitSecond | null = TwoDigitSecond | null,
    TMs extends ThreeDigitMillisecond | null = ThreeDigitMillisecond | null,
    TTz extends TimeZone<"strong"> | null = TimeZone<"strong"> | null
> = TMonth extends TwoDigitMonth
    ? TDate extends TwoDigitDate
    ? `--${TMonth}-${TDate}`
    : Err<
        `date/to-year-independent`,
        `The parsed date passed into the toYearIndependent() function is unable to be completed as either MONTH or DATE information was missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >
    : Err<
        `date/to-year-independent`,
        `The parsed date passed into the toYearIndependent() function is unable to be completed as either MONTH or DATE information was missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >;

type ToYearMonth<
    TType extends DateType = DateType,
    THas extends boolean = boolean,
    TYear extends FourDigitYear | null = FourDigitYear | null,
    TMonth extends TwoDigitMonth | null = TwoDigitMonth | null,
    TDate extends TwoDigitDate | null = TwoDigitDate | null,
    THour extends TwoDigitHour | null = TwoDigitHour | null,
    TMin extends TwoDigitMinute | null = TwoDigitMinute | null,
    TSec extends TwoDigitSecond | null = TwoDigitSecond | null,
    TMs extends ThreeDigitMillisecond | null = ThreeDigitMillisecond | null,
    TTz extends TimeZone<"strong"> | null = TimeZone<"strong"> | null
> = TYear extends FourDigitYear
    ? TMonth extends TwoDigitDate
    ? `-${TYear}-${TMonth}`
    : Err<
        `date/to-year-month`,
        `The parsed date passed into the toYearMonth() function is unable to be completed as either YEAR or MONTH information was missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >
    : Err<
        `date/to-year-month`,
        `The parsed date passed into the toYearMonth() function is unable to be completed as either YEAR or MONTH information was missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >;

type ToDate<
    TType extends DateType = DateType,
    THas extends boolean = boolean,
    TYear extends FourDigitYear | null = FourDigitYear | null,
    TMonth extends TwoDigitMonth | null = TwoDigitMonth | null,
    TDate extends TwoDigitDate | null = TwoDigitDate | null,
    THour extends TwoDigitHour | null = TwoDigitHour | null,
    TMin extends TwoDigitMinute | null = TwoDigitMinute | null,
    TSec extends TwoDigitSecond | null = TwoDigitSecond | null,
    TMs extends ThreeDigitMillisecond | null = ThreeDigitMillisecond | null,
    TTz extends TimeZone<"strong"> | null = TimeZone<"strong"> | null
> = TYear extends FourDigitYear
    ? TMonth extends TwoDigitMonth
    ? TDate extends TwoDigitDate
    ? `${TYear}-${TMonth}-${TDate}`
    : Err<
        `date/to-date`,
        `The parsed date passed into the toDate() function is unable to be completed as some of YEAR, MONTH, or DATE were missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >
    : Err<
        `date/to-date`,
        `The parsed date passed into the toDate() function is unable to be completed as some of YEAR, MONTH, or DATE were missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >
    : Err<
        `date/to-date`,
        `The parsed date passed into the toDate() function is unable to be completed as some of YEAR, MONTH, or DATE were missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >;


type ToDateTime<
    TType extends DateType = DateType,
    THas extends boolean = boolean,
    TYear extends FourDigitYear | null = FourDigitYear | null,
    TMonth extends TwoDigitMonth | null = TwoDigitMonth | null,
    TDate extends TwoDigitDate | null = TwoDigitDate | null,
    THour extends TwoDigitHour | null = TwoDigitHour | null,
    TMin extends TwoDigitMinute | null = TwoDigitMinute | null,
    TSec extends TwoDigitSecond | null = TwoDigitSecond | null,
    TMs extends ThreeDigitMillisecond | null = ThreeDigitMillisecond | null,
    TTz extends TimeZone<"strong"> | null = TimeZone<"strong"> | null
> = TYear extends FourDigitYear
    ? TMonth extends TwoDigitMonth
    ? TDate extends TwoDigitDate
    ? [THas] extends [true]
    ? RenderTime<THour, TMin, TSec, TMs, TTz> extends string
    ? Join<[
        `${TYear}-${TMonth}-${TDate}T`,
        RenderTime<THour, TMin, TSec, TMs, TTz>
    ]>
    : RenderTime<THour, TMin, TSec, TMs, TTz> // error
    : `${TYear}-${TMonth}-${TDate}T${RenderTime}`
    : Err<
        `date/to-datetime`,
        `The parsed date passed into the toDateTime() function is unable to be completed as some of YEAR, MONTH, or DATE were missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >
    : Err<
        `date/to-datetime`,
        `The parsed date passed into the toDateTime() function is unable to be completed as some of YEAR, MONTH, or DATE were missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >
    : Err<
        `date/to-datetime`,
        `The parsed date passed into the toDateTime() function is unable to be completed as some of YEAR, MONTH, or DATE were missing!`,
        {
            from: TType,
            hasTime: THas,
            year: TYear,
            month: TMonth,
            date: TDate,
            time: { hour: THour, min: TMin, sec: TSec, ms: TMs, timezone: TTz }
        }
    >;


type F<
    TFormat extends IsoFormat,
    TType extends DateType
> = TFormat extends "auto"
    ? TType
    : TFormat;

export type ToIsoString<
    TFormat extends IsoFormat,
    TType extends DateType = DateType,
    THas extends boolean = boolean,
    TYear extends FourDigitYear | null = FourDigitYear | null,
    TMonth extends TwoDigitMonth | null = TwoDigitMonth | null,
    TDate extends TwoDigitDate | null = TwoDigitDate | null,
    THour extends TwoDigitHour | null = TwoDigitHour | null,
    TMin extends TwoDigitMinute | null = TwoDigitMinute | null,
    TSec extends TwoDigitSecond | null = TwoDigitSecond | null,
    TMs extends ThreeDigitMillisecond | null = ThreeDigitMillisecond | null,
    TTz extends TimeZone<"strong"> | null = TimeZone<"strong"> | null
> = F<TFormat, TType> extends "year"
    ? ToYear<TType, THas, TYear, TMonth, TDate, THour, TMin, TSec, TMs, TTz>
    : F<TFormat, TType> extends "year-independent"
    ? ToYearIndependent<TType, THas, TYear, TMonth, TDate, THour, TMin, TSec, TMs, TTz>
    : F<TFormat, TType> extends "year-month"
    ? ToYearMonth<TType, THas, TYear, TMonth, TDate, THour, TMin, TSec, TMs, TTz>
    : F<TFormat, TType> extends "date"
    ? ToDate<TType, THas, TYear, TMonth, TDate, THour, TMin, TSec, TMs, TTz>
    : F<TFormat, TType> extends "datetime"
    ? ToDateTime<TType, THas, TYear, TMonth, TDate, THour, TMin, TSec, TMs, TTz>
    : never;


/**
 * a property of `DateMeta`
 */
export type DateType = typeof DATE_TYPE[number];

/**
 * **DateMeta**
 *
 * metadata about a _parsed_ Date/DateTime value
 */
export type DateMeta<
    TType extends DateType = DateType,
    THas extends boolean = boolean,
    TYear extends FourDigitYear | null = FourDigitYear | null,
    TMonth extends TwoDigitMonth | null = TwoDigitMonth | null,
    TDate extends TwoDigitDate | null = TwoDigitDate | null,
    THour extends TwoDigitHour | null = TwoDigitHour | null,
    TMin extends TwoDigitMinute | null = TwoDigitMinute | null,
    TSec extends TwoDigitSecond | null = TwoDigitSecond | null,
    TMs extends ThreeDigitMillisecond | null = ThreeDigitMillisecond | null,
    TTz extends TimeZone<"strong"> | null = TimeZone<"strong"> | null
> = {
    dateType: TType;
    hasTime: THas;
    year: TYear;
    month: TMonth;
    date: TDate;
    hour: THour;
    minute: TMin;
    second: TSec;
    ms: TMs;
    timezone: TTz;
    toString(): ToIsoString<
        "auto",
        TType, THas,
        TYear, TMonth, TDate,
        THour, TMin, TSec, TMs,
        TTz
    >;
    asYear(): ToIsoString<
        "year",
        TType, THas,
        TYear, TMonth, TDate,
        THour, TMin, TSec, TMs,
        TTz
    >;
    asYearIndependent(): ToIsoString<
        "year-independent",
        TType, THas,
        TYear, TMonth, TDate,
        THour, TMin, TSec, TMs,
        TTz
    >;
    asYearMonth(): ToIsoString<
        "year-month",
        TType, THas,
        TYear, TMonth, TDate,
        THour, TMin, TSec, TMs,
        TTz
    >;
    asDate(): ToIsoString<
        "date",
        TType, THas,
        TYear, TMonth, TDate,
        THour, TMin, TSec, TMs,
        TTz
    >;
    asDateTime(): ToIsoString<
        "datetime",
        TType, THas,
        TYear, TMonth, TDate,
        THour, TMin, TSec, TMs,
        TTz
    >;
};


export type DateMetaNoFunctions<T extends DateMeta = DateMeta> = Omit<
    T,
    | "toString"
    | "asYear" | "asYearIndependent" | "asYearMonth"
    | "asDate" | "asDateTime"
>
