import type {
    IANA_TIMEZONES,
    IANA_TIMEZONES__AFRICA,
    IANA_TIMEZONES__AMERICA,
    IANA_TIMEZONES__ANTARCTICA,
    IANA_TIMEZONES__ASIA,
    IANA_TIMEZONES__EUROPE,
    IANA_TIMEZONES__PACIFIC
} from "inferred-types/constants";

/**
 * The first _continent_-like component of an IANA Zone.
 */
export type IanaZoneArea =
    | `Africa`
    | `America`
    | `Antarctica`
    | `Asia`
    | `Europe`
    | `Pacific`;

/**
 * **IanaZone**`<[normal|strong]>`
 *
 * An official IANA Timezone Marker
 *
 * **Related:**
 * - `IanaAmerica`, `IanaAsia`, `IanaAfrica`, `IanaEurope`
 * - `IanaAntarctica`, `IanaPacific`
 * - `IanaZoneArea`
 *
 * **Note:**
 *
 * - the default variant of this type includes all possible IANA variants
 * but with roughly 400-500 variants there is some Typescript cost associated
 * - if you prefer a type to just keep the "guardrails on" you can use the
 * "weak" variant which provides some structure but doesn't ensure a
 * valid IANA Zone (nor does it provide "autocomplete" when used as a
 * parameter to a function)
 * - finally, if you _know_ the broad region of a user and you want
 * precision you can opt for a region specific "zone area" with one of
 * the related types above
 */
export type IanaZone<T extends "normal" | "weak" = "normal"> = T extends "normal"
    ? typeof IANA_TIMEZONES[number]
    : T extends "weak"
        ? `${IanaZoneArea}/${string}`
        : never;

/**
 * The official IANA Timezone markers from the Americas.
 */
export type IanaAmerica = typeof IANA_TIMEZONES__AMERICA[number];

/**
 * The official IANA Timezone markers from the Asia.
 */
export type IanaAsia = typeof IANA_TIMEZONES__ASIA[number];

/**
 * The official IANA Timezone markers from the Africa.
 */
export type IanaAfrica = typeof IANA_TIMEZONES__AFRICA[number];

/**
 * The official IANA Timezone markers from Europe.
 */
export type IanaEurope = typeof IANA_TIMEZONES__EUROPE[number];

/**
 * The official IANA Timezone markers from the Antarctica.
 */
export type IanaAntarctica = typeof IANA_TIMEZONES__ANTARCTICA[number];

/**
 * The official IANA Timezone markers from the Pacific.
 */
export type IanaPacific = typeof IANA_TIMEZONES__PACIFIC[number];
