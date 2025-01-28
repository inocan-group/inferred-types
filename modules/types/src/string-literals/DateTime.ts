import type {
  DateSeparator,
  HoursMinutes,
  HoursMinutesSeconds,
  NumericChar,
  NumericCharZeroToFive,
  Opt,
  OptNumber,
  Time,
  TimeNomenclature,
  TimeResolution,
  TypeRequired,
  TZ,
  YMD,
} from "inferred-types/types";

/**
 * The ISO8601 standard means of representing a _timezone_. `Z` by itself represents UTC.
 */
export type Timezone = `${Opt<"Z">}${"+" | "-"}${number}` | `${Opt<"Z">}${"+" | "-"}${number}:${number}` | "Z";

/**
 * **DateTimeMinutes**
 *
 * The date and time with time resolution of minutes.
 */
export type DateTimeMinutes<
  S extends DateSeparator = DateSeparator,
> = `${YMD<S>} ${HoursMinutes<{ strength: "simple" }>}`;

export type DateTimeSeconds<
  S extends DateSeparator = DateSeparator,
> = `${YMD<S>} ${HoursMinutesSeconds<{ strength: "simple" }>}`;

/**
 * **DateTime**`<S>`
 *
 * A simplified way of representing any supported representation
 * of a `DateTime` string.
 *
 * **Note:** the most common and best choice is often the `Iso8601`
 * datetime representation.
 */
export type DateTime<
  TResolution extends TimeResolution = "HH:MM:SS",
  TNomenclature extends TimeNomenclature = "military",
  TTimezone extends TypeRequired = "exclude",
  TSep extends DateSeparator = "-",
> = `${YMD<TSep>} ${Time<TResolution, TNomenclature, { timezone: TTimezone; strength: "simple" }>}`;

type IsoExplicitness = "both" | "explicit" | "implicit";

type Month = `0${NumericChar}` | `10` | `11` | `12`;
type Date = `${"0" | "1" | "2"}${NumericChar}` | "30" | "31";

/**
 * A calendar date -- by the [**ISO8601**](https://en.wikipedia.org/wiki/ISO_8601) standard --
 * must be represented as:
 *
 * 1. `YYYY-MM-DD`, or
 * 2. `YYYYMMDD`
 *
 * You can use the generic `T` to choose whether you want to use the explicit, implicit, or
 * allow both formats for the date.
 */
export type Iso8601Date<
  T extends IsoExplicitness = "explicit",
> = T extends "explicit"
  ? `${number}-${Month}-${Date}`
  : T extends "implicit"
    ? `${number}${Month}${Date}`
    : `${number}-${Month}-${Date}` | `${number}${Month}${Date}`;

/**
 * **Iso8601Year**
 *
 * A year represented by the [**ISO8601**](https://en.wikipedia.org/wiki/ISO_8601) standard.
 * It is represented as either:
 *
 * 1. `YYYY` (the standard way)
 * 2. `+`/`-` followed by `YYYYY` for years beyond the range of 0000 and 9999
 */
export type Iso8601Year = `${NumericChar}${NumericChar}${NumericChar}${NumericChar}` | `${"+" | "-"}${number}`;

type IsoTimeSymbol<T extends IsoExplicitness> = T extends "both"
  ? "T" | ""
  : T extends "explicit"
    ? "T"
    : "";
type IsoHour = `${"0" | "1" | "2"}${NumericChar}`;
type IsoMonth = `${NumericCharZeroToFive}${NumericChar}`;

/**
 * **Iso8601Time**`<[TExplicit], [TZ]>`
 *
 * The [**ISO8601**](https://en.wikipedia.org/wiki/ISO_8601) standard's representation of a **time**.
 *
 * This allows for the following structures:
 *
 * - `[hh][mm]`
 * - `[hh][mm][ss]`
 * - `[hh][mm][ss].[mmm]`
 *
 * The `TExplicit` generic can express whether the leading `T` is required as it is in the _explicit_ form. This generic
 * can take any of the following values: `explicit`, `implicit` or (by default) `both`.
 *
 * A time can express a _timezone_ along with the numeric value. A time with a timezone
 */
export type Iso8601Time<
  TExplicit extends IsoExplicitness = "both",
  TZ extends Timezone | "" = "",
