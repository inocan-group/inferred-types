import type { DUTCH_NEWS } from "inferred-types/constants";
import type { Mutable } from "inferred-types/types";
import type { UrlsFrom } from "../Url";

type Lookup = Mutable<typeof DUTCH_NEWS>;
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
 * A list of prominent Dutch companies who are in the news business
 */
export type DutchNewsCompanies = Companies;

/**
 * URL's which point to companies involved in Dutch news
 */
export type DutchNewsUrls = UrlsFrom<BaseUrls>;
