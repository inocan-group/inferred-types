import type { AsToken, AsTokenOpt } from "inferred-types/types";
import { isObject } from "inferred-types/runtime";

/**
 * **asToken**`(name, ...params)```
 *
 * A simple builder for a token.
 *
 * - you can pass a configuration object as the first parameter
 * - options are `delimiter`, `start` and `end`
 *
 * ```ts
 * // `<<foo::bar::baz>>`
 * const token = asToken("foo", "bar", "baz");
 * ```
 *
 * **Note:** this is a general token builder, if you prefer one that's specific
 * to the `TypeToken` defined in this library then use `createTypeToken` instead.
 */
export function asToken<
  T extends string,
  P extends readonly string[] | readonly [AsTokenOpt, ...string[]],
>(name: T, ...params: P) {
  const delimiter = isObject(params[0]) ? params[0]?.delimiter as string || "::" : "::";
  const start = isObject(params[0]) ? params[0].start || "<<" : "<<";
  const end = isObject(params[0]) ? params[0].end || ">>" : ">>";
  const tokenParams = (
    isObject(params[0]) ? params.slice(1) : params
  ) as string[];

  return (
    tokenParams.length === 0
      ? `${start}${name}${end}`
      : `${start}${delimiter}${tokenParams.join(delimiter)}${end}`
  ) as AsToken<T, P>;
}
