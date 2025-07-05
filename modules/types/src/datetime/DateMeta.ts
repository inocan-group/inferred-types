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

/**
 * a property of `DateMeta`
 */
export type DateType = typeof DATE_TYPE[number];

/**
 * **DateMeta**
 *
 * metadata about a _parsed_ Date/DateTime value
 */
export type DateMeta = {
    dateType: DateType;
    hasTime: boolean;
    year?: FourDigitYear;
    month: TwoDigitMonth;
    date?: TwoDigitDate | undefined;
    hour?: TwoDigitHour;
    minute?: TwoDigitMinute;
    second?: TwoDigitSecond;
    ms?: ThreeDigitMillisecond | undefined;
    timezone?: TimeZone<"strong">;
};
