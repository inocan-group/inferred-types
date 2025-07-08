import type {
    DateLike,
    DateMeta,
    IsJsDate,
    IsMoment,
    DatePlus,
    IanaZone,
    IsoDateTime,
    IsoMonthDate,
    IsoYear,
    IsoYearMonth,
    TimezoneOffset,
    IsDayJs,
    IsoDate,
    IsLuxonDateTime
} from "inferred-types/types";
import { parseIsoDate } from "runtime/datetime/parseIsoDate";
import { isNumber } from 'runtime/type-guards';
import {
    isDate,
    isEpochInMilliseconds,
    isEpochInSeconds,
    isIsoDate,
    isIsoDateTime,
    isIsoYear,
    isIsoYearMonth,
    isLuxonDate,
    isMoment,
    isTemporalDate,
    isTimezoneOffset,
    isIanaTimezone
} from "runtime/type-guards/datetime";


const getLocalIanaZone = (() => {
    //  ❱❱  compute once, memoise
    const tz =
        (process.env.TZ && isIanaTimezone(process.env.TZ)
            ? process.env.TZ
            : Intl.DateTimeFormat().resolvedOptions().timeZone) ?? "UTC";

    return () => tz as IanaZone;
})();


function offsetMinutesToString(mins: number): TimezoneOffset {
    const sign = mins <= 0 ? "+" : "-";
    const abs = Math.abs(mins);
    const hh = String(Math.floor(abs / 60)).padStart(2, "0");
    const mm = String(abs % 60).padStart(2, "0");
    return `${sign}${hh}:${mm}` as TimezoneOffset;
}

/****************************************************************
 *  the main function
 ****************************************************************/

type Returns<T extends DateLike> = T extends IsoYear
    ? DatePlus<"iso-year", TimezoneOffset<"Z">, `${T}-${number}-${number}T${string}` & IsoDateTime>
    : T extends IsoYearMonth
    ? DateMeta extends Error
    ? DateMeta
    : DatePlus<
        "iso-year-month",
        "Z",
        IsoDateTime
    >
    : T extends IsoMonthDate
    ? DatePlus<"iso-year-independent", "Z", `${number}`>
    : T extends IsoDateTime
    ? DatePlus<"iso-datetime">
    : T extends IsoDate<"normal">
    ? DatePlus<"iso-date">
    : T extends number
    ? DatePlus<"epoch" | "epoch-milliseconds">
    : IsDayJs<T> extends true
    ? DatePlus<"day.js">
    : IsMoment<T> extends true
    ? DatePlus<
        "moment",
        "offset" extends keyof T
        ? T["offset"] extends TimezoneOffset
        ? T["offset"]
        : null
        : null
    >
    : IsLuxonDateTime<T> extends true
    ? DatePlus<"luxon">
    : IsJsDate<T> extends true
    ? DatePlus<"date", null>
    : DatePlus
    ;

/**
 * **asDateTime**`(input)`
 *
 * Converts common date representations to a Javascript Date object.
 *
 * - the goal is to have both **Date** and **Time** information preserved
 *     - use `asDate()` if you wish to only preserve date information
 *     - this will return the `DatePlus` interface which is just the `Date`
 * interface with a few extra properties to try and preserve the source
 * timezone where that's feasible
 */
