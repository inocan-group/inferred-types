import { REPO_SOURCE_LOOKUP } from "inferred-types/dist/constants/index";
import { UrlsFrom } from "src/types/index";
import { isString } from "inferred-types/dist/runtime/index";

/**
 * **isCodeCommitUrl**`(val)`
 *
 * Type guard which validates that the value passed in is a valid AWS Code Commit URL
 */
export const isCodeCommitUrl = <T>(val: T): val is T & UrlsFrom<typeof REPO_SOURCE_LOOKUP["codecommit"]> => {
  const valid =  REPO_SOURCE_LOOKUP["codecommit"];
  return isString(val) && valid.some(i =>
    val === i ||
    val.startsWith(`${i}/`) ||
    val.startsWith(`${i}?`)
  );
}


