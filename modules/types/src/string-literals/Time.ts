import {  Default, EmptyObject, IndexOf, NonZeroNumericChar, NumericChar, NumericCharZeroToFive, PlusMinus, TypeRequired, TypeStrength } from "inferred-types/types";

type CivilianTwoDigitHour = "10" | "11" | "12";
export type TimeResolution = "HH:MM" | "HH:MM:SS" | "HH:MM:SS.ms";
export type TimeNomenclature = "military" | "civilian";
export type AmPmCase = "lower" | "upper" | "bare";


/**
 * **CivilianHours**`<[TFixedLengthHours]>`
 *
 * The _hours_ used in the civilian clock (aka, 1-12)
 */
export type CivilianHours<
  TFixedLengthHours extends boolean = false
> = TFixedLengthHours extends true
? `0${Exclude<NumericChar, "0">}` | CivilianTwoDigitHour
: NonZeroNumericChar | CivilianTwoDigitHour | `0${NonZeroNumericChar}`;

/**
 * **CivilianTimeOptions**
 *
 * The optional configuration for a civilian "time" type.
 */
export type CivilianTimeOptions = {
  strength?: TypeStrength;
  fixedLengthHours?: boolean;
  timezone?: TypeRequired;
  amPmCase?: AmPmCase;
}

/**
 * **MilitaryTimeOptions**
 *
 * The optional configuration for a military "time" type.
 */
export type MilitaryTimeOptions = Omit<CivilianTimeOptions, "amPmCase">;


/**
 * The user's options merged with default values
 */
type Opt<T extends MilitaryTimeOptions | CivilianTimeOptions> = {
  strength: Default<IndexOf<T, "strength", undefined>, "strong">;
  fixedLengthHours: Default<IndexOf<T, "fixedLengthHours", undefined>, false>;
  timezone: Default<IndexOf<T, "timezone", undefined>, "exclude">;
  amPmCase: Default<IndexOf<T, "amPmCase", undefined>, "lower">;
}


/**
 * **Minutes**`<[TStr]>`
 *
 * Provides a typing for the minutes component of Time (aka, 00 to 59).
 */
export type Minutes<TStr extends TypeStrength = "strong"> = TStr extends "strong"
  ? `${NumericCharZeroToFive}${NumericChar}`
  : `${NumericCharZeroToFive}${number}`;

/**
 * **Seconds**`<[TStr]>`
 *
 * Provides a typing for the seconds component of Time (aka, 00 to 59).
 */
export type Seconds<TStr extends TypeStrength = "strong"> = TStr extends "strong"
  ? `${NumericCharZeroToFive}${NumericChar}`
  : `${NumericCharZeroToFive}${number}`;

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
  TRequire extends "required" | "optional" | "exclude" = "required"
> = TRequire extends "exclude"
? ""
: TRequire extends "optional"
    ? `${PlusMinus}:${number}:${number}` | ""
    : `${PlusMinus}:${number}:${number}`;

/**
 * **TimeLike**
 *
 * A representation of _time_ values which aims to keep the typing
 * open to as many formats as possible but at the cost being somewhat
 * less detailed in it's typing.
 *
 * **Related:** `Time`, `MilitaryTime`, `CivilianTime`
 */
export type TimeLike = `${number}:${number}${`:${number}` | ""}${" " | ""}${"am" | "pm" | "AM" | "PM" | ""}${`${PlusMinus}:${number}:${number}` | ""}`


/**
 * **MilitaryHours**
 *
 * The _hours_ component of Time when using military nomenclature.
 */
export type MilitaryHours<
  TFixedLengthHours extends boolean = true
> = TFixedLengthHours extends true
? `${"0" | "1"}${NumericChar}` | "20" | "21" | "22" | "23"
: `${""|"0" | "1"}${NumericChar}` | "20" | "21" | "22" | "23";




/**
 * **HoursMinutes**`<[TOpt]>`
 *
 * Time expressed as just hours and minutes in military time.
 *
 * - by default the timezone is excluded but this can be modified
 * with the optional `TTimezone` generic.
 */
export type HoursMinutes<
  TOpt extends MilitaryTimeOptions = Opt<EmptyObject>
