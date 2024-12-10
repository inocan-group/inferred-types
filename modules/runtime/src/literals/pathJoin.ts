import type { PathJoin } from "inferred-types/types";
import { stripLeading, stripTrailing } from "inferred-types/runtime";

/**
 * **pathJoin**`<T,U>(begin, ...rest)`
 *
 * Run time utility which joins two strings together with
 * the intent to have them be divided by a Posix `/` character
 * appropriate for Unix file paths and URLs.
 *
 * **note:** to support more than two paths being joined there
 * is now the ability to add a tuple of paths into the _rest_
 * parameter
 */
export function pathJoin<T extends readonly string[]>(
  ...segments: T
): PathJoin<T> {
  const clean_path = segments.map(i => stripTrailing(stripLeading(i, "/"), "/")).join("/");
  const original_path = segments.join("/");
  const pre = original_path.startsWith("/") ? "/" : "";
  const post = original_path.endsWith("/") ? "/" : "";

  return `${pre}${clean_path}${post}` as PathJoin<T>;
}
