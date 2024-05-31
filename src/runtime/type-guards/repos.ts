import { RepoSource } from "src/types/string-literals";
import { isString } from "./isString";
import { REPO_SOURCES } from "src/constants/RepoConstants";

/**
 * **isRepoSource**`(val)`
 * 
 * Type guard which validates whether the value passed in is a
 * `RepoSource`.
 */
export const isRepoSource = <T>(v: T): v is T & RepoSource => {
  return isString(v) && REPO_SOURCES.includes(v as any);
}
