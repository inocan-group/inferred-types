import { REPO_SOURCE_LOOKUP } from "src/constants/index";
import { UrlsFrom } from "src/types/index";
import { isString } from "../../isString";

/**
 * **isCodeCommitUrl**`(val)`
 *
 * Type guard which validates that the value passed in is a valid AWS Code Commit URL
 */
export const isCodeCommitUrl = <T>(val: T): val is T & UrlsFrom<typeof REPO_SOURCE_LOOKUP["codecommit"]> => {
  const baseUrls = REPO_SOURCE_LOOKUP["codecommit"];
  return isString(val) && baseUrls.every(u =>
    val === u ||
    val.startsWith(`${u}/`)
  )
}
