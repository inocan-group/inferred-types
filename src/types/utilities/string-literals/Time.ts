import { NonZeroNumericChar, NumericChar, PlusMinus, TypeRequired, TypeStrength } from "src/types";

type CivilianTwoDigitHour = "10" | "11" | "12";
type CivilianOneDigitHour = NonZeroNumericChar | `0${NonZeroNumericChar}`;
type CivilianHour = CivilianTwoDigitHour | CivilianOneDigitHour;

export type TimeResolution = "HH:MM" | "HH:MM:SS" | "HH:MM:SS.ms";
export type TimeNomenclature = "military" | "civilian" | "either";
export type AmPmCase = "lower" | "upper" | "bare";

type ZeroToFive = "0" | "1" | "2" | "3" | "4" | "5";

/**
 * **Minutes**`<[TStr]>`
 * 
 * Provides a typing for the minutes component of Time (aka, 00 to 59).
 */
export type Minutes<TStr extends TypeStrength = "strong"> = TStr extends "strong"
  ? `${ZeroToFive}${NumericChar}`
  : `${ZeroToFive}${number}`;

/**
 * **Seconds**`<[TStr]>`
 * 
 * Provides a typing for the seconds component of Time (aka, 00 to 59).
 */
export type Seconds<TStr extends TypeStrength = "strong"> = TStr extends "strong"
  ? `${ZeroToFive}${NumericChar}`
  : `${ZeroToFive}${number}`;

/**
 * **Milliseconds**`<[TStr]>`
 * 
 * Provides a typing for the milliseconds component of Time (aka, 000 to 999).
 */
export type Milliseconds<TStr extends TypeStrength = "strong"> = TStr extends "strong"
  ? `${NumericChar}${NumericChar}${NumericChar}`
  : number;


export type AmPm<
  TCase extends AmPmCase = "lower"
> = TCase extends "lower"
? "am" | "pm"
: TCase extends "upper"
  ? "AM" | "PM"
  : "";


export type TzHourOffset = `0${NumericChar}` | "10" | "11";

/**
 * **TZ**`<TStrength>`
 * 
 * Creates a type for timezones.
 * 
 * - by default chooses a "strong" type but "simple" or "exclude"
 * are other options for the `TStrength` generic.
 */
export type TZ<
  TStr extends TypeStrength | "exclude" = "strong",
  TRequire extends "required" | "optional" | "exclude" = "required"
> = TRequire extends "exclude"
? ""
: TStr extends "strong"
  ? TRequire extends "optional"
    ? `${PlusMinus}${TzHourOffset}:${ZeroToFive}${NumericChar}` | ""
    : `${PlusMinus}${TzHourOffset}:${ZeroToFive}${NumericChar}`
  : TRequire extends "optional"
    ? `${PlusMinus}:${number}:${number}` | ""
    : `${PlusMinus}:${number}:${number}`;


type MilitaryTwoDigit = `1${NumericChar}` | "20" | "21" | "22" | "23";
type MilitarySingleDigit = NumericChar | `0${NumericChar}`;

/**
 * **MilitaryHours**
 * 
 * The _hours_ component of Time when using military nomenclature.
 */
export type MilitaryHours = MilitaryTwoDigit | MilitarySingleDigit;

/**
 * **HoursMinutes**`<[TStr], [TTimezone]>`
 * 
 * Time expressed as just hours and minutes in military time.
 * 
 * - by default the timezone is excluded but this can be modified
 * with the optional `TTimezone` generic.
 */
export type HoursMinutes<
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude"
> = TStr extends "strong"
  ? `${MilitaryHours}:${Minutes}${TZ<"strong", TTimezone>}`
  : `${number}:${number}${TZ<"simple", TTimezone>}`;

/**
 * **HoursMinutes12**`<[TCase], [TStr], [TTimezone]>`
 * 
 * Time expressed as just hours and minutes using the 12 hour civilian nomenclature
 * and requiring that an `AmPm<TCase>` indicator be included at the end of the time.
 * 
 * **Note:** by default the `TCase` generic defaults to _lower_ which means that "am" and "pm"
 * are the expected markers for the 12 hour clock you are in.
 */
