import {
  Mutable,
  TupleToUnion,
  OptionalSpace,
  Values,
  Flatten,
  UrlsFrom,
} from "inferred-types/types";
import  {  REPO_PAGE_TYPES, REPO_SOURCES, REPO_SOURCE_LOOKUP } from "inferred-types/constants";

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

