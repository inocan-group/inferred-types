import type { Dictionary } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { indexOf, isDictionary, isSameTypeOf, keysOf } from "inferred-types/runtime";

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
export function hasKeys<D extends Dictionary>(dict: D): <V>(val: V) => val is D & V;
export function hasKeys<K extends readonly string[]>(...keys: K): <V>(val: V) => val is V & Record<K[number], unknown>;
export function hasKeys(...keys: any[]) {
    if (keys.length === 0) {
        return Never;
    }

    return <V>(val: V): val is any => {
        const iterable = isDictionary(keys[0]) && keys.length === 1 ? keysOf(keys[0]) : keys;
        return !!(
            (isDictionary(val)) && iterable.every((k) => {
                if (!indexOf(val, k as PropertyKey)) {
                    return false;
                }

                if (isDictionary(keys[0]) && keys.length === 1) {
                    const v = val[k as any];
                    const comparable = keys[0][k as any];

                    if (isSameTypeOf(v)(comparable)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }

                return true;
            }));
    };
}