> = Opt<TOpt>["strength"] extends "strong"
  ? `${MilitaryHours<Opt<TOpt>["fixedLengthHours"]>}:${Minutes}${TZ<Opt<TOpt>["timezone"]>}`
  : `${number}:${number}${TZ<Opt<TOpt>["timezone"]>}`;

/**
 * **HoursMinutes12**`<[TOpt]>`
 *
 * Time expressed as just hours and minutes using the 12 hour civilian nomenclature
 * and requiring that an `AmPm<TCase>` indicator be included at the end of the time.
 *
 * **Note:** by default the `TCase` generic defaults to _lower_ which means that "am" and "pm"
 * are the expected markers for the 12 hour clock you are in.
 */
export type HoursMinutes12<
  TOpt extends CivilianTimeOptions = Opt<EmptyObject>
> = Opt<TOpt>["strength"] extends "strong"
? `${CivilianHours<Opt<TOpt>["fixedLengthHours"]>}:${NumericCharZeroToFive}${NumericChar}${AmPm<Opt<TOpt>["amPmCase"]>}${TZ<Opt<TOpt>["timezone"]>}`
: `${number}:${number}${AmPm<Opt<TOpt>["amPmCase"]>}${TZ< Opt<TOpt>["timezone"]>}`;

/**
 * **HoursMinutesSeconds**`<[TOpt]>`
 *
 * Time expressed in hours, minutes, and seconds in military nomenclature. Timezone is
 * excluded by default but can be enabled with `TTimezone` generic.
 */
export type HoursMinutesSeconds<
  TOpt extends MilitaryTimeOptions = Opt<EmptyObject>
> = Opt<TOpt>["strength"] extends "strong"
  ? `${HoursMinutes<TOpt>}:${Seconds<"simple">}${TZ<Opt<TOpt>["timezone"]>}`
  : `${number}:${number}:${number}${TZ<Opt<TOpt>["timezone"]>}`;


export type HoursMinutesSecondsMilliseconds<
  TOpt extends MilitaryTimeOptions = Opt<EmptyObject>
> = Opt<TOpt>["strength"] extends "strong"
  ? `${HoursMinutes}:${Seconds<"simple">}.${number}${TZ< Opt<TOpt>["timezone"]>}`
  : `${number}:${number}:${number}.${number}${TZ<Opt<TOpt>["timezone"]>}`;

/**
 * **HoursMinutesSeconds12**`<[TTimezone]>`
 *
 * Time expressed in hours, minutes, and seconds in civilian nomenclature. Timezone is
 * excluded by default but can be enabled with `TTimezone` generic.
 */
export type HoursMinutesSeconds12<
  TOpt extends CivilianTimeOptions = Opt<EmptyObject>
> = Opt<TOpt>["strength"] extends "strong"
? `${HoursMinutes}:${Seconds<"simple">}${AmPm<Opt<TOpt>["amPmCase"]>}${TZ<Opt<TOpt>["timezone"]>}`
: `${number}:${number}:${number}${AmPm<Opt<TOpt>["amPmCase"]>}${TZ<Opt<TOpt>["timezone"]>}`;

export type HoursMinutesSecondsMilliseconds12<
  TOpt extends CivilianTimeOptions = Opt<EmptyObject>
> = Opt<TOpt>["strength"] extends "strong"
? `${HoursMinutes}:${Seconds<"simple">}.${number}${AmPm<Opt<TOpt>["amPmCase"]>}${TZ< Opt<TOpt>["timezone"]>}`
: `${number}:${number}:${number}.${number}${AmPm<Opt<TOpt>["amPmCase"]>}${TZ<Opt<TOpt>["timezone"]>}`;

/**
 * **TimeInMinutes**`<TNomenclature,[TOpts]>`
 *
 * Time expressed with a time resolution of `HH:MM` (e.g., `12:43pm` or `23:15`).
 *
 * The nomenclatures of _military_ versus _civilian_ are both allowed
 * by default but can be isolated with the use the `TNomenclature` generic.
 */
export type TimeInMinutes<
  TNomenclature extends TimeNomenclature = "military",
  TOpt extends CivilianTimeOptions = Opt<EmptyObject>