export function asDateTime<T extends DateLike>(input: T) {
    // ——— Moment ————————————————————————————————————————————————
    if (isMoment(input)) {
        const d = new Date(input.toISOString()) as DatePlus;
        const tz: TimezoneOffset<"branded"> | null = isTimezoneOffset(input.format("Z"))
            ? input.format("Z") as TimezoneOffset<"branded">
            : null;

        d.offset = tz;
        d.tz = isIanaTimezone((input as any)._z?.name) ? (input as any)._z.name : null;

        d.source = "moment";
        d.sourceIso = input.toISOString() as IsoDateTime;
        return d as Returns<T>;
    }

    // ——— Luxon ————————————————————————————————————————————————
    if (isLuxonDate(input)) {
        const d = input.toJSDate() as DatePlus;

        // Luxon gives offset (minutes) + zone name
        d.offset = input.isOffsetFixed ? offsetMinutesToString(input.offset) : null;
        d.tz = isIanaTimezone(input.zoneName) ? input.zoneName : null;

        d.source = "luxon";
        d.sourceIso = input.toISO() as IsoDateTime; // already has zone/offset
        return d as Returns<T>;
    }


    // ——— Temporal ————————————————————————————————————————————————
    if (isTemporalDate(input)) {
        // Accept both Temporal.ZonedDateTime and Temporal.Instant
        const zdt = "epochNanoseconds" in input
            ? (input as Temporal.Instant).toZonedDateTimeISO(getLocalIanaZone())
            : (input as Temporal.ZonedDateTime);

        const d = new Date(zdt.epochMilliseconds) as DatePlus<"temporal">;

        d.offset = isTimezoneOffset(zdt.offset) ? zdt.offset : null;
        d.tz = isIanaTimezone(zdt.timeZone.id) ? zdt.timeZone.id : null;
        d.source = "temporal";
        d.sourceIso = zdt.toString() as IsoDateTime;               // keeps both offset + tz
        return d as Returns<T>;
    }

    // ——— ISO strings ————————————————————————————————————————————
    if (isIsoDateTime(input)) {
        const meta = parseIsoDate(input) as unknown as DateMeta;
        const d = new Date(input) as DatePlus;

        d.offset = meta.timezone as TimezoneOffset<"branded">;
        d.tz = null;                         // no zone in bare ISO
        d.source = "iso-datetime";
        d.sourceIso = input as IsoDateTime;

        return d as Returns<T>;
    }

    if (isIsoYearMonth(input)) {
        const meta = parseIsoDate(input) as unknown as DateMeta;
        const d = new Date(`${meta.year}-${meta.month}-01T00:00:00.000Z`) as DatePlus<"iso-year-month">;

        d.offset = "Z" as TimezoneOffset<"branded">;
        d.tz = null;
        d.source = "iso-year-month";
        d.sourceIso = `${meta.year}-${meta.month}-01T00:00:00.000Z` as IsoDateTime;
        return d as Returns<T>;
    }

    if (isIsoYear(input)) {
        const d = new Date(`${input}-01-01T00:00:00.000Z`) as DatePlus<"iso-year">;

        d.offset = "Z" as TimezoneOffset<"Z">;
        d.tz = null;
        d.source = "iso-year";
        d.sourceIso = `${input}-01-01T00:00:00.000Z` as IsoDateTime;
        return d as Returns<T>;
    }

    if (isIsoDate(input)) {
        const meta = parseIsoDate(input) as unknown as DateMeta;
        const d = new Date(`${meta.year}-${meta.month}-${meta.date}T00:00:00.000Z`) as DatePlus;

        d.offset = "Z" as TimezoneOffset<"Z">;
        d.tz = null;
        d.source = `iso-${meta.dateType}`;
        d.sourceIso = `${input}T00:00:00.000Z` as IsoDateTime;
        return d as Returns<T>;
    }

    // ——— Epoch numbers ——————————————————————————————————————————
    if (isNumber(input)) {
        if (isEpochInMilliseconds(input)) {
            const d = new Date(input) as DatePlus;
            d.offset = null;
            d.tz = null;
            d.source = "epoch-milliseconds";
            d.sourceIso = d.toISOString() as IsoDateTime;
            return d as Returns<T>;
        }
        if (isEpochInSeconds(input)) {
            const d = new Date(input * 1_000) as DatePlus;
            d.offset = null;
            d.tz = null;
            d.source = "epoch";
            d.sourceIso = d.toISOString() as IsoDateTime;
            return d as Returns<T>;
        }
    }

    // ——— Native Date ————————————————————————————————————————————
    if (isDate(input)) {
        const d = new Date(input.getTime()) as DatePlus<"date">;
        d.offset = null;
        d.tz = null;
        d.source = "date";
        d.sourceIso = d.toISOString() as IsoDateTime;
        return d as Returns<T>;
    }

    return null as never;
}
