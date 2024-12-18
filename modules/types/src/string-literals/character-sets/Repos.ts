import type { REPO_PAGE_TYPES, REPO_SOURCE_LOOKUP, REPO_SOURCES } from "inferred-types/constants";
import type {
  Flatten,
  Mutable,
  Opt,
  OptionalSpace,
  TupleToUnion,
  Unset,
  UrlsFrom,
  Values,
} from "inferred-types/types";

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
 * **SemanticVersion**`<[TPrefix]>`
 *
 * Provides a type for _sematic versions_.
 *
 * - by default it only allows the `v${major}.${minor}.${patch}`
 * - setting `TPrefix to` `true` allows a version with or without
 * the leading "v"
 *    - `0.10.1` - valid
 *    - `v0.10.1` - also valid
 * - setting to `false` eliminates any prefix
 * - if you pass in a string `TPrefix` then it will be used directly
 */
export type SemanticVersion<
  TPrefix extends boolean | string | Unset = Unset,
> = TPrefix extends Unset
? `v${number}.${number}.${number}`
: TPrefix extends true
? `${"v" | ""}${number}.${number}.${number}`
: TPrefix extends false
? `${number}.${number}.${number}`
: TPrefix extends string
? `${TPrefix}${number}.${number}.${number}`
: never;

/**
 * **GitRef**
 *
 * A type that provides the basic shape of a non-HTTP reference
 * to a Git repository.
 */
export type GitRef = `git@${string}.${string}:${string}.git`;

type NpmPrefix = "" | "^" | ">=" | ">" | "~"
type NpmVersionNum = `${number}${Opt<`.${number}`>}${Opt<`.${number}`>}`

/**
 * **NpmVersion**
 *
 * an [npm](https://npmjs.org) version / variant range.
 */
export type NpmVersion = `${NpmPrefix}${NpmVersionNum}`
