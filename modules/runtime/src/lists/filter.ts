import type {
    ComparisonLookup,
    ComparisonOperation,
    DateLike,
    Equals,
    FilterFn,
    Narrowable,
    Unset,
} from "inferred-types/types";
import {
    asChars,
    asDate,
    endsWith,
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
    startsWith,
    unset
} from "inferred-types/runtime";
import { NUMERIC_CHAR } from "../../../inferred-types/dist";
import { contains } from "../combinators/contains";

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
    switch (op) {
        case "startsWith":
            return (isString(val) || isNumber(val)) && isStringOrNumericArray(params)
                ? startsWith(...params as readonly (string | number)[])(val)
                : false;

        case "endsWith":
            return (isString(val) || isNumber(val)) && isStringOrNumericArray(params)
                ? endsWith(...params as readonly (string | number)[])(val)
                : false;

        case "endsWithNumber":
            return isString(val) || isNumber(val)
                ? NUMERIC_CHAR.includes(lastChar(String(val)) as any)
                : false;

        case "startsWithNumber":
            return isString(val) || isNumber(val)
                ? NUMERIC_CHAR.includes(firstChar(String(val)) as any)
                : false;

        case "onlyNumbers":
            return isString(val)
                ? asChars(val).every(c => isNumberLike(c))
                : false;

        case "onlyLetters":
            return isString(val)
                ? isAlpha(val)
                : false;

        case "alphaNumeric":
            return isString(val)
                ? asChars(val).every(c => isNumberLike(c) || isAlpha(c))
                : false;
    }

    return unset;
}

function handle_general<
    TOp extends ComparisonOperation,
    TParams extends Lookup[TOp]["params"],
    TVal extends Accept<TOp> & Narrowable = Accept<TOp> & Narrowable
>(
    val: TVal,
    op: TOp,
    params: TParams
): boolean | Error | Unset {
    switch (op) {
        case "extends":
            if (!isInputTokenLike(params[0])) {
                return err(
                    `compare/extends`,
                    `A filter operation based on the 'extends' operation passed in a parameter which was not an InputToken so we are not able to convert this into a type!`,
                );
            }
            return err(
                `not-ready/doesExtend`,
                `The "extends" comparison operation depends on doesExtend() and that is not completed yet!`,
                { val, params }
            );

        case "equals":
            return isEqual(val)(params[0] as any);

        case "false":
            return isFalse(val);

        case "true":
            return isTrue(val);

        case "truthy":
            return isTruthy(val);

        case "falsy":
            return isFalsy(val);

        case "equalsSome":
            return params.includes(val);

        case "contains":
            return isString(val) || isNumber(val) || isNarrowableTuple(val)
                ? contains(val, params)
                : false;

        case "containsSome":
            return (isString(val) || isNumber(val) || isNarrowableTuple(val)) && isArray(params)
                ? params.some(
                    i => contains(val, i as Narrowable)
                )
                : false;

        case "containsAll":
            return (isString(val) || isNumber(val) || isNarrowableTuple(val)) && isArray(params)
                ? params.every(
                    i => contains(val, i as Narrowable)
                )
                : false;
    }

    // If we get here, it's not a recognized operation
    return err(
        `invalid-comparison`,
        `The operation '${op}' is not a supported operation!`,
        { op, params }
    );
}

function handle_numeric<TOp extends ComparisonOperation, TParams extends Lookup[TOp]["params"]>(
    val: Accept<TOp>,
    op: TOp,
    params: TParams
): boolean | Error | Unset {
    switch (op) {
        case "greaterThan":
            if (!isNumberLike(val))
                return false;
            if (!isNumberLike(params[0])) {
                return err(
                    `invalid-params/greaterThan`,
                    `The 'greaterThan' operation requires a numeric parameter`,
                    { params }
                );
            }
            return Number(val) > Number(params[0]);

        case "greaterThanOrEqual":
            if (!isNumberLike(val))
                return false;
            if (!isNumberLike(params[0])) {
                return err(
                    `invalid-params/greaterThanOrEqual`,
                    `The 'greaterThanOrEqual' operation requires a numeric parameter`,
                    { params }
                );
            }
            return Number(val) >= Number(params[0]);

        case "lessThan":
            if (!isNumberLike(val))
                return false;
            if (!isNumberLike(params[0])) {
                return err(
                    `invalid-params/lessThan`,
                    `The 'lessThan' operation requires a numeric parameter`,
                    { params }
                );
            }
            return Number(val) < Number(params[0]);

        case "lessThanOrEqual":
            if (!isNumberLike(val))
                return false;
            if (!isNumberLike(params[0])) {
                return err(
                    `invalid-params/lessThanOrEqual`,
                    `The 'lessThanOrEqual' operation requires a numeric parameter`,
                    { params }
                );
            }
            return Number(val) <= Number(params[0]);

        case "betweenExclusively": {
            if (!isNumberLike(val))
                return false;
            if (!isNumberLike(params[0]) || !isNumberLike(params[1])) {
                return err(
                    `invalid-params/betweenExclusively`,
                    `The 'betweenExclusively' operation requires two numeric parameters`,
                    { params }
                );
            }
            const valNumExcl = Number(val);
            const minExcl = Number(params[0]);
            const maxExcl = Number(params[1]);
            return valNumExcl > minExcl && valNumExcl < maxExcl;
        }

        case "betweenInclusively": {
            if (!isNumberLike(val))
                return false;
            if (!isNumberLike(params[0]) || !isNumberLike(params[1])) {
                return err(
                    `invalid-params/betweenInclusively`,
                    `The 'betweenInclusively' operation requires two numeric parameters`,
                    { params }
                );
            }
            const valNumIncl = Number(val);
            const minIncl = Number(params[0]);
            const maxIncl = Number(params[1]);
            return valNumIncl >= minIncl && valNumIncl <= maxIncl;
        }
    }

    return unset;
}

