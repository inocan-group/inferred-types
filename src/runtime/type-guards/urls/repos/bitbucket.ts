import { REPO_SOURCE_LOOKUP } from "inferred-types/constants";
import { isString } from "inferred-types/dist/runtime/index";
import { UrlsFrom } from "inferred-types/types";

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

