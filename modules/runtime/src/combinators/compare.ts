import { NUMERIC_CHAR } from "inferred-types/constants";
import type {
    As,
    Comparator,
    Compare,
    ComparisonOperation,
    ComparisonAccept,
    Contains,
    DateLike,
    GetComparisonParamInput,
    IndexOf,
    IsEqual,
    IsFalse,
    Narrowable,
    ObjectKey,
    SomeEqual,
    Suggest,
    Unset,
    IsAfter,
    First,
    IsError,
} from "inferred-types/types";
import { isString } from "runtime/type-guards/isString"

import {
    asChars,
    asDate,
    asNumber,
    contains,
    createFnWithProps,
    doesExtend,
    equalsSome,
    err,
    firstChar,
    indexOf,
    last,
    isAfter,
    parseDate,
    unset
} from "inferred-types/runtime";
import {
    hasIndexOf,
    isAlpha,
    isArray,
    isDateLike,
    isDictionary,
    isError,
    isFalse,
    isFalsy,
    isFunction,
    isInputTokenLike,
    isNarrowable,
    isNarrowableTuple,
    isNumber,
    isObjectKey,
    isParsedDate,
    isTrue,
    isNumberLike,
} from "runtime/type-guards";
import { isBoolean } from "runtime/type-guards/isBoolean"

import {
    endsWith,
    startsWith
} from "runtime/type-guards/higher-order"

import { isStringOrNumericArray } from "runtime/type-guards/arrays/isStringOrNumericArray"
import { not } from "runtime/boolean-logic/not";
import { isComparisonOperation } from 'runtime/type-guards/comparison';

function handle_string<
    TVal extends Narrowable,
    TOp extends string,
    TParams extends readonly unknown[],
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
    switch (op) {
        case "startsWith": {
            return (
                (isString(val) || isNumber(val)) && isStringOrNumericArray(params)
                    ? startsWith(...params as readonly (string | number)[])(val)
                    : false
            );
        }

        case "endsWith": {
            return (
                (isString(val) || isNumber(val)) && isStringOrNumericArray(params)
                    ? endsWith(...params as readonly (string | number)[])(val)
                    : false
            )
        }

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
            ) ;

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

        case "alphaNumeric": {
            return isString(val)
                ? asChars(val).every(c => isNumberLike(c) || isAlpha(c))
                : false;
        }
    }

    return unset;
}

function handle_general<
    const TVal extends Narrowable,
    const TOp extends string,
    const TParams extends readonly unknown[],
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
    switch (op) {
        case "extends": {
            if (!isInputTokenLike(params[0])) {
                return err(
                    `compare/extends`,
                    `A filter operation based on the 'extends' operation passed in a parameter which was not an InputToken so we are not able to convert this into a type!`,
                );
            }
            return isNarrowable(val) && doesExtend(params[0])(val);
        }

        case "equals": {
            return (val === params[0]) as IsEqual<TVal, TParams[0]>;
        }

        case "false": {
            return (isFalse(val)) as IsFalse<TVal>;
        }

        case "true": {
            return isTrue(val);
        }

        case "truthy": {
            return not(isFalsy(val));
        }

        case "falsy": {
            return isFalsy(val);
        }

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
            ) as TVal extends string | number | readonly (string | number)[]
                ? Contains<TVal, TParams>
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

    return unset;
}

