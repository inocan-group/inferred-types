import type {
    AsDateMeta,
    DateMeta,
    Err,
    If,
    IsNull,
    Or,
    ParsedDate,
    Unbrand
} from "inferred-types/types";

type TimeInfo<T extends DateMeta> = T["hour"] extends null
    ? `00:00.00`
    : `${Unbrand<T["hour"]>}:${Unbrand<T["minute"]>}:${If<IsNull<T["second"]>, "00", `${Unbrand<T["second"]>}`>}.${If<IsNull<T["ms"]>, "000", Unbrand<T["ms"]>>}`;

/**
 * **ToUtc**`<T>`
 *
 * Converts a recognized date/datetime into a number that can be used
 * for comparison sake.
 *
 * - this is not meant to be used as a Date or DateTime value but simply
 * as a numeric representation for a time that can be compared _relatively_
 * to another Date/DateTime which has been converted to this form.
 * - to qualify, `T` must have at least year, month, and date. It may optionally
 * have time information.
 * - if the minimum information is not provided then an Error is returned
 *
 * Note:
 * - if `T` has a timezone offset, that is stripped and replaced with `Z`
 * - this will hopefully change in the future to adjust by the offset
 */
export type ToUtc<
    T extends ParsedDate | DateMeta,
    M extends DateMeta = T extends DateMeta ? T : AsDateMeta<T>
> = Or<[
    IsNull<M["year"]>,
    IsNull<M["month"]>,
    IsNull<M["date"]>
]> extends true
    ? Err<
        `incomplete/date`,
        `To get a relative date value from RelativeDateTime<T> the generic must contain year, month, and date information (and optionally time info). It did not meet this requirement.`,
        { info: M }
    >
    : `${Unbrand<M["year"]>}-${Unbrand<M["month"]>}-${Unbrand<M["date"]>}T${TimeInfo<M>}Z`;
;
