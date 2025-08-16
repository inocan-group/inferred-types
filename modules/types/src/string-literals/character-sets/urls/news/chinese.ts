import type { CHINESE_NEWS } from "inferred-types/constants";
import type { Mutable, UrlsFrom } from "inferred-types/types";

type Lookup = Mutable<typeof CHINESE_NEWS>;
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
 * A list of prominent Chinese companies who are in the news business
 */
export type ChineseNewsCompanies = Companies;

/**
 * URL's which point to companies involved in Chinese news
 */
export type ChineseNewsUrls = UrlsFrom<BaseUrls>;
