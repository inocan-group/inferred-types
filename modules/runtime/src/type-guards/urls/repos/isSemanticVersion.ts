import type {
    RepoSource,
    SemanticVersion,
} from "inferred-types/types";
import { REPO_SOURCES } from "inferred-types/constants";
import { isString, stripLeading } from "inferred-types/runtime";

/**
 * **isRepoSource**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * `RepoSource`.
 */
export function isRepoSource<T>(v: T): v is T & RepoSource {
    return isString(v) && REPO_SOURCES.includes(v as any);
}

/**
 * **isSemanticVersion**`(val,[allowPrefix]=false)`
 *
 * Type guard which validates whether the value passed in is a
 * semantic version number.
 *
 * - the optional `allowPrefix` parameter allows for a lowercase "v"
 * to be prefixed to the version so that values like `v1.0.12` and
 * `v 1.0.12` are allowed.
 * - by default the `allowPrefix` option is set to false
 */
export function isSemanticVersion<T, P extends boolean>(v: T, allowPrefix: P = false as P): v is T & SemanticVersion<P> {
    return (
        isString(v)
        && v.split(".").length === 3
        && !Number.isNaN(Number(v.split(".")[1]))
        && !Number.isNaN(Number(v.split(".")[2]))
        && (
            !Number.isNaN(Number(v.split(".")[0]))
            || (
                allowPrefix && !Number.isNaN(Number(stripLeading(v.split(".")[0], "v").trim()))
            )
        )
    );
}
