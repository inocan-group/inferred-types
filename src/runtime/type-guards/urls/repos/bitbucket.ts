import { REPO_SOURCE_LOOKUP } from "src/constants/index";
import { isString } from "../../isString";
import { UrlsFrom } from "src/types/index";

/**
 * **isBitbucketUrl**`(val)`
 *
 * Type guard which validates that the value passed in is a valid BitBucket URL
 */
export const isBitbucketUrl = <T>(val: T): val is T & UrlsFrom<typeof REPO_SOURCE_LOOKUP["bitbucket"]> => {
  const baseUrls = REPO_SOURCE_LOOKUP["bitbucket"];
  return isString(val) && baseUrls.every(u =>
    val === u ||
    val.startsWith(`${u}/`)
  )
}

