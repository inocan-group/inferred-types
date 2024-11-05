import {  BELGIUM_NEWS } from "inferred-types/dist/constants/index";
import { Mutable } from "src/types/type-conversion/Mutable";
import { UrlsFrom } from "../Url";

type Lookup = Mutable<typeof BELGIUM_NEWS>;
type Companies = {
  [K in keyof Lookup]: "company" extends keyof Lookup[K]
    ? Lookup[K]["company"]
    : never
}[number];
type BaseUrls = {
  [K in keyof Lookup]: "baseUrls" extends keyof Lookup[K]
    ? Lookup[K]["baseUrls"]
    : never
}[number]

/**
 * A list of prominent Belgian companies who are in the news business
 */
export type BelgianNewsCompanies = Companies;

/**
 * URL's which point to companies involved in Belgian news
 */
export type BelgianNewsUrls = UrlsFrom<BaseUrls>;

