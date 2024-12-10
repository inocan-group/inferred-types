import type { UrlsFrom } from "inferred-types/types";
import { REPO_SOURCE_LOOKUP } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

/**
 * **isCodeCommitUrl**`(val)`
 *
 * Type guard which validates that the value passed in is a valid AWS Code Commit URL
 */
export function isCodeCommitUrl<T>(val: T): val is T & UrlsFrom<typeof REPO_SOURCE_LOOKUP["codecommit"]> {
  const valid = REPO_SOURCE_LOOKUP.codecommit;
  return isString(val) && valid.some(i =>
    val === i
    || val.startsWith(`${i}/`)
    || val.startsWith(`${i}?`),
  );
}
