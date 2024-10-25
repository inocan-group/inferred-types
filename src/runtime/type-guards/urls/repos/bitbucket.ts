import { REPO_SOURCE_LOOKUP } from "src/constants/index";
import { isString } from "../../isString";
import { UrlsFrom } from "src/types/index";

/**
 * **isBitbucketUrl**`(val)`
 *
 * Type guard which validates that the value passed in is a valid BitBucket URL
 */
export const isBitbucketUrl = <T>(val: T): val is T & UrlsFrom<typeof REPO_SOURCE_LOOKUP["bitbucket"]> => {
  const valid =  REPO_SOURCE_LOOKUP["bitbucket"];
  return isString(val) && valid.some(i =>
    val === i ||
    val.startsWith(`${i}/`) ||
    val.startsWith(`${i}?`)
  );
}

