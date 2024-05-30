import { OptionalSpace } from "./OptionalSpace";

/**
 * **RepoSources**
 * 
 * common sources for source code repositories.
 */
export type RepoSources = "github" | "bitbucket" | "gitlab" | "codecommit" | "local";


/**
 * **RepoPageType**
 * 
 * a union of descriptive page names you'd expect to find in a source
 * code repository.
 */
export type RepoPageType =
  | "repo"
  | "commits"
  | "author"
  | "org"
  | "issues"
  | "followers"
  | "following"
  | "docs"
  | "unknown";

/**
 * **SemanticVersion**`<[TPrefix]>`
 * 
 * Provides a type for _sematic versions_. 
 * 
 * - by default it not only allows the `${major}.${minor}.${patch}` nomenclature
 * but also _optionally_ allows a prefix of `v`:
 *    - `0.10.1` - valid
 *    - `v0.10.1` - also valid
 *    - `v 0.10.1` - also valid
 * - this prefixing can be disabled or changed by simply modifying the 
 * `TPrefix` generic.
 */
export type SemanticVersion<TPrefix extends string = `${"v" | ""}${OptionalSpace}`>
  = `${TPrefix}${number}.${number}.${number}`


/**
 * **GitRef**
 * 
 * A type that provides the basic shape of a non-HTTP reference 
 * to a Git repository.
 */
export type GitRef = `git@${string}.${string}:${string}.git`
