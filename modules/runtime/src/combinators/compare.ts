import type {
    As,
    Compare,
    ComparisonAccept,
    ComparisonLookup,
    ComparisonOperation,
    DateLike,
    Narrowable,
    ObjectKey,
    StartsWithNumber,
    Unset,
    IsEqual, IsFalse,
    Contains,
    Expand,
    IsFalsy,
    IsTruthy,
    SomeEqual,
    ToStringArray,
    EndsWithNumber,
    EndsWith,
    NumberLike
} from "inferred-types/types";
import {
    asChars,
    asDate,
    asDateTime,
    contains,
    endsWith,
    equalsSome,
    err,
    firstChar,
    hasIndexOf,
    isAlpha,
    isArray,
    isBoolean,
    isDateLike,
    isError,
    isFalse,
    isFalsy,
    isFunction,
    isInputTokenLike,
    isNarrowable,
    isNarrowableTuple,
    isNumber,
    isNumberLike,
    isObject,
    isString,
    isStringOrNumericArray,
    isTrue,
    isTruthy,
    startsWith,
    last,
    unset,
    asNumber
} from "inferred-types/runtime";
import {  NUMERIC_CHAR } from "inferred-types/constants";
import { IsBetweenExclusively } from "@inferred-types/types";

type Lookup = ComparisonLookup;

type P<
    TOp extends ComparisonOperation,
    TParams
> = TParams & ComparisonLookup[TOp]["params"];

type V<
    TOp extends ComparisonOperation,
    TVal
> = Expand<
TVal & ComparisonAccept<TOp>
>;


function handle_string<
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
    TVal extends Narrowable
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
    switch (op) {
        case "startsWith":
            return (
                (isString(val) || isNumber(val)) && isStringOrNumericArray(params)
                ? startsWith(...params as readonly (string | number)[])(val)
                : false
            );

        case "endsWith":
            return (
                (isString(val) || isNumber(val)) && isStringOrNumericArray(params)
                ? endsWith(...params as readonly (string | number)[])(val)
                : false
            ) as TVal extends string | number
                ? ToStringArray<TParams> extends readonly string[]
                    ? EndsWith<TVal,ToStringArray<TParams>>
                    : false
                : false;

        case "endsWithNumber":
            return (
                isString(val)
                ? val === ""
                    ? false
                : asChars(val).length > 0
                    ? NUMERIC_CHAR.includes(last(asChars(val)) as any)
                    : false
                : false
            );

        case "startsWithNumber":
            return (
                isString(val)
                ? NUMERIC_CHAR.includes(firstChar(String(val)) as any)
                : false
            ) as StartsWithNumber<TVal>;

        case "onlyNumbers":
            return isString(val)
                ? val === ""
                    ? false
                    : asChars(val).every(c => isNumberLike(c))
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
    TParams extends readonly unknown[],
    TVal extends Narrowable
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
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
                { val: isNarrowable(val) ? val : typeof val, params }
            );

        case "equals":
            return (val === params[0]) as IsEqual<TVal, TParams[0]>;

        case "false":
            return (isFalse(val)) as IsFalse<TVal>;

        case "true":
            return isTrue(val);

        case "truthy":
            return isTruthy(val) as IsTruthy<TVal>;

        case "falsy":
            return (
                isNarrowable(val) && isFalsy(val)
            ) as IsFalsy<TVal>;

        case "equalsSome":
            return (
                isNarrowable(val)
                && isArray(params)
                && equalsSome(...(params as Narrowable[]))(val)
            ) as SomeEqual<TParams, TVal>;

        case "contains":
            return (
                isString(val) || isNumber(val) || isStringOrNumericArray(val)
                    ? contains(val, params)
                    : false
            ) as TVal extends string | number | readonly (string|number)[]
                ? Contains<TVal, TParams>
                : false

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

    return unset;
}

function handle_numeric<
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
    TVal extends Narrowable
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
    switch (op) {
        case "greaterThan":
            return Number(val) > Number(params[0]);

        case "greaterThanOrEqual":
            return Number(val) >= Number(params[0]);

        case "lessThan":
            return Number(val) < Number(params[0]);

        case "lessThanOrEqual":
            return Number(val) <= Number(params[0]);

        case "betweenExclusively":
            if(
                isNumberLike(val)
                && isNumberLike(params[0])
                && isNumberLike(params[1])
            ) {
                const valNumExcl = Number(val);
                const minExcl = asNumber(params[0]);
                const maxExcl = asNumber(params[1]);
                return (
                    valNumExcl > minExcl && valNumExcl < maxExcl
                ) as Compare<TVal, "betweenExclusively", TParams>;
            } else {
                return false as Compare<TVal, "betweenExclusively", TParams>;
            }

        case "betweenInclusively":
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

    return unset;
}

