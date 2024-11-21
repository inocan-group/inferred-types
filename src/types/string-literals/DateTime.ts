import {
  DateSeparator,
  HoursMinutes,
  HoursMinutesSeconds,
  TZ,
  Time,
  YMD,
  TypeRequired,
  TimeNomenclature,
  TimeResolution,
  NumericChar,
  NumericCharZeroToFive
} from "inferred-types/dist/types/index";


/**
 * The ISO8601 standard means of representing a _timezone_. `Z` by itself represents UTC.
 */
export type Timezone = `Z${"+"|"-"}${number}` | `Z${"+"|"-"}${number}:${number}` | "Z";

/**
 * **DateTimeMinutes**
 *
 * The date and time with time resolution of minutes.
 */
export type DateTimeMinutes<
  S extends DateSeparator = DateSeparator
> = `${YMD<S>} ${HoursMinutes<{strength: "simple"}>}`;

export type DateTimeSeconds<
  S extends DateSeparator = DateSeparator
> = `${YMD<S>} ${HoursMinutesSeconds<{strength: "simple"}>}`;

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
  TSep extends DateSeparator = "-"
> = `${YMD<TSep>} ${Time<TResolution,TNomenclature,{timezone: TTimezone; strength: "simple"}>}`;

type IsoExplicitness = "both" | "explicit" | "implicit";

type Month = `0${NumericChar}`| `10` | `11` | `12`
type Date = `${"0"|"1"|"2"}${NumericChar}` | "30" | "31";

/**
 * A calendar date -- by the ISO-8601 standard -- must be represented as:
 *
 * 1. `YYYY-MM-DD`, or
 * 2. `YYYYMMDD`
 *
 * You can use the generic `T` to choose whether you want to use the explicit, implicit, or
 * allow both formats for the date.
 */
export type Iso8601Date<
  T extends IsoExplicitness = "explicit"
> = T extends "explicit"
? `${number}-${Month}-${Date}`
: T extends "implicit"
? `${number}${Month}${Date}`
: `${number}-${Month}-${Date}` | `${number}${Month}${Date}`;



/**
 * **Iso8601Year**
 *
 * A year represented by the ISO-8601 standard. It is represented as either:
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
 * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard's representation of a **time**.
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
  TZ extends Timezone | "" = ""
> = TExplicit extends "explicit"
? `${IsoTimeSymbol<TExplicit>}${IsoHour}:${IsoMonth}${TZ}`
: TExplicit extends "implicit"
? `${IsoTimeSymbol<TExplicit>}${IsoHour}:${IsoMonth}:${number}.${number}${TZ}`
: `${IsoTimeSymbol<TExplicit>}${IsoHour}:${IsoMonth}${TZ}` | `${IsoTimeSymbol<TExplicit>}${IsoHour}:${IsoMonth}:${number}.${number}${TZ}`;


/**
 * **Iso8601DateTime**`<[TExplicit],[TZ]>`
 *
 * A strongly typed [ISO 8601]() representation of a DateTime.
 *
 * - by default it enforces the "explicit" syntaxes used most commonly in the standard
 * but you can change `TExplicit` to moodify this default.
 * - by default, the timezone is considered optional but you can adjust this with the `TZ`
 * generic.
 */
export type Iso8601DateTime<
  TZ extends Timezone | "" = Timezone | ""
> = `${number}-${number}-${number}${Iso8601Time<"explicit">}${TZ}`;


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
  TTimezone extends TypeRequired = "optional"
> = `${number}-${number}-${number}T${number}:${number}:${number}.${number}${TZ<TTimezone>}`
