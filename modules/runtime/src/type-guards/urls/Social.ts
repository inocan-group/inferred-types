import type { SocialMediaUrl } from "inferred-types/types";
import { SOCIAL_MEDIA } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = SOCIAL_MEDIA.flatMap(i => i.baseUrls);
const PROFILE = SOCIAL_MEDIA.map(i => i.profileUrl);

/**
 * type guard which validates that `val` is a social media URL.
 *
 * **Related:** `isSocialMediaProfileUrl`
 */
export function isSocialMediaUrl(val: unknown): val is SocialMediaUrl {
  return isString(val) && URL.some(i => val.startsWith(i));
}

/**
 * type guard which validates that `val` is a user profile URL on a social
 * media platform.
 *
 * **Related:** `isSocialMediaUrl`
 */
export function isSocialMediaProfileUrl(val: unknown): val is SocialMediaUrl {
  return isString(val) && PROFILE.some(i => i.startsWith(`${i}`));
}
