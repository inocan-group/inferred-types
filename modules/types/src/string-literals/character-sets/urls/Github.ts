import type { GITHUB_INSIGHT_CATEGORY_LOOKUP } from "inferred-types/constants";
import type { As, IsTrue, IsUnion, Keys, TupleToUnion, UnionToTuple } from "inferred-types/types";
import type { AddUrlPathSegment, OptUrlQueryParameters, UrlsFrom } from "./Url";

export type GithubUrl = UrlsFrom<[
  "https://github.com",
  "https://www.github.com",
  "https://github.io",
]>;

/** a Github _organization_ URL */
export type GithubOrgUrl = `https://github.com/${string}`;

/** a Github _repo_ URL */
export type GithubRepoUrl = `https://github.com/${string}/${string}`;

/** a Github URL for a _list of tags_ on a given _repo_ */
export type GithubRepoTagsUrl = `${GithubRepoUrl}/tags${OptUrlQueryParameters}`;

/** a Github URL for a _list of branches_ on a given _repo_ */
export type GithubRepoBranchesUrl = `${GithubRepoUrl}/branches${OptUrlQueryParameters}`;

/**
 * a Github URL for a _list of issues_ on a given _repo_.
 *
 * **Related:** `GithubRepoIssueUrl`
 */
export type GithubRepoIssuesListUrl = `${GithubRepoUrl}/issues${OptUrlQueryParameters}`;

/**
 * a Github URL for a _specific issus_ on a given _repo_.
 *
 * **Related:** `GithubRepoIssuesUrl`
 */
export type GithubRepoIssueUrl = `${GithubRepoUrl}/issues/${number}${OptUrlQueryParameters}`;

/**
 * a Github URL for a _list of pull requests_ on a given _repo_.
 *
 * **Related:** `GithubRepoPullRequestUrl`
 */
export type GithubRepoPullRequestsUrl = `${GithubRepoUrl}/pulls${OptUrlQueryParameters}`;

/**
 * a Github URL for a _specific pull requests_ in a given _repo_.
 *
 * **Related:** `GithubRepoPullRequestsUrl`
 */
export type GithubRepoPullRequestUrl = `${GithubRepoUrl}/pulls/${number}${OptUrlQueryParameters}`;

/**
 * a Github URL for a _list of discussions_ on a given _repo_.
 *
 * **Related:** `GithubRepoDiscussionUrl`
 */
export type GithubRepoDiscussionsUrl = `${GithubRepoUrl}/discussions${OptUrlQueryParameters}`;

/**
 * a Github URL for a _specific discussions_ in a given _repo_.
 *
 * **Related:** `GithubRepoDiscussionsUrl`
 */
export type GithubRepoDiscussionUrl = `${GithubRepoUrl}/discussions/${number}${OptUrlQueryParameters}`;

/**
 * a Github URL for a _list of releases_ on a given _repo_
 *
 * **Related:** `GithubRepoReleaseTagUrl`
 */
export type GithubRepoReleasesUrl = `${GithubRepoUrl}/releases${OptUrlQueryParameters}`;

/**
 * a Github URL for a _particular release_ of a given _repo_.
 *
 * **Related:** `GithubRepoReleasesUrl`
 */
export type GithubRepoReleaseTagUrl = `${GithubRepoUrl}/releases/tag/${string}`;

/**
 * a Github URL for a _list of projects_ on a given _repo_.
 *
 * **Related:** `GithubRepoProjectUrl`
 */
export type GithubRepoProjectsUrl = `${GithubRepoUrl}/projects${OptUrlQueryParameters}`;

/**
 * a Github URL for a _specific project_ on a given _repo_.
 *
 * **Related:** `GithubRepoProjectsUrl`
 */
export type GithubRepoProjectUrl = `${GithubRepoUrl}/projects/${number}${OptUrlQueryParameters}`;

/**
 * **GithubActionsUrl**`<[TOnlySummary]>`
 *
 * Provides a shape for either the _actions summary_ page of a repo on Github
 * or that plus any specific Job URLs.
 *
 * - by default it will show any actions related page but set `TOnlySummary` to false
 * if you're only wanting to match the summary page.
 */
export type GithubActionsUrl<TOnlySummary extends boolean = false> =
IsTrue<TOnlySummary> extends true
  ? `https://github.com/${string}/${string}/actions`
  : `https://github.com/${string}/${string}/actions` | `https://github.com/${string}/${string}/actions/${string}`;

type GithubLookup = typeof GITHUB_INSIGHT_CATEGORY_LOOKUP;
type GhLookup = {
  [K in keyof GithubLookup]: GithubLookup[K] extends string
    ? AddUrlPathSegment<
        `https://github.com/${string}`,
      GithubLookup[K]
    >
    : never;
};

/**
 * GithubInsightPageType
 *
 * The sub-pages found under the **Insights** tab of a repo.
 *
 * **Related:** `GithubInsightsUrl`
 */
export type GithubInsightPageType = TupleToUnion<Keys<GithubLookup>>;

type _GithubInsightUrl<
  T extends readonly GithubInsightPageType[],
> = {
  [K in keyof T]: T[K] extends string
    ? T[K] extends keyof GhLookup
      ? GhLookup[T[K]]
      : never
    : never

};

/**
 * **GithubInsightUrl**`<[T]>`
 *
 * Provides a URL shape that fits all of the _insights_ pages
 * for a repo on Github.
 *
 * - if you want to pair down the types of insight pages you're
 * matching for you can specify `T` as some union type of `GithubInsightPageType`
 */
export type GithubInsightUrl<
  T extends GithubInsightPageType = GithubInsightPageType,
> = IsUnion<T> extends true
  ? TupleToUnion<
    _GithubInsightUrl<As<UnionToTuple<T>, readonly GithubInsightPageType[]>>
  >
  : T extends keyof GhLookup
    ? GhLookup[T]
    : never;