export type HoursMinutes12<
TCase extends AmPmCase = "lower",
TStr extends TypeStrength = "strong",
TTimezone extends TypeRequired = "exclude",
> = TStr extends "strong"
? `${CivilianHour}:${ZeroToFive}${NumericChar}${AmPm<TCase>}${TZ<"strong", TTimezone>}`
: `${number}:${number}${AmPm<TCase>}${TZ<"simple", TTimezone>}`;

/**
 * **HoursMinutesSeconds**`<[TTimezone]>`
 * 
 * Time expressed in hours, minutes, and seconds in military nomenclature. Timezone is
 * excluded by default but can be enabled with `TTimezone` generic.
 */
export type HoursMinutesSeconds<
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude"
> = TStr extends "strong"
  ? `${HoursMinutes}:${Seconds<"simple">}${TZ<"simple", TTimezone>}`
  : `${number}:${number}:${number}${TZ<"simple", TTimezone>}`;

export type HoursMinutesSecondsMilliseconds<
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude"
> = TStr extends "strong"
  ? `${HoursMinutes}:${Seconds<"simple">}.${number}${TZ<"simple", TTimezone>}`
  : `${number}:${number}:${number}.${number}${TZ<"simple", TTimezone>}`;

/**
 * **HoursMinutesSeconds12**`<[TTimezone]>`
 * 
 * Time expressed in hours, minutes, and seconds in civilian nomenclature. Timezone is
 * excluded by default but can be enabled with `TTimezone` generic.
 */
export type HoursMinutesSeconds12<
  TCase extends AmPmCase = "lower",
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude",
> = TStr extends "strong"
? `${HoursMinutes}:${Seconds<"simple">}${AmPm<TCase>}${TZ<"simple", TTimezone>}`
: `${number}:${number}:${number}${AmPm<TCase>}${TZ<"simple", TTimezone>}`;

export type HoursMinutesSecondsMilliseconds12<
  TCase extends AmPmCase = "lower",
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude",
> = TStr extends "strong"
? `${HoursMinutes}:${Seconds<"simple">}.${number}${AmPm<TCase>}${TZ<"simple", TTimezone>}`
: `${number}:${number}:${number}.${number}${AmPm<TCase>}${TZ<"simple", TTimezone>}`;

/**
 * **TimeInMinutes**
 * 
 * Time expressed with a time resolution of `HH:MM` (e.g., `12:43pm` or `23:15`).
 * 
 * The nomenclatures of _military_ versus _civilian_ are both allowed
 * by default but can be isolated with the use the `TNomenclature` generic.
 */
export type TimeInMinutes<
  TNomenclature extends TimeNomenclature = "either",
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude",
  TCase extends AmPmCase = "lower"
> = TNomenclature extends "either"
? HoursMinutes<TStr, TTimezone> | HoursMinutes12<TCase, TStr, TTimezone>
: TNomenclature extends "military"
  ? HoursMinutes<TStr, TTimezone>
  : TNomenclature extends "civilian"
    ? HoursMinutes12<TCase, TStr, TTimezone>
    : never;

/**
 * **TimeInSeconds**
 * 
 * Time expressed in `HH:MM:SS` resolution. 
 * 
 * By default either military or civilian nomenclature is allowed but
 * this can be isolated by using the `TNomenclature` generic.
 * 
 * ```ts
 * const ex1: TimeInSeconds = "9:45:15pm";
 * const ex2: TimeInSeconds = "21:45:15"
 * ```
 */
export type TimeInSeconds<
  TNomenclature extends TimeNomenclature = "either",
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude",
  TCase extends AmPmCase = "lower"
> = TNomenclature extends "either"
? HoursMinutesSeconds<TStr, TTimezone> | HoursMinutesSeconds12<TCase, TStr, TTimezone>
: TNomenclature extends "military"
  ? HoursMinutesSeconds<TStr, TTimezone>
  : TNomenclature extends "civilian"
    ? HoursMinutesSeconds12<TCase, TStr, TTimezone>
    : never;