function handle_object<
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
    TVal extends Narrowable
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
    switch (op) {
        case "objectKeyGreaterThan":
            const [key, compare] = params as [ObjectKey, number];
            return isObject(val)
                ? hasIndexOf(val, key)
                    ? isNumberLike(val[key])
                        ? Number(val[key]) > compare
                        : false
                    : false
                : err(
                    `invalid-type/objectKeyGreaterThan`,
                    `The comparison using the 'objectKeyGreaterThan' operation was unable to be performed because the value passed in was not an object!`,
                    { op, params }
                );

        case "objectKeyGreaterThanOrEqual": {
            const [key, compare] = params as [ObjectKey, number];
            return isObject(val)
                ? hasIndexOf(val, key)
                    ? isNumberLike(val[key])
                        ? Number(val[key]) >= compare
                        : false
                    : false
                : err(
                    `invalid-type/objectKeyGreaterThanOrEqual`,
                    `The comparison using the 'objectKeyGreaterThanOrEqual' operation was unable to be performed because the value passed in was not an object!`,
                    { op, params }
                );
        }
        case "objectKeyLessThan": {
            const [key, compare] = params as [ObjectKey, number];
            return isObject(val)
                ? hasIndexOf(val, key)
                    ? isNumberLike(val[key])
                        ? Number(val[key]) < compare
                        : false
                    : false
                : err(
                    `invalid-type/objectKeyLessThan`,
                    `The comparison using the 'objectKeyLessThan' operation was unable to be performed because the value passed in was not an object!`,
                    { op, params }
                );
        }
        case "objectKeyLessThanOrEqual": {
            const [key, compare] = params as [ObjectKey, number];
            return isObject(val)
                ? hasIndexOf(val, key)
                    ? isNumberLike(val[key])
                        ? Number(val[key]) <= compare
                        : false
                    : false
                : err(
                    `invalid-type/objectKeyLessThanOrEqual`,
                    `The comparison using the 'objectKeyLessThanOrEqual' operation was unable to be performed because the value passed in was not an object!`,
                    { op, params }
                );
        }
        case "objectKeyEquals": {
            const [key, compare] = params as [ObjectKey, unknown];
            return isObject(val)
                ? hasIndexOf(val, key)
                    ? val[key] === compare
                    : false
                : err(
                    `invalid-type/objectKeyEquals`,
                    `The comparison using the 'objectKeyEquals' operation was unable to be performed because the value passed in was not an object!`,
                    { op, params }
                );
        }
        case "objectKeyExtends": {
            return err(`not-done`, `the 'objectKeyExtends' operation is not yet implemented in the runtime`);
        }
    }

    return unset;
}

function handle_datetime<
    const TOp extends ComparisonOperation,
    const TParams extends readonly unknown[],
    const TVal extends Narrowable
>(
    val: TVal,
    op: TOp,
    params: TParams
): boolean | Error | Unset {
    // Skip date validation for non-date operations
    if (!["after", "before", "sameDay", "sameMonth", "sameMonthYear", "sameYear"].includes(op)) {
        return unset;
    }

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

    // Use asDate for date-only comparisons (sameDay, sameMonth, etc.)
    // Use asDateTime for time-sensitive comparisons (after, before)
    const needsTime = ["after", "before"].includes(op);
    const value = needsTime ? asDateTime(val) : asDate(val);
    const comparator = needsTime ? asDateTime(p[0]) : asDate(p[0]);

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
            return value.getTime() > comparator.getTime();
        }

        case "before": {
            return value.getTime() < comparator.getTime();
        }
    }

    return unset;
}

function handle_other<
    const TOp extends ComparisonOperation,
    const TParams extends readonly unknown[],
    const TVal extends Narrowable
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
    switch (op) {
        case "errors":
            return val instanceof Error;

        case "errorsOfType":
            if (!(val instanceof Error))
                return false;
            if (!params[0]) {
                return err(
                    `invalid-params/errorsOfType`,
                    `The 'errorsOfType' operation requires a type parameter`,
                    { params }
                );
            }
            return "type" in val && val.type === params[0];

        case "returnEquals":
            if (!isFunction(val))
                return false;
            // Note: We cannot check return type equality at runtime without executing the function
            // This would require runtime type information that JavaScript doesn't provide
            return err(
                `runtime-limitation/returnEquals`,
                `The 'returnEquals' operation cannot be fully implemented at runtime as it requires static type information`,
                { op, params }
            );

        case "returnExtends":
            if (!isFunction(val))
                return false;
            // Note: We cannot check return type extension at runtime without executing the function
            // This would require runtime type information that JavaScript doesn't provide
            return err(
                `runtime-limitation/returnExtends`,
                `The 'returnExtends' operation cannot be fully implemented at runtime as it requires static type information`,
                { op, params }
            );
    }

    return unset;
}

export type CompareFn<
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[]
> = <TVal extends Narrowable>(val: TVal) => TParams extends ComparisonLookup[TOp]["params"]

    ? Compare<TVal, TOp, TParams>
    : false;

function compareFn<
    const TOp extends ComparisonOperation,
    const TParams extends readonly unknown[]
>(
    op: TOp,
    ...params: TParams
) {
    return <const TVal extends Narrowable>(val: TVal) =>  {
        let result: unknown = unset;


        result = handle_string(val,op,params);

        if (isBoolean(result) || isError(result)) {
            return result as Compare<TVal,TOp,TParams>
        }

        result = handle_datetime(val, op, params);

        if (isBoolean(result) || isError(result)) {
            return result as Compare<TVal,TOp,TParams>
        }

        result = handle_numeric(val, op, params);

        if (isBoolean(result) || isError(result)) {
            return result as Compare<TVal,TOp,TParams>
        }

        result = handle_object(val, op, params);

        if (isBoolean(result) || isError(result)) {
            return result as Compare<TVal,TOp,TParams>
        }

        result = handle_other(val, op, params);

        if (isBoolean(result) || isError(result)) {
            return result as Compare<TVal,TOp,TParams>
        }

        result = handle_general(val, op, params);

        if (isBoolean(result) || isError(result)) {
            return result as Compare<TVal,TOp,TParams>
        }

        return false as Compare<TVal,TOp,TParams>;

    };
}

/**
 * **compare**`(op, ...params) -> (val) -> boolean`
 *
 * A higher order function which can perform type-strong comparison
 * operations.
 */
export function compare<
    const TOp extends ComparisonOperation,
    const TParams extends readonly unknown[]
>(
    op: TOp,
    ...params: TParams
) {
    return compareFn<TOp,TParams>(op, ...params);
}
