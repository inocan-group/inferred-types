import { SocialMediaUrl } from "src/types/string-literals";
import { isString } from "../isString";
import { SOCIAL_MEDIA } from "src/constants/Social";

const URL = SOCIAL_MEDIA.flatMap(i => i.baseUrls);
const PROFILE = SOCIAL_MEDIA.map(i => i.profileUrl);

/**
 * type guard which validates that `val` is a social media URL.
 *
 * **Related:** `isSocialMediaProfileUrl`
 */
export const isSocialMediaUrl = (val: unknown): val is SocialMediaUrl => {
  return isString(val) && URL.some(i => val.startsWith(i))
}

/**
 * type guard which validates that `val` is a user profile URL on a social
 * media platform.
 *
 * **Related:** `isSocialMediaUrl`
 */
export const isSocialMediaProfileUrl = (val: unknown): val is SocialMediaUrl => {
  return isString(val) && PROFILE.some(i => i.startsWith(`${i}`))
}
