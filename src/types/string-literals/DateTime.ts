import { 
  DateSeparator,
  HoursMinutes, 
  HoursMinutesSeconds,
  TZ,
  Time,
  YMD,
  TypeStrength,
  TypeRequired,
  MilitaryHours,
  Minutes,
  TimeNomenclature,
  TimeResolution
} from "src/types";


/**
 * **DateTimeMinutes**
 * 
 * The date and time with time resolution of minutes.
 */
export type DateTimeMinutes<
  S extends DateSeparator = DateSeparator
> = `${YMD<"simple",S>} ${HoursMinutes}`;

export type DateTimeSeconds<
  S extends DateSeparator = DateSeparator
> = `${YMD<"simple",S>} ${HoursMinutesSeconds}`;


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
  TNomenclature extends TimeNomenclature = "either",
  TResolution extends TimeResolution | "all" = "all",
  TTimezone extends TypeRequired = "exclude",
  TSep extends DateSeparator = "-"
> = `${YMD<"simple",TSep>} ${Time<TNomenclature,TResolution,TTimezone>}`;


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
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "optional"
> = TStr extends "strong"
  ? `${YMD<"simple">}T${MilitaryHours}:${Minutes<"simple">}:${number}.${number}${TZ<"simple", TTimezone>}`
  // simple representation
  : `${number}-${number}-${number}T${number}:${number}:${number}.${number}${TZ<"simple", TTimezone>}`;

