import type { Suggest } from "../Suggest";

/**
 * The [BCP47 standard](https://en.wikipedia.org/wiki/IETF_language_tag) is
 * used to specify a country or region.
 *
 * Notes:
 *
 * - it is also used heavily in Javascript, such as the for Locale strings, etc.
 * - this type is not exhaustive but rather just suggests some and allows all
 */
export type BCP47 = Suggest<
    | "af"
    | "be"
    | "bg"
    | "cy"
    | "en"
    | "es"
    | "fi"
    | "ga"
    | "it"
    | "ja"
    | "ko"
    | "hy"
    | "nl"
    | "no"
    | "pl"
    | "pt"
    | "sa"
    | "sv"
    | "ru"
    | "th"
    | "tr"
    | "uk"
    | "ur"
    | "zh"
>;
