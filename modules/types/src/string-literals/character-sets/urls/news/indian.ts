import {  INDIAN_NEWS } from "inferred-types/constants";
import { Mutable } from "inferred-types/types";
import { UrlsFrom } from "../Url";

type Lookup = Mutable<typeof INDIAN_NEWS>;
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
 * A list of prominent Indian companies who are in the news business
 */
export type IndianNewsCompanies = Companies;

/**
 * URL's which point to companies involved in Indian news
 */
export type IndianNewsUrls = UrlsFrom<BaseUrls>;

