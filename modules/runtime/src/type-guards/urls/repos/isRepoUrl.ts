import type { RepoUrls } from "inferred-types/types";
import { isBitbucketUrl } from "./bitbucket";
import { isCodeCommitUrl } from "./codeCommit";
import { isGithubUrl } from "./github";

/**
 * **isRepoUrl**`(val)`
 *
 * Type guard which validates that the value passed in is a valid Repo URL
 */
export function isRepoUrl(val: unknown): val is RepoUrls {
    return isGithubUrl(val) || isBitbucketUrl(val) || isCodeCommitUrl(val);
}
