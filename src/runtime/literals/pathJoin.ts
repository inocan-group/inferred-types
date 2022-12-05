import { PathJoin } from "src/types/alphabetic/PathJoin";
import { stripStarting } from "./stripStarting";
import { stripEnding } from "./stripEnding";

/**
 * **pathJoin**`<T,U>()`
 *
 * Run time utility which joins two strings together with
 * the intent to have them be divided by a Posix `/` character
 * appropriate for Unix file paths and URLs.
 */
export function pathJoin<T extends string, U extends string>(begin: T, finish: U): PathJoin<T, U> {
  const start = stripEnding(begin, "/");
  const end = stripStarting(finish, "/");

  return `${start}/${end}` as PathJoin<T, U>;
}
