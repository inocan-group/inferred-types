import type {
    ComparisonLookup,
    ComparisonOperation,
    DateLike,
    Equals,
    Filter,
    FilterFn,
    Narrowable,
} from "inferred-types/types";
import {
    asDate,
    between,
    err,
    isAfter,
    isArray,
    isBefore,
    isBoolean,
    isDateLike,
    isError,
    isNumber,
    isString,
    isTruthy,
    isUnset,
    toDate,
    unset
} from "inferred-types/runtime";
import { Unset } from "inferred-types";
import { COMPARISON_OPERATIONS } from "inferred-types/constants";

type Lookup = ComparisonLookup;

type Accept<TOp extends ComparisonOperation> = "accept" extends keyof ComparisonLookup[TOp]
    ? Equals<ComparisonLookup[TOp]["accept"], unknown> extends true
        ? Narrowable
        : ComparisonLookup[TOp]["accept"]
    : Narrowable;


function handle_string<TOp extends ComparisonOperation, TParams extends Lookup[TOp]["params"]>(
    val: Accept<TOp>,
    op: TOp,
    params: TParams
): boolean | Error | Unset {
    return unset;
}

function handle_numeric<TOp extends ComparisonOperation, TParams extends Lookup[TOp]["params"]>(
    val: Accept<TOp>,
    op: TOp,
    params: TParams
): boolean | Error | Unset {
    return unset
}

function handle_object<TOp extends ComparisonOperation, TParams extends Lookup[TOp]["params"]>(
    val: Accept<TOp>,
    op: TOp,
    params: TParams
): boolean | Error | Unset {
    return unset;
}

function handle_datetime<
    TOp extends ComparisonOperation,
    TParams extends Lookup[TOp]["params"]
>(
    val: Accept<TOp>,
    op: TOp,
    params: TParams
): boolean | Error | Unset {
    if(!isDateLike(val)) {
        return err(
            `invalid-input/date-like`,
            `The '${op}' operation expects a DateLike value as an input but got something else!`,
            { type: typeof val, params, op }
        );
    }
    if(!params.every(i => isDateLike(i))) {
        return err(
            `invalid-params/date-like`,
            `The '${op}' operation was configured with an invalid parameter; it expects the parameter(s) to be a DateLike value(s)`,
            { type: typeof val, val, params, op }
        )
    }

    const p = params as unknown as [DateLike, DateLike, ...DateLike[]]
    const value = asDate(val);
    const comparator = asDate(p[0]);

    switch(op) {

        case "sameDay": {
            return value.getFullYear() === comparator.getFullYear()
                        && value.getMonth() === comparator.getMonth()
                        && value.getDate() === comparator.getDate();
        }

        case "sameMonth": {
            return value.getMonth() === comparator.getMonth()
        }
        case "sameMonthYear": {
            return value.getMonth() === comparator.getMonth()
                && value.getFullYear() === comparator.getFullYear();
        }
        case "sameYear": {
            return value.getFullYear() === comparator.getFullYear();
        }

        case "after": {
            return isAfter(value)(comparator);
        }

        case "before": {
            return isBefore(value)(comparator);
        }

    }


    return unset;
}

function handle_other<
    TOp extends ComparisonOperation,
    TParams extends Lookup[TOp]["params"]
>(
    val: Accept<TOp>,
    op: TOp,
    params: TParams
): boolean | Error | Unset {
    return unset;
}


function filterFn<
    TOp extends ComparisonOperation,
    TParams extends Lookup[TOp]["params"]
>(
    op: TOp,
    params: TParams
) {

    return <T extends Accept<TOp>>(val: T) => {
        const str = handle_string(val,op,params);
        if(isUnset(str)) {
            const numeric = handle_numeric(val, op, params);
            if (isUnset(numeric)) {
                const obj = handle_object(val, op, params);
                if(isUnset(obj)) {
                    const dt = handle_datetime(val, op, params);
                    if(isUnset(dt)) {
                        const other = handle_other(val, op, params);
                        if(isUnset(other)) {
                            // type safety should stop this from happening
                            // but for Javascript consumers and bad actors
                            // we still need to check
                            throw err(
                                `invalid-operation/compare`,
                                `The operation '${op}' is not a recognized comparison operation!`,
                                { op, params, validOps: COMPARISON_OPERATIONS }
                            )
                        }
                        else {
                            return other;
                        }
                    }
                }
                else {
                    return obj;
                }
            }
            else {
                return numeric;
            }
        }
        else {
            return str;
        }

        return null as unknown as ReturnType<FilterFn<TOp,TParams>>;
    }

}

/**
 * **filter**`(op, [details])` => (comparator) => boolean
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
    TOp extends ComparisonOperation,
    TParams extends Lookup[TOp]["params"]
>(
    op: TOp,
    ...params: TParams
): FilterFn<TOp, TParams> {
    return filterFn(op, params);
}