function handle_object<TOp extends ComparisonOperation, TParams extends Lookup[TOp]["params"]>(
    _val: Accept<TOp>,
    _op: TOp,
    _params: TParams
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
    if (!isDateLike(val)) {
        return err(
            `invalid-input/date-like`,
            `The '${op}' operation expects a DateLike value as an input but got something else!`,
            { type: typeof val, params, op }
        );
    }
    if (!params.every(i => isDateLike(i))) {
        return err(
            `invalid-params/date-like`,
            `The '${op}' operation was configured with an invalid parameter; it expects the parameter(s) to be a DateLike value(s)`,
            { type: typeof val, val, params, op }
        );
    }

    const p = params as unknown as [DateLike, DateLike, ...DateLike[]];
    const value = asDate(val);
    const comparator = asDate(p[0]);

    switch (op) {
        case "sameDay": {
            return value.getFullYear() === comparator.getFullYear()
                        && value.getMonth() === comparator.getMonth()
                        && value.getDate() === comparator.getDate();
        }

        case "sameMonth": {
            return value.getMonth() === comparator.getMonth();
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
    _val: Accept<TOp>,
    _op: TOp,
    _params: TParams
): boolean | Error | Unset {
    return unset;
}

function filterFn<
    TOp extends ComparisonOperation,
    TParams extends Lookup[TOp]["params"]
>(
    op: TOp,
    params: TParams
): FilterFn<TOp, TParams> {
    return <T extends Accept<TOp>>(val: T) => {
        // Handle array case - filter the array
        if (isArray(val)) {
            return val.filter((item) => {
                const result = compareValue(item, op, params);
                if (result instanceof Error) {
                    throw result;
                }
                return result === true;
            }) as any;
        }

        // Handle single value case - return boolean
        const result = compareValue(val, op, params);
        if (result instanceof Error) {
            throw result;
        }
        return result as any;
    };
}

// Helper function to perform the actual comparison
function compareValue<
    TOp extends ComparisonOperation,
    TParams extends Lookup[TOp]["params"]
>(
    val: Accept<TOp>,
    op: TOp,
    params: TParams
): boolean | Error {
    let result: Error | Unset | boolean = unset;

    // Route to appropriate handler based on operation type

    // DateTime operations
    if (["after", "before", "sameDay", "sameMonth", "sameMonthYear", "sameYear"].includes(op)) {
        result = handle_datetime(val, op, params);
    }
    // String operations
    else if (["startsWith", "endsWith", "endsWithNumber", "startsWithNumber", "onlyNumbers", "onlyLetters", "alphaNumeric"].includes(op)) {
        result = handle_string(val, op, params);
    }
    // Numeric operations
    else if (["greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual", "betweenExclusively", "betweenInclusively"].includes(op)) {
        result = handle_numeric(val, op, params);
    }
    // Object operations
    else if (["objectKeyGreaterThan", "objectKeyGreaterThanOrEqual", "objectKeyLessThan", "objectKeyLessThanOrEqual", "objectKeyEquals", "objectKeyExtends"].includes(op)) {
        result = handle_object(val, op, params);
    }
    // Other operations
    else if (["errors", "errorsOfType", "returnEquals", "returnExtends"].includes(op)) {
        result = handle_other(val, op, params);
    }
    // General operations (default)
    else {
        result = handle_general(val, op, params);
    }

    // If still unset, the operation is not supported
    if (isUnset(result)) {
        return err(
            `invalid-comparison`,
            `The operation '${op}' is not a supported operation!`,
            { op, params }
        );
    }

    return result;
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
