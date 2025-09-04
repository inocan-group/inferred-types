import type { DATE_TYPE } from "inferred-types/constants";
import type {
    FourDigitYear,
    ThreeDigitMillisecond,
    TimezoneOffset,
    TwoDigitDate,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitMonth,
    TwoDigitSecond,
} from "types/datetime/general";
import type { UnbrandValues } from "types/literals/branding/UnbrandValues";

/**
 * a property of `DateMeta`
 */
export type DateType = typeof DATE_TYPE[number];

/**
 * NOTE:
 * - This was meant to be the DateMetaNoFunctions type but with the
 * addition of a number of handy and type strong functions attached
 * but that blew up typescript complexity so for now we're back in
 * design for that.
 */
export type DateMeta = {
    dateType: DateType;
    hasTime: boolean;
    year: FourDigitYear<"branded"> | null;
    month: TwoDigitMonth<"branded"> | null;
    date: TwoDigitDate<"branded"> | null;
    hour: TwoDigitHour<"branded"> | null;
    minute: TwoDigitMinute<"branded"> | null;
    second: TwoDigitSecond<"branded"> | null;
    ms: ThreeDigitMillisecond<"branded"> | null;
    timezone: TimezoneOffset<"branded"> | null;
};

type X = UnbrandValues<DateMeta>;

// & {
//     toString(): ToIsoString<
//         "auto",
//         TType, THas,
//         TYear, TMonth, TDate,
//         THour, TMin, TSec, TMs,
//         TTz
//     > & (string);
//     asYear(): ToIsoString<
//         "year",
//         TType, THas,
//         TYear, TMonth, TDate,
//         THour, TMin, TSec, TMs,
//         TTz
//     >;
//     asYearIndependent(): ToIsoString<
//         "year-independent",
//         TType, THas,
//         TYear, TMonth, TDate,
//         THour, TMin, TSec, TMs,
//         TTz
//     >;
//     asYearMonth(): ToIsoString<
//         "year-month",
//         TType, THas,
//         TYear, TMonth, TDate,
//         THour, TMin, TSec, TMs,
//         TTz
//     >;
//     asDate(): ToIsoString<
//         "date",
//         TType, THas,
//         TYear, TMonth, TDate,
//         THour, TMin, TSec, TMs,
//         TTz
//     >;
//     asDateTime(): ToIsoString<
//         "datetime",
//         TType, THas,
//         TYear, TMonth, TDate,
//         THour, TMin, TSec, TMs,
//         TTz
//     >;
// }
