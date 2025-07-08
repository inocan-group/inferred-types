import type { UK_NEWS } from "inferred-types/constants";
import type { Mutable } from "inferred-types/types";
import type { UrlsFrom } from "inferred-types/types";

type Lookup = Mutable<typeof UK_NEWS>;
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
 * A list of prominent UK companies who are in the news business
 */
export type UkNewsCompanies = Companies;

/**
 * URL's which point to companies involved in UK news
 */
export type UkNewsUrls = UrlsFrom<BaseUrls>;
