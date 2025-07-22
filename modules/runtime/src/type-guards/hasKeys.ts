import type { Dictionary, EnsureKeys } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import {  indexOf, isDictionary, isFunction, isSameTypeOf, keysOf } from "inferred-types/runtime";


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
        const iterable = isDictionary(keys[0]) ? keysOf(keys[0]) : keys;
        return !!((
            isFunction(val) || isDictionary(val)
        ) && iterable.every(k => {
            if(!indexOf(val, k as PropertyKey)) {
                return false;
            }

            if(isDictionary(keys[0])) {
                const v = val[k as any];
                const comparable = keys[0][k as any];

                if(isSameTypeOf(val)(comparable)) {
                    return true
                } else {
                    return false
                }
            }

            return false;
        }))
    };
}
