import type { US_NEWS } from "inferred-types/constants";
import type { Mutable } from "inferred-types/types";
import type { UrlsFrom } from "../Url";

type Lookup = Mutable<typeof US_NEWS>;
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
 * A list of prominent US companies who are in the news business
 */
export type UsNewsCompanies = Companies;

/**
 * URL's which point to companies involved in US news
 */
export type UsNewsUrls = UrlsFrom<BaseUrls>;