export type TimeInMilliseconds<
  TNomenclature extends TimeNomenclature = "either",
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude",
  TCase extends AmPmCase = "lower"
> = TNomenclature extends "either"
  ? HoursMinutesSecondsMilliseconds<TStr, TTimezone> | HoursMinutesSecondsMilliseconds12<TCase, TStr, TTimezone>
  : TNomenclature extends "military"
    ? HoursMinutesSecondsMilliseconds<TStr, TTimezone>
    : TNomenclature extends "civilian"
      ? HoursMinutesSecondsMilliseconds12<TCase, TStr, TTimezone>
      : never;


/**
 * **MilitaryTime**
 * 
 * Provides a type for military time.
 * 
 * - by default the resolution is "all" but can be modified with `TResolution`
 * - when _all_ time resolutions are allowed the strength is always set to "simple"
 * - in all other cases, `TStr` will specify the strength of the particular time 
 * resolution
 */
export type MilitaryTime<
  TResolution extends TimeResolution | "all",
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude"
> = TResolution extends "all"
? TimeInMinutes<"military", "simple"> | TimeInSeconds<"military", "simple"> | TimeInMilliseconds<"military", "simple">
: TResolution extends "HH:MM"
  ? HoursMinutes<TStr,TTimezone>
  : TResolution extends "HH:MM:SS"
    ? HoursMinutesSeconds<TStr,TTimezone>
    : TResolution extends "HH:MM:SS.ms"
      ? HoursMinutesSecondsMilliseconds<TStr,TTimezone>
      : never;

/**
 * **CivilianTime**
 * 
 * Allows time resolution of HH:MM or HH:MM:SS in civilian time (aka, 12 hour time with AM/PM).
 */
export type CivilianTime<
  TResolution extends TimeResolution | "all",
  TStr extends TypeStrength = "strong",
  TTimezone extends TypeRequired = "exclude",
  TCase extends AmPmCase = "lower"
> = TResolution extends "all"
? HoursMinutes12<TCase, "simple",TTimezone> 
  | HoursMinutesSeconds12<TCase,"simple",TTimezone>
  | HoursMinutesSeconds12<TCase,"simple",TTimezone>
: TResolution extends "HH:MM"
  ? HoursMinutes12<TCase, TStr, TTimezone>
  : TResolution extends "HH:MM:SS"
    ? HoursMinutesSeconds12<TCase, TStr, TTimezone>
    : TResolution extends "HH:MM:SS:ms"
      ? HoursMinutesSecondsMilliseconds12<TCase, TStr, TTimezone>
      : never;


/**
 * **Time**
 * 
 * A _simplified_ type for Time which accepts military and civilian
 * nomenclature as well as `HH:MM` and `HH:MM:SS` resolutions. 
 * 
 * You can use the `TNomenclature` and `TResolution` generics to constrain
 * what is allowed (and further simplify the type).
 * 
 * **Related:** `MilitaryTime`, `CivilianTime`, `TimeInMinutes`, `TimeInSeconds`
 */
export type Time<
  TNomenclature extends TimeNomenclature = "either",
  TResolution extends TimeResolution | "all" = "all",
  TTimezone extends TypeRequired = "exclude"
> = 
TResolution extends "all"
  ? TimeInSeconds<TNomenclature, "simple", TTimezone> 
    | TimeInMinutes<TNomenclature, "simple", TTimezone>
    | TimeInMilliseconds<TNomenclature, "simple", TTimezone>
  : TResolution extends "HH:MM"
    ? TimeInMinutes<TNomenclature, "simple", TTimezone>
    : TResolution extends "HH:MM:SS"
      ? TimeInSeconds<TNomenclature, "simple", TTimezone>
      : TResolution extends "HH:MM:SS.ms"
        ? TimeInMilliseconds<TNomenclature, "simple", TTimezone>
        : never;
