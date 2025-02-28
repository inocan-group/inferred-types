import type {
    GithubOrgUrl,
    GithubRepoIssuesListUrl,
    GithubRepoIssueUrl,
    GithubRepoProjectsUrl,
    GithubRepoProjectUrl,
    GithubRepoReleasesUrl,
    GithubRepoReleaseTagUrl,
    GithubRepoUrl,
    GithubUrl,
} from "inferred-types/types";
import { isString, stripLeading, stripTrailing } from "inferred-types/runtime";

/**
 * **isGithubUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * **Github** URL.
 */
export function isGithubUrl(val: unknown): val is GithubUrl {
    const valid = [
        "https://github.com",
        "https://www.github.com",
        "https://github.io",
    ];
    return isString(val) && valid.some(i =>
        val === i
        || val.startsWith(`${i}/`)
        || val.startsWith(`${i}?`),
    );
}

/**
 * **isGithubOrgUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * **Github** _organization_ URL.
 */
export function isGithubOrgUrl<T>(val: T): val is GithubOrgUrl & T {
    return isString(val) && (
        val.startsWith("https://github.com/")
        && stripper(val).length === 2
    );
}

function stripper(s: string) {
    return stripTrailing(
        stripLeading(s, "https://github.com/"),
        "/",
    );
}

/**
 * **isGithubRepoUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * **Github** _repo_ URL.
 */
export function isGithubRepoUrl<T>(val: T): val is GithubRepoUrl & T {
    return !!(isString(val) && (
        val.startsWith("https://github.com/")
        && stripper(val).split("/").length === 2
    ));
}

/**
 * **isGithubRepoReleasesUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _releases_ of a given _repo_.
 *
 * **Related:** `isGithubRepoReleaseTagUrl`
 */
export function isGithubRepoReleasesUrl<T>(val: T): val is GithubRepoReleasesUrl & T {
    return isString(val) && (
        val.startsWith("https://github.com/")
        && val.includes("/releases")
        && stripper(val).split("/").length === 3
    );
}

/**
 * **isGithubRepoReleaseTagUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _releases_ of a given _repo_.
 *
 * **Related:** `isGithubRepoReleasesUrl`
 */
export function isGithubRepoReleaseTagUrl<T>(val: T): val is GithubRepoReleaseTagUrl & T {
    return isString(val) && (
        val.startsWith("https://github.com/")
        && val.includes("/releases/tag/")
        && stripper(val).length === 4
    );
}

/**
 * **isGithubIssuesListUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _issues_ of a given _repo_.
 *
 * **Related:** `isGithubIssueUrl`
 */
export function isGithubIssuesListUrl<T>(val: T): val is GithubRepoIssuesListUrl & T {
    return isString(val)
        && val.startsWith("https://github.com/")
        && val.includes("/issues");
}

/**
 * **isGithubIssueUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _issues_ of a given _repo_.
 *
 * **Related:** `isGithubIssuesListUrl`
 */
export function isGithubIssueUrl<T>(val: T): val is GithubRepoIssueUrl & T {
    return isString(val) && (
        val.startsWith("https://github.com/")
        && val.includes("/issues/")
    );
}

/**
 * **isGithubProjectsListUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _projects_ of a given _repo_.
 *
 * **Related:** `isGithubProjectUrl`
 */
export function isGithubProjectsListUrl<T>(val: T): val is GithubRepoProjectsUrl & T {
    return isString(val) && (
        val.startsWith("https://github.com/")
        && (val.includes("/projects?") || val.trim().endsWith("/projects"))
        && stripper(val).split("/").length === 3
    );
}

/**
 * **isGithubProjectUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for a _specific project_ of a given _repo_.
 *
 * **Related:** `isGithubProjectsListUrl`
 */
export function isGithubProjectUrl<T>(val: T): val is GithubRepoProjectUrl & T {
    return isString(val) && (
        val.startsWith("https://github.com/")
        && val.includes("/projects/")
        && stripper(val).split("/").length === 4
    );
}

/**
 * **isGithubReleasesListUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for the _Releases_ of a given _repo_.
 *
 * **Related:** `isGithubReleaseTagUrl`
 */
export function isGithubReleasesListUrl<T>(val: T): val is GithubRepoReleasesUrl & T {
    return isString(val) && (
        val.startsWith("https://github.com/")
        && (val.includes("/releases?") || val.trim().endsWith("/releases"))
        && stripper(val).split("/").length === 3
    );
}

/**
 * **isGithubReleaseTagUrl**`(val)`
 *
 * Type guard which validates that the passed in value is a valid
 * URL for a _specific release_ of a given _repo_.
 *
 * **Related:** `isGithubReleasesListUrl`
 */
export function isGithubReleaseTagUrl<T>(val: T): val is GithubRepoProjectUrl & T {
    return isString(val) && (
        val.startsWith("https://github.com/")
        && val.includes("/releases/tag/")
        && stripper(val).split("/").length === 5
    );
}
