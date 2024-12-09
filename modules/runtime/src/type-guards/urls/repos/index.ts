import { RepoUrls } from "inferred-types/types";
import { isGithubUrl } from "./github";
import { isBitbucketUrl } from "./bitbucket";
import { isCodeCommitUrl } from "./codeCommit";

export * from "./github";
export * from "./bitbucket";
export * from "./codeCommit";
export * from "./isSemanticVersion"

/**
 * **isRepoUrl**`(val)`
 *
 * Type guard which validates that the value passed in is a valid Repo URL
 */
export const isRepoUrl = (val: unknown): val is RepoUrls => {
  return isGithubUrl(val) || isBitbucketUrl(val) || isCodeCommitUrl(val)
}