function handle_numeric<
    TVal extends Narrowable,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
    switch (op) {
        case "greaterThan": {
            if (!isNumberLike(params[0])) {
                return err(
                    `invalid-params/greaterThan`,
                    `The 'greaterThan' operation requires a numeric parameter`,
                    { params }
                );
            }
            return Number(val) > Number(params[0]);
        }

        case "greaterThanOrEqual": {
            if (!isNumberLike(params[0])) {
                return err(
                    `invalid-params/greaterThanOrEqual`,
                    `The 'greaterThanOrEqual' operation requires a numeric parameter`,
                    { params }
                );
            }
            return Number(val) >= Number(params[0]);
        }

        case "lessThan": {
            if (!isNumberLike(params[0])) {
                return err(
                    `invalid-params/lessThan`,
                    `The 'lessThan' operation requires a numeric parameter`,
                    { params }
                );
            }
            return Number(val) < Number(params[0]);
        }

        case "lessThanOrEqual": {
            if (!isNumberLike(params[0])) {
                return err(
                    `invalid-params/lessThanOrEqual`,
                    `The 'lessThanOrEqual' operation requires a numeric parameter`,
                    { params }
                );
            }
            return Number(val) <= Number(params[0]);
        }

        case "betweenExclusively": {
            return (
                isNumberLike(val)
                && isNumberLike(params[0])
                && isNumberLike(params[1])
            )
                ? asNumber(val) > asNumber(params[0])
                && asNumber(val) < asNumber(params[1])
                : false;
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

function handle_object<
    const TVal extends Narrowable,
    const TOp extends ComparisonOperation,
    const TParams extends readonly unknown[],
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
    switch (op) {
        case "objectKeyGreaterThan":
            const [key, compare] = params;
            if (!isObjectKey(key)) {
                return err(
                    "invalid-key/objectKeyGreaterThan",
                    `The compare() function failed while processing the 'objectKeyGreaterThan' operation. The problem was that the 'key' parameter was not a valid Object key!`,
                    { key, compare }
                );
            }
            if (!isNumber(compare)) {
                return err(
                    "invalid-param/objectKeyGreaterThan",
                    `The compare(${String(key)},PARAM) function expects a numeric value as the second parameter when using the objectKeyGreaterThan operation but got '${typeof compare}'`,
                    { key, compare }
                );
            }
            return (
                isDictionary(val)
                    ? hasIndexOf(val, key)
                        ? isNumberLike(val[key])
                            ? Number(val[key]) > compare
                            : false
                        : false
                    : err(
                        `invalid-type/objectKeyGreaterThan`,
                        `The comparison using the 'objectKeyGreaterThan' operation was unable to be performed because the value passed in was not an object!`,
                        { op, params }
                    )
            );

        case "objectKeyGreaterThanOrEqual": {
            const [key, compare] = params as unknown as [ObjectKey, number];
            return isDictionary(val)
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
            const [key, compare] = params as unknown as [ObjectKey, number];
            return isDictionary(val)
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
            const [key, compare] = params as unknown as [ObjectKey, number];
            return isDictionary(val)
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
            const key = indexOf(params, 0) as ObjectKey & TParams[0];
            const compare = indexOf(params, 1) as TParams[1];

            return (
                isDictionary(val)
                    ? hasIndexOf(val, key)
                        ? val[key] === compare
                        : false
                    : err(
                        `invalid-type/objectKeyEquals`,
                        `The comparison using the 'objectKeyEquals' operation was unable to be performed because the value passed in was not an object!`,
                        { op, params }
                    )
            ) as IsEqual<
                IndexOf<TVal, As<TParams[0], ObjectKey>>,
                TParams[1]
            >;
        }
        case "objectKeyExtends": {
            return err(`not-done`, `the 'objectKeyExtends' operation is not yet implemented in the runtime`);
        }
    }

    return unset;
}

function handle_datetime<
    const TVal extends Narrowable,
    const TOp extends ComparisonOperation,
    const TParams extends readonly unknown[],
>(
    val: TVal,
    op: TOp,
    params: TParams
): boolean | Error | Unset {
    let outcome = null;

    if (["sameDay", "sameMonth", "sameMonthYear", "sameYear", "after", "before"].includes(op)) {
        if (!isDateLike(params[1])) {
            outcome = err("invalid-params/not-date-like", `The '${op}' operation expects the second parameter to be a DateLike value but it was not!`);
        }
        if (!isDateLike(val)) {
            outcome = err("invalid-value/not-date-like", ``);
            return outcome;
        }

        switch (op) {
            case "sameDay": {
                const value = parseDate(val as DateLike);
                const comparator = parseDate(params[1] as TParams[1] & DateLike);
                if (isParsedDate(comparator) && isParsedDate(value)) {
                    outcome = value.year === comparator.year
                        && value.month === comparator.month
                        && value.date === comparator.date;
                    return outcome;
                }
                else if (isError(value)) {
                    err(
                        "invalid-value/compare",
                        `The sameDay operation got a value which was unable to be parsed into a date!`,
                        { op, params, val }
                    );
                }
                else if (isError(comparator)) {
                    err(
                        "invalid-params/compare",
                        `The sameDay operation was configured with a parameter which was unable to be parsed into a date!`,
                        { op, params, val }
                    );
                }
            }

            case "sameMonth": {
                const value = asDate(val as DateLike);
                const comparator = asDate(params[0] as TParams[0] & DateLike);
                outcome = value.getMonth() === comparator.getMonth();
                return outcome;
            }

            case "sameMonthYear": {
                const value = asDate(val as DateLike);
                const comparator = asDate(params[0] as TParams[0] & DateLike);
                outcome = value.getMonth() === comparator.getMonth()
                    && value.getFullYear() === comparator.getFullYear();
                return outcome;
            }
            case "sameYear": {
                const value = asDate(val as DateLike);
                const comparator = asDate(params[0] as TParams[0] & DateLike);
                outcome = value.getFullYear() === comparator.getFullYear();
                return outcome;
            }

            case "after": {
                return isNumberLike(params[0])
                    ? isAfter(val)(params[0]) as unknown as IsAfter<TVal,First<TParams>>
                    : err('invalid-params/not-date-like') as unknown as IsAfter<TVal,First<TParams>>;
            }

            case "before": {
                const value = asDate(val as DateLike);
                const comparator = asDate(params[0] as TParams[0] & DateLike);
                outcome = value.getTime() < comparator.getTime();
                return outcome;
            }
        }
    }
    return unset;
}

function handle_other<
    const TVal extends Narrowable,
    const TOp extends ComparisonOperation,
    const TParams extends readonly unknown[],
>(
    val: TVal,
    op: TOp,
    params: TParams
) {
    switch (op) {
        case "errors": {
            return (
                val === null
                ? false
                : val === undefined
                ? false
                : val instanceof Error
            ) as IsError<TVal>;
        }

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


function compareFn<
    const TOp extends string,
    const TParams extends readonly unknown[]
>(
    op: TOp,
    params: TParams
): Comparator<TOp, TParams> {

    const fn = <const TVal extends ComparisonAccept<TOp>>(
        val: TVal
    ): Compare<TVal,TOp,TParams> => {
        if (isComparisonOperation(op)) {
            let result: unknown = unset;

            result = handle_string(val, op, params);
            if (isBoolean(result) || isError(result)) {
                return result as Compare<TVal,TOp,TParams>;
            }

            // Object operations
            result = handle_object(val, op, params);
            if (isBoolean(result) || isError(result)) {
                return result as Compare<TVal,TOp,TParams>;
            }

            // Numeric operations
            result = handle_numeric(val, op, params);
            if (isBoolean(result) || isError(result)) {
                return result as Compare<TVal,TOp,TParams>;
            }

            // Other operations (errors, errorsOfType, etc.)
            result = handle_other(val, op, params);
            if (isBoolean(result) || isError(result)) {
                return result as Compare<TVal,TOp,TParams>;
            }

            result = handle_general(val, op, params);
            if (isBoolean(result) || isError(result)) {
                return result as Compare<TVal,TOp,TParams>;
            }

            result = handle_datetime(val, op, params);
            if (isBoolean(result) || isError(result)) {
                return result as Compare<TVal,TOp,TParams>;
            }

            return false as Compare<TVal,TOp,TParams>;
        } else {
            return err(
                `invalid-operation`,
                `The operation '${String(op)}' is not a valid operation for the compare utility!`,
                { op, params }
            ) as unknown as Compare<TVal, TOp, TParams>;
        }
    };

    const comparator: any = createFnWithProps<any[],any,any,any,any,any>(
        fn,
        {
            kind: "comparator",
            op,
            params
        }
    );

    return comparator as Comparator<TOp,TParams>
}

/**
 * **compare**`(op, ...params) -> (val) -> boolean`
 *
 * A higher order function which can perform type-strong comparison
 * operations.
 */
export function compare<
    const TOp extends Suggest<ComparisonOperation>,
    const TParams extends GetComparisonParamInput<TOp>
>(
    op: TOp,
    ...params: TParams
): TOp extends ComparisonOperation ? Comparator<TOp,TParams> : Error {
    let response: any;

    if(isComparisonOperation(op)) {
        response =  compareFn(op, params);
    } else {
        response = err("invalid-operation", `The operation '${op}' is not a recognized or valid comparison operation!`, { op, params })
    }

    return response as TOp extends ComparisonOperation ? Comparator<TOp,TParams> : Error;
}

