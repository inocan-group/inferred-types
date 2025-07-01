import type {
    ComparisonLookup,
    ComparisonOperation,
    DateLike,
    Equals,
    Filter,
    FilterFn,
    Narrowable,
    Unset,
} from "inferred-types/types";
import {
    asChars,
    asDate,
    compare,
    endsWithTypeguard,
    err,
    firstChar,
    isAfter,
    isAlpha,
    isArray,
    isBefore,
    isDateLike,
    isEqual,
    isFalse,
    isFalsy,
    isInputTokenLike,
    isNarrowableTuple,
    isNumber,
    isNumberLike,
    isString,
    isStringOrNumericArray,
    isTrue,
    isTruthy,
    isUnset,
    lastChar,
    startsWithTypeguard,
    unset
} from "inferred-types/runtime";
import { ComparisonAccept, NUMERIC_CHAR } from "../../../inferred-types/dist";
import { contains } from "../combinators/contains";

type Lookup = ComparisonLookup;

function filterFn<
    const TOp extends ComparisonOperation,
    const TParams extends Lookup[TOp]["params"]
>(
    op: TOp,
    params: TParams
) {
    return <const TList extends readonly ComparisonAccept<TOp>[]>(list: TList) => {
        return (
            list.filter((item) => {
                const result = compare(op, params)(item as any);
                if (result instanceof Error) {
                    throw result;
                }
                return result === true;
            })
        ) as Filter<TList, TOp, TParams>;
    };
}

/**
 * **filter**`(op, ...[params])` => (comparator) => boolean
 *
 * A set of filter functions which provide strong (and narrow)
 * typing support.
 *
 * - The first call sets up the filter operation and returns a
 * function which can be used as a filter
 * - the second call (aka, the actual filter function) will accept
 * either a singular element or an array of elements.
 *      - when passed a singular value it will return a boolean value
 *      which is determined at design time where possible
 *      - when passed a tuple then the filtered tuple is passed back
 *      and is typed at designed time where possible
 *
 * **Related:** `retain()`
 */
export function filter<
    const TOp extends ComparisonOperation,
    const TParams extends Lookup[TOp]["params"]
>(
    op: TOp,
    ...params: TParams
) {
    return filterFn(op, params);
}
