import { REPO_SOURCE_LOOKUP } from "@inferred-types/constants";
import { UrlsFrom } from "@inferred-types/types";

type URL = typeof REPO_SOURCE_LOOKUP["bitbucket"];

/**
 * All valid URL signatures for a Bitbucket repo.
 */
export type BitbucketUrl = UrlsFrom<URL>;

/**
 * A URL pattern which will show the repositories for a given organization
 */
export type BitbucketRepoListUrl = `https://${URL[number]}/${string}/workspace/repositories`;


/**
 * A URL pattern which matches any repo content in a Bitbucket repo.
 */
export type BitbucketRepoUrl<
  TOrg extends string,
  TRepo extends string
> = `https://${URL[number]}/${TOrg}/${TRepo}`;


/**
 * A URL pattern which matches any repo's summary page (for a given branch)
 */
export type BitbucketRepoSummaryUrl<
  TOrg extends string,
  TRepo extends string,
  TBranch extends string
> = `https://${URL[number]}/${TOrg}/${TRepo}/src/${TBranch}`

/**
 * A URL pattern which matches a file in a given repo and branch
 */
export type BitbucketRepoFileUrl<
  TOrg extends string,
  TRepo extends string,
  TBranch extends string,
  TFilepath extends string
> = `https://${URL[number]}/${TOrg}/${TRepo}/src/${TBranch}/${TFilepath}`

export type BitbucketRepoPipelines<
  TOrg extends string,
  TRepo extends string,
> = `https://${URL[number]}/${TOrg}/${TRepo}/pipelines`

export type BitbucketRepoBranchList<
  TOrg extends string,
  TRepo extends string,
> = `https://${URL[number]}/${TOrg}/${TRepo}/branches/`

export type BitbucketRepoCommitsByBranch<
  TOrg extends string,
  TRepo extends string,
  TBranch extends string,
> = `https://${URL[number]}/${TOrg}/${TRepo}/commits/branch/${TBranch}`

export type BitbucketRepoCommit<
  TOrg extends string,
  TRepo extends string,
  TCommit extends string,
> = `https://${URL[number]}/${TOrg}/${TRepo}/commits/${TCommit}`


export type BitbucketRepoPullRequests<
  TOrg extends string,
  TRepo extends string,
> = `https://${URL[number]}/${TOrg}/${TRepo}/pull-requests/${string}`
