import {
  Mutable,
  TupleToUnion,
  OptionalSpace,
  Values,
  Flatten,
  UrlsFrom,
  AlphaNumericChar,
  GetUrlPath,
  IsTrue,
  Keys,
  AddUrlPathSegment,
  IsUnion,
  UnionToTuple,
  As
} from "src/types/index";
import type {  GITHUB_INSIGHT_CATEGORY_LOOKUP, REPO_PAGE_TYPES, REPO_SOURCES, REPO_SOURCE_LOOKUP } from "src/constants/index";

import { Constant } from "src/constants/index";

/**
 * **RepoSources**
 *
 * common sources for source code repositories.
 */
export type RepoSource = TupleToUnion<Mutable<typeof REPO_SOURCES>>;

/**
 * **RepoPageType**
 *
 * a union of descriptive page names you'd expect to find in a source
 * code repository.
 */
export type RepoPageType = TupleToUnion<Mutable<typeof REPO_PAGE_TYPES>>;

export type RepoUrls = UrlsFrom<Flatten<
  Mutable<Values<typeof REPO_SOURCE_LOOKUP>>
>>;

/**
 * **SemanticVersion**`<[TAllowPrefix]>`
 *
 * Provides a type for _sematic versions_.
 *
 * - by default it not only allows the `${major}.${minor}.${patch}` nomenclature
 * but also _optionally_ allows a prefix of `v`:
 *    - `0.10.1` - valid
 *    - `v0.10.1` - also valid
 *    - `v 0.10.1` - also valid
 * - this prefixing can be disabled by setting `TPrefix` to false
 */
export type SemanticVersion<
  TPrefix extends boolean = true
> = `${[TPrefix] extends [true] ? `${"v" | ""}${OptionalSpace}` : ""}${number}.${number}.${number}`


/**
 * **GitRef**
 *
 * A type that provides the basic shape of a non-HTTP reference
 * to a Git repository.
 */
export type GitRef = `git@${string}.${string}:${string}.git`


/**
 * **GithubRepoUrl**`<[T]>`
 *
 * A type which represents the pattern of a URL pointing a repository
 * on Github.
 *
 * When used _without the provided generic_ it provides a decent shape but will introduce
 * false positives due to URL subpaths that exist.
 *
 * If you pass the value through the generic `T` then it will proxy the value through
 * if it's a valid Repo URL (including a subpath validation) or `never` if it is not.
 */
export type GithubRepoUrl<T = Constant<"not-set">> = T extends Constant<"not-set">
? `https://github.com/${string}/${AlphaNumericChar | "-" | "_"}${string}`
: T extends `https://github.com/${string}/${AlphaNumericChar| "-" | "_"}${string}`
  ? GetUrlPath<T> extends `/${string}/${string}/${string}`
    ? never
    : T
  : never;

/**
 * **GithubIssuesUrl**`<[TOnlySummary]>`
 *
 * Provides a shape for either the _issues summary_ page of a repo on Github
 * or that plus any specific _issue_ URLs.
 *
 * - by default it will show any issues page but set `TOnlySummary` to false
 * if you're only wanting to match the summary page.
 */
export type GithubIssuesUrl<TOnlySummary extends boolean = false> =
[IsTrue<TOnlySummary>] extends [true]
? `https://github.com/${string}/${string}/issues`
: `https://github.com/${string}/${string}/issues` | `https://github.com/${string}/${string}/issues/${string}`;

/**
 * **GithubProjectsUrl**`<[TOnlySummary]>`
 *
 * Provides a shape for either the _projects summary_ page of a repo on Github
 * or that plus any specific _issue_ URLs.
 *
 * - by default it will show any Projects page but set `TOnlySummary` to false
 * if you're only wanting to match the summary page.
 */
export type GithubProjectsUrl<TOnlySummary extends boolean = false> =
IsTrue<TOnlySummary> extends true
? `https://github.com/${string}/${string}/projects`
: `https://github.com/${string}/${string}/projects` | `https://github.com/${string}/${string}/projects/${string}`;

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
}

/**
 * GithubInsightPageType
 *
 * The sub-pages found under the **Insights** tab of a repo.
 *
 * **Related:** `GithubInsightsUrl`
 */
export type GithubInsightPageType = TupleToUnion<Keys<GithubLookup>>;


type _GithubInsightUrl<
  T extends readonly GithubInsightPageType[]
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
  T extends GithubInsightPageType = GithubInsightPageType
> = IsUnion<T> extends true
? TupleToUnion<
    _GithubInsightUrl<As<UnionToTuple<T>, readonly GithubInsightPageType[]>>
  >
: T extends keyof GhLookup
  ? GhLookup[T]
  : never;

