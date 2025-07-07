import { IsoDateTime, TimezoneOffset, IanaZone } from "inferred-types/types";

export type DateSource =
    | "date"
    | "temporal"
    | "luxon"
    | "date-fns"
    | "moment"
    | "epoch"
    | "epoch-milliseconds"
    | "day.js"
    | "iso-date"
    | "iso-year"
    | "iso-year-month"
    | "iso-year-independent"
    | "iso-datetime";

/**
 * The JS Date object with a bit more metadata.
 *
 * ### Ignorance is Bliss
 *
 * - **epoch** timestamps DO NOT have any conception of an _originating_
 * timezone
 * - the ever present **Date** object in Javascript also has zero
 * concept of an _originating_ timezone (in fact it really just stores
 * an _epoch_ in milliseconds for it's state)
 *
 * For these libraries, if you pass in an ISO DateTime string with
 * explicit timezone offsetting, the DateTime will be immediately
 * converted to UTC time and the local timezone provided in _originating_
 * source is lost.
 *
 * The `Date` object confusingly provides a `.getTimezoneOffset()` property
 * but this has **nothing** to the originating source and just reporting
 * the number of minutes of the timezone offset of the computer making the
 * call.
 *
 * ### Patience Rewards those who Wait
 *
 * The **Temporal** library, and 3rd party libraries like **Luxon** and
 * **Day.js** (with the timezone plugin) are aware.
 *
 * ### This Library
 *
 * This library provides a lot of support for various object based date
 * formats. The `asDateTime()` will standardize all of it's
 * supported types to a Javascript Date with the extra properties in
 * this interface.
 *
 * This interface, exists to try to preserve the originating source's
 * timezone information where it's available by adding a few additional
 * properties.
 */
export interface DatePlus<
    TSource extends DateSource = DateSource,
    TOffset extends null | TimezoneOffset = null | TimezoneOffset,
    TSourceIso = null | IsoDateTime,
> extends Date {
    /**
     * The originating timezone offset if the originating has a conception
     * of the originating timezone.
     *
     * - `null` will be stored when the source is not timezone aware
     * - `string` will represent the timezone offset in the same manner
     * as ISO's `+HH:MM`, `-HH:MM`, or `Z` for UTC.
     */
    offset: TOffset;

    /**
     * If a IANA Timezone is available from the source this will
     * be provided here.
     *
     * **Note:** this isn't fancy enough to actually account for
     * daylight savings, etc. Use a full timezone date library if you
     * need that.
     */
    tz: null | IanaZone;

    /**
     * the originating source representation structure
     */
    source: TSource;

    /**
     * If the originating `offset` was able to be captured, we'll
     * also capture a full ISO `DateTime` representation.
     */
    sourceIso: TSourceIso;
}