> = TNomenclature extends "military"
  ? HoursMinutes<TOpt>
  : TNomenclature extends "civilian"
    ? HoursMinutes12<TOpt>
    : never;

/**
 * **TimeInSeconds**`<[TNomenclature],[TOpts]>`
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
  TNomenclature extends TimeNomenclature = "military",
  TOpt extends CivilianTimeOptions = Opt<EmptyObject>
> = TNomenclature extends "military"
  ? HoursMinutesSeconds<TOpt>
  : TNomenclature extends "civilian"
    ? HoursMinutesSeconds12<TOpt>
    : never;

export type TimeInMilliseconds<
  TNomenclature extends TimeNomenclature = "military",
  TOpt extends CivilianTimeOptions = Opt<EmptyObject>
> = TNomenclature extends "military"
    ? HoursMinutesSecondsMilliseconds<TOpt>
    : TNomenclature extends "civilian"
      ? HoursMinutesSecondsMilliseconds12<TOpt>
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
  TResolution extends TimeResolution,
  TOpt extends MilitaryTimeOptions = Opt<EmptyObject>
> = TResolution extends "all"
? TimeInMinutes<
  "military", {
      strength: "simple";
      timezone: Opt<TOpt>["timezone"];
      amPmCase: Opt<TOpt>["amPmCase"];
      fixedLengthHours: Opt<TOpt>["fixedLengthHours"];
    }>
  | TimeInSeconds<"military", {
      strength: "simple";
      timezone: Opt<TOpt>["timezone"];
      amPmCase: Opt<TOpt>["amPmCase"];
      fixedLengthHours: Opt<TOpt>["fixedLengthHours"];
    }>
  | TimeInMilliseconds<"military",{
    strength: "simple";
    timezone: Opt<TOpt>["timezone"];
    amPmCase: Opt<TOpt>["amPmCase"];
    fixedLengthHours: Opt<TOpt>["fixedLengthHours"];
    } >
: TResolution extends "HH:MM"
  ? HoursMinutes<TOpt>
  : TResolution extends "HH:MM:SS"
    ? HoursMinutesSeconds<TOpt>
    : TResolution extends "HH:MM:SS.ms"
      ? HoursMinutesSecondsMilliseconds<TOpt>
      : never;

/**
 * **CivilianTime**
 *
 * Allows time resolution of HH:MM or HH:MM:SS in civilian time (aka, 12 hour time with AM/PM).
 */
export type CivilianTime<
  TResolution extends TimeResolution,
  TOpt extends CivilianTimeOptions = Opt<EmptyObject>
> = TResolution extends "HH:MM"
  ? HoursMinutes12<TOpt>
  : TResolution extends "HH:MM:SS"
    ? HoursMinutesSeconds12<TOpt>
    : TResolution extends "HH:MM:SS.ms"
      ? HoursMinutesSecondsMilliseconds12<TOpt>
      : never;


/**
 * **Time**`<TResolution,[TNomenclature], [TOpts]>`
 *
 * A _simplified_ type for Time which accepts military and civilian
 * nomenclature as well as `HH:MM` and `HH:MM:SS` resolutions.
 *
 * You can use the `TNomenclature` and `TResolution` generics to constrain
 * what is allowed (and further simplify the type).
 *
 * **Related:** `MilitaryTime`, `CivilianTime`, `TimeLike`
 */
export type Time<
  TResolution extends TimeResolution,
  TNomenclature extends TimeNomenclature = "military",
  TOpt extends CivilianTimeOptions = Opt<EmptyObject>
> = TResolution extends "HH:MM"
    ? TimeInMinutes<TNomenclature, TOpt>

    : TResolution extends "HH:MM:SS"
      ? TimeInSeconds<TNomenclature, TOpt>

      : TResolution extends "HH:MM:SS.ms"
        ? TimeInMilliseconds<TNomenclature, {
            strength: "simple";
            timezone: Opt<TOpt>["timezone"];
            amPmCase: Opt<TOpt>["amPmCase"];
            fixedLengthHours: Opt<TOpt>["fixedLengthHours"];
          }>
        : never;
