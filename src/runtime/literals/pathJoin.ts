import { PathJoin } from "src/types";
import { 
  ensureLeading, 
  ensureTrailing, 
  stripLeading, 
  stripTrailing 
} from "src/runtime/literals";

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
export function pathJoin<T extends string, U extends readonly string[]>(
  begin: T,
  ...rest: U
): PathJoin<T, U> {
  const start = rest.length > 0 ? ensureTrailing(begin, "/") : begin;
  const end = rest.length > 0 ? ensureLeading(rest.slice(-1)[0], "/") : "";
  const middle =
    rest.length > 1
      ? rest.slice(0, rest.length - 1).map((i) => stripLeading(stripTrailing(i, "/"), '"'))
      : [];
  const midString = stripTrailing(stripLeading(middle.join("/"), "/"), "/");

  return (
    rest.length > 1 ? `${start}${midString}${end}` : `${start}${stripLeading(end, "/")}`
  ) as PathJoin<T, U>;
}
