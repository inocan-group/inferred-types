import type { JAPANESE_NEWS } from "inferred-types/constants";
import type { Mutable, UrlsFrom } from "inferred-types/types";

type Lookup = Mutable<typeof JAPANESE_NEWS>;
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
 * A list of prominent Japanese companies who are in the news business
 */
export type JapaneseNewsCompanies = Companies;

/**
 * URL's which point to companies involved in Japanese news
 */
export type JapaneseNewsUrls = UrlsFrom<BaseUrls>;