> = TExplicit extends "explicit"
  ? `${IsoTimeSymbol<TExplicit>}${IsoHour}:${IsoMonth}${TZ}`
  : TExplicit extends "implicit"
    ? `${IsoTimeSymbol<TExplicit>}${IsoHour}:${IsoMonth}:${number}${TZ}`
    : `${IsoTimeSymbol<TExplicit>}${IsoHour}:${IsoMonth}${TZ}` | `${IsoTimeSymbol<TExplicit>}${IsoHour}:${IsoMonth}:${number}${TZ}`;

/**
 * **Iso8601DateTime**`<[TZ]>`
 *
 * A [**ISO8601**](https://en.wikipedia.org/wiki/ISO_8601) representation
 * of a DateTime.
 *
 * - by default, the timezone is considered optional but you can adjust this with the `TZ`
 * generic.
 */
export type Iso8601DateTime<
  TZ extends Timezone | "" = Timezone | "",
> = `${number}-${number}-${number}T${number}:${number}:${number}${TZ}`;

/**
 * **Iso8601**<TStrength>
 *
 * Creates typing for the [**ISO8601**](https://en.wikipedia.org/wiki/ISO_8601)
 * datetime format.
 *
 * - the strength/complexity of the type can be set with `TStrength`
 * - a timezone is optional by default but can be isolated to "required" or "excluded"
 */
export type Iso8601<
  TTimezone extends TypeRequired = "optional",
> = `${number}-${number}-${number}T${number}:${number}:${number}.${number}${TZ<TTimezone>}`;

/**
 * **DateLike**
 *
 * Represents structural patterns that look like a type that is a **date**.
 *
 * - a _number_ is assumed to be a Unix Epoch timestamp
 * - the string literal format is meant to match
 * the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) spec
 * "YYYY-MM-DD" format.
 * - and then we have look for objects which _look like_:
 *    - **MomentJS**'s DateTime object
 *    - **DateFns**'s DateTime object
 *    - **Luxon**'s DateTime object
 *    - **Javascript**'s Date object
 */
export type DateLike = number
  | `${number}`
  | `${number}-${number}-${number}`
  | `${number}-${number}-${number}T${number}:${number}:${number}Z`
  | { isValid: () => boolean; toDate: () => Date } // MomentJS DateTime
  | { toDate: () => Date } // Luxon DateTime
  | { getTime: () => number } // Javascript Date object
  | { startOfDay: () => Date }; // DateFns-like object

/**
 * **Iso8601DateRepresentation**
 *
 * A branded representation of an `Iso8601Date` with mild type checking.
 *
 * **Related:** `Iso8601Date`, `Iso8601DateTime`
 */
export type Iso8601DateRepresentation = `${number}-${number}-${number}` & {
  brand: "Iso8601Date";
};

/**
 * **Iso8601TimeRepresentation**
 *
 * A branded representation of an `Iso8601Time` with mild type checking.
 *
 * **Related:** `Iso8601Time`, `Iso8601Date`, `Iso8601DateTime`
 */
export type Iso8601TimeRepresentation = `${number}:${number}` | `${number}:${number}:${number}${OptNumber<".">}` & {
  brand: "Iso8601Time";
};

/**
 * **Iso8601DateTimeRepresentation**
 *
 * A branded representation of an `Iso8601DateTime` with mild type checking.
 *
 * **Related:** `Iso8601Time`, `Iso8601Date`, `Iso8601DateTime`
 */
export type Iso8601DateTimeRepresentation = `${number}-${number}-${number}T${number}:${number}`
  | `${number}-${number}-${number}T${number}:${number}:${number}${OptNumber<".">}` & {
    brand: "Iso8601DateTime";
  };

declare const __epochinms: unique symbol;

/**
 * An Epoch timestamp in milliseconds
 *
 * - assumes dates after July 14th, 1970 to avoid conflict with
 * timestamps in seconds
 * - or any date if not _auto detected_
 *
 * **Related:** `isEpochInMilliseconds()`, `isEpoch()`
 */
export type EpochInMs = number & {
  [__epochinms]: "EpochInMs";
};

declare const __epochinseconds: unique symbol;

/**
 * An Epoch timestamp in seconds
 *
 * - assumes dates before Jan 1st, 2500 to avoid conflict with timestamps
 * in milliseconds
 * - or any date if not _auto detected_
 *
 * **Related:** `isEpochInSeconds()`, `isEpoch()`
 */
export type EpochInSeconds = number & {
  [__epochinseconds]: "EpochInSeconds";
};
