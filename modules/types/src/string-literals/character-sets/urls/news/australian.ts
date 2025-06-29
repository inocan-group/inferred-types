import type { AUSTRALIAN_NEWS } from "inferred-types/constants";
import type { Mutable } from "inferred-types/types";
import type { UrlsFrom } from "../Url";

type Lookup = Mutable<typeof AUSTRALIAN_NEWS>;
type Companies = {
    [K in keyof Lookup]: "company" extends keyof Lookup[K]
        ? Lookup[K]["company"]
        : never
}[number];
type BaseUrls = {
    [K in keyof Lookup]: "baseUrls" extends keyof Lookup[K]
        ? Lookup[K]["baseUrls"]
        : never
}[number];

/**
 * A list of prominent Australian companies who are in the news business
 */
export type AustralianNewsCompanies = Companies;

/**
 * URL's which point to companies involved in Australian news
 */
export type AustralianNewsUrls = UrlsFrom<BaseUrls>;
