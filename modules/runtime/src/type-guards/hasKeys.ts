import type { EmptyObject, EnsureKeys } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { isFunction, isDictionary } from "inferred-types/runtime";

/**
 * **hasKeys**(props) => (obj) => `HasKeys<O,P>`
 *
 * Higher order type guard which on first call generates
 * a type guard that can test for the existence of the
 * properties passed into this first call.
 *
 * ```ts
 * const hasFooBar = hasKeys("foo", "bar"); // type guard
 * const hasFooBarToo = hasKeys({foo: 1, bar: 1});
 * ```
 */
export function hasKeys<
    P extends readonly N[],
    N extends PropertyKey,
>(...keys: P) {
    if (keys.length === 0) {
        return Never;
    }

  type Props = P extends readonly string[]
      ? P
      : never;

  return (val: unknown): val is EnsureKeys<EmptyObject, Props> => {
      return !!((
          isFunction(val) || isDictionary(val)
      ) && keys.every(k => k in (val as object)));
  };
}
