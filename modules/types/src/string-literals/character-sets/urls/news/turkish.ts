import type { TURKISH_NEWS } from "inferred-types/constants";
import type { Mutable } from "inferred-types/types";
import type { UrlsFrom } from "inferred-types/types";

type Lookup = Mutable<typeof TURKISH_NEWS>;
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
 * A list of prominent Turkish companies who are in the news business
 */
export type TurkishNewsCompanies = Companies;

/**
 * URL's which point to companies involved in Turkish news
 */
export type TurkishNewsUrls = UrlsFrom<BaseUrls>;
