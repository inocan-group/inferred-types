import { Tuple, Join } from "src/types/index";

export type Joiner<TJoin extends string> = <TContent extends Tuple<string>>(...tuple: TContent) => Join<TContent,TJoin>;

/**
 * **join**(joinWith)(tuple) -> joined
 * 
 * A higher order runtime utility which provides the ability to create
 * type-strong join's with an array of string and a joining string.
 * 
 * ```ts
 * // "hello world"
 * const helloWorld = join("")("hello", " ", "world");
 * // "foo, bar, baz"
 * const list = join(", ")("foo", "bar", "baz");
 * ```
 */
export function join<TJoin extends string>(joinWith: TJoin): Joiner<TJoin> {
  return <TContent extends Tuple<string>>(...tuple: TContent): Join<TContent,TJoin> => {
    return tuple.join(joinWith) as Join<TContent,TJoin>;
  };
}
