import type { RepoUrls } from "inferred-types/types";
import { isBitbucketUrl, isCodeCommitUrl, isGithubUrl } from "runtime/type-guards";

/**
 * **isRepoUrl**`(val)`
 *
 * Type guard which validates that the value passed in is a valid Repo URL
 */
export function isRepoUrl(val: unknown): val is RepoUrls {
    return isGithubUrl(val) || isBitbucketUrl(val) || isCodeCommitUrl(val);
}
