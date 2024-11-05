import {
  GithubOrgUrl,
  GithubRepoIssuesListUrl,
  GithubRepoIssueUrl,
  GithubRepoProjectsUrl,
  GithubRepoProjectUrl,
  GithubRepoReleasesUrl,
  GithubRepoReleaseTagUrl,
  GithubRepoUrl,
  GithubUrl
} from "inferred-types/dist/types/index"
import { isString } from "inferred-types/dist/runtime/index"
import { stripLeading, stripTrailing } from "../../../literals"


/**
 * **isGithubUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * **Github** URL.
 */
export const isGithubUrl = (val: unknown): val is GithubUrl => {
  const valid = [
    "https://github.com",
    'https://www.github.com',
    'https://github.io'
  ];
  return isString(val) && valid.some(i =>
    val === i ||
    val.startsWith(`${i}/`) ||
    val.startsWith(`${i}?`)
  );
}

/**
 * **isGithubOrgUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * **Github** _organization_ URL.
 */
export const isGithubOrgUrl = <T>(val: T): val is GithubOrgUrl & T => {
  return isString(val) && (
    val.startsWith("https://github.com/") &&
    stripper(val).length === 2
  )
}

const stripper = (s: string) => {
  return stripTrailing(
    stripLeading(s, "https://github.com/"),
    "/"
  )
}

/**
 * **isGithubRepoUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * **Github** _repo_ URL.
 */
export const isGithubRepoUrl = <T>(val: T): val is GithubRepoUrl & T => {
  return isString(val) && (
    val.startsWith("https://github.com/") &&
    stripper(val).split("/").length === 2
  ) ? true : false
}


/**
 * **isGithubRepoReleasesUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _releases_ of a given _repo_.
 *
 * **Related:** `isGithubRepoReleaseTagUrl`
 */
export const isGithubRepoReleasesUrl = <T>(val: T): val is GithubRepoReleasesUrl & T => {
  return isString(val) && (
    val.startsWith("https://github.com/") &&
    val.includes("/releases") &&
    stripper(val).split("/").length === 3
  )
}

/**
 * **isGithubRepoReleaseTagUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _releases_ of a given _repo_.
 *
 * **Related:** `isGithubRepoReleasesUrl`
 */
export const isGithubRepoReleaseTagUrl = <T>(val: T): val is GithubRepoReleaseTagUrl & T => {
  return isString(val) && (
    val.startsWith("https://github.com/") &&
    val.includes("/releases/tag/") &&
    stripper(val).length === 4
  )
}


/**
 * **isGithubIssuesListUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _issues_ of a given _repo_.
 *
 * **Related:** `isGithubIssueUrl`
 */
export const isGithubIssuesListUrl = <T>(val: T): val is GithubRepoIssuesListUrl & T => {
  return isString(val) &&
    val.startsWith("https://github.com/") &&
    val.includes("/issues")
}


/**
 * **isGithubIssueUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _issues_ of a given _repo_.
 *
 * **Related:** `isGithubIssuesListUrl`
 */
export const isGithubIssueUrl = <T>(val: T): val is GithubRepoIssueUrl & T => {
  return isString(val) && (
    val.startsWith("https://github.com/") &&
    val.includes("/issues/")
  )
}

/**
 * **isGithubProjectsListUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _projects_ of a given _repo_.
 *
 * **Related:** `isGithubProjectUrl`
 */
export const isGithubProjectsListUrl = <T>(val: T): val is GithubRepoProjectsUrl & T => {
  return isString(val) && (
    val.startsWith("https://github.com/") &&
    (val.includes("/projects?") || val.trim().endsWith("/projects") ) &&
    stripper(val).split("/").length === 3
  )
}


/**
 * **isGithubProjectUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for a _specific project_ of a given _repo_.
 *
 * **Related:** `isGithubProjectsListUrl`
 */
export const isGithubProjectUrl = <T>(val: T): val is GithubRepoProjectUrl & T => {
  return isString(val) && (
    val.startsWith("https://github.com/") &&
    val.includes("/projects/") &&
    stripper(val).split("/").length === 4
  )
}


/**
 * **isGithubReleasesListUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _Releases_ of a given _repo_.
 *
 * **Related:** `isGithubReleaseTagUrl`
 */
export const isGithubReleasesListUrl = <T>(val: T): val is GithubRepoReleasesUrl & T => {
  return isString(val) && (
    val.startsWith("https://github.com/") &&
    (val.includes("/releases?") || val.trim().endsWith("/releases") ) &&
    stripper(val).split("/").length === 3
  )
}


/**
 * **isGithubReleaseTagUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for a _specific release_ of a given _repo_.
 *
 * **Related:** `isGithubReleasesListUrl`
 */
export const isGithubReleaseTagUrl = <T>(val: T): val is GithubRepoProjectUrl & T => {
  return isString(val) && (
    val.startsWith("https://github.com/") &&
    val.includes("/releases/tag/") &&
    stripper(val).split("/").length === 5
  )
}

