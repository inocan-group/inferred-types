import { SOCIAL_MEDIA } from "src/constants/index";
import { Replace, UrlsFrom } from "src/types/index";

type Lookup = typeof SOCIAL_MEDIA;

type Companies = {
  [K in keyof Lookup]: "name" extends keyof Lookup[K]
    ? Lookup[K]["name"]
    : never
}[number];

type Urls = {
  [K in keyof Lookup]: "baseUrls" extends keyof Lookup[K]
    ? Lookup[K]["baseUrls"] extends readonly string[]
      ? Lookup[K]["baseUrls"][number]
      : never
    : never
}[number];

type Profiles = {
  [K in keyof Lookup]: "profileUrl" extends keyof Lookup[K]
    ? Lookup[K]["profileUrl"] extends string
      ? Replace<Lookup[K]["profileUrl"], ":user_id", `${string}`>
      : never
    : never
}[number];

/**
 * Platforms for social media
 */
export type SocialMediaPlatform = Companies;

/**
 * URLs which point to Social Media platforms
 */
export type SocialMediaUrl = UrlsFrom<Urls>;


/**
 * URLs which point to _user profiles_ on Social Media platforms
 */
export type SocialMediaProfileUrl = Profiles;

