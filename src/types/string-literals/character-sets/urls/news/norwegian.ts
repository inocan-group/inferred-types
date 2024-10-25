import {  NORWEGIAN_NEWS } from "src/constants/index";
import { Mutable } from "src/types/type-conversion/Mutable";
import { UrlsFrom } from "../Url";

type Lookup = Mutable<typeof NORWEGIAN_NEWS>;
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
 * A list of prominent Norwegian companies who are in the news business
 */
export type NorwegianNewsCompanies = Companies;

/**
 * URL's which point to companies involved in Norwegian news
 */
export type NorwegianNewsUrls = UrlsFrom<BaseUrls>;

