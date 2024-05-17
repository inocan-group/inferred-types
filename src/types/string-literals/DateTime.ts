import { 
  DateSeparator,
  HoursMinutes, 
  HoursMinutesSeconds,
  TZ,
  Time,
  YMD,
  TypeRequired,
  TimeNomenclature,
  TimeResolution
} from "src/types/index";


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

