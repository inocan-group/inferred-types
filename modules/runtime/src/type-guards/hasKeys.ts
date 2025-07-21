import type { EmptyObject, EnsureKeys } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { isDictionary, isFunction } from "inferred-types/runtime";
import { Container, Dictionary, ObjectKey } from "@inferred-types/types";

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
    const P extends (readonly string[]) | readonly [Dictionary],
>(...keys: P) {
    if (keys.length === 0) {
        return Never;
    }

  return <T extends Dictionary>(val: T): val is T & EnsureKeys<T, P> => {
      return !!((
          isFunction(val) || isDictionary(val)
      ) && keys.every(k => k in (val as object)));
  };
}
