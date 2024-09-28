import {
  AlphaNumericChar,
  RepoSource,
  RepoUrls,
  SemanticVersion,
  UrlsFrom
} from "src/types/index";
import { REPO_SOURCES, REPO_SOURCE_LOOKUP } from "src/constants/index";
import { valuesOf, stripLeading, isString } from "src/runtime/index";

/**
 * **isRepoSource**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * `RepoSource`.
 */
export const isRepoSource = <T>(v: T): v is T & RepoSource => {
  return isString(v) && REPO_SOURCES.includes(v as any);
}

/**
 * **isSemanticVersion**`(val,[allowPrefix]=false)`
 *
 * Type guard which validates whether the value passed in is a
 * semantic version number.
 *
 * - the optional `allowPrefix` parameter allows for a lowercase "v"
 * to be prefixed to the version so that values like `v1.0.12` and
 * `v 1.0.12` are allowed.
 * - by default the `allowPrefix` option is set to false
 */
export const isSemanticVersion = <T,P extends boolean>(
  v:T,
  allowPrefix: P = false as P
): v is T & SemanticVersion<P> => {
  return (
    isString(v) &&
    v.split(".").length === 3 &&
    !Number.isNaN(Number(v.split(".")[1])) &&
    !Number.isNaN(Number(v.split(".")[2])) &&
    (
      !Number.isNaN(Number(v.split(".")[0])) ||
      (
        allowPrefix && !Number.isNaN(Number(stripLeading(v.split(".")[0], "v").trim()))
      )
    )
  );
}

/**
 * **isRepoUrl**`(val)`
 *
 * Type guard which validates that the value passed in is a valid Repo URL
 */
export const isRepoUrl = <T>(val: T): val is T & RepoUrls => {
  const baseUrls = valuesOf(REPO_SOURCE_LOOKUP).flat();
  return isString(val) && baseUrls.every(u =>
    val === u ||
    val.startsWith(`${u}/`)
  )
}


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


