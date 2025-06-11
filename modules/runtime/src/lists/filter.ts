import type {
    AfterFirst,
    First,
    FromInputToken,
    Narrowable,
    ToStringArray,
    Filter,
    RuntimeComparisonOperation,
    ComparisonLookup,
    As,
    Flexy,
    AsArray,
    DateLike,
    Compare,
    Comparator,
    GetOpConfig,
} from "inferred-types/types";
import {
    isArray,
    isBoolean,
    isNumber,
    isTruthy,
    isString,
    isDateLike,
    isBefore,
    isAfter,
    between,
    toDate
} from "inferred-types/runtime";
import { GetComparator } from "@inferred-types/types/src";

type Conversion = "union" | "token" | "stringLiteral" | "stringArray";


type Convert<
    T,
    U extends readonly Conversion[]
> = [] extends U
? T
: Convert<
    First<U> extends "union"
    ? T extends readonly Narrowable[]
        ? T[number]
        : never
    : First<U> extends "token"
        ? T extends string
            ? FromInputToken<T>
            : never
    : First<U> extends "stringLiteral"
        ? T extends string | number | boolean
            ? `${T}`
            : never
    : First<U> extends "stringArray"
        ? T extends readonly unknown[]
            ? ToStringArray<T>
            : never
    : never,
    AfterFirst<U>
>;


type Lookup = ComparisonLookup<"run-time">;



type X = GetOpConfig<"startsWith">;
type Y = GetComparator<X, ["foo", "bar"]>;

type Returns<
    TOp extends keyof Lookup,
    TParams extends readonly Narrowable[],
    TVal,
    TConfig = GetOpConfig<TOp>
> = TVal extends readonly unknown[]
? Filter<
    TVal, TOp, GetOpConfig<TConfig,TParams>
>
: Compare<TVal, TOp, GetOpConfig<TConfig,TParams>>


/**
 * **FilterFn**`<Operation, OpParams>`
 *
 * A defined function from the `filter()` runtime utility which provides
 * a function which can accept both singular values to test against or
 * an array/tuple of values.
 */
export type FilterFn<
    TOp extends keyof Lookup ,
    TParams extends Lookup[TOp]["params"]
> = <
    T extends N | readonly N[],
    N extends Narrowable
>(val: T) => Returns<TOp,TParams, T>;

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
    TOp extends RuntimeComparisonOperation,
    TParams extends Lookup[TOp]["params"]
>(
    op: TOp,
    ...params: TParams
): FilterFn<TOp, TParams> {
    return <
        T extends N | readonly N[],
        N extends Narrowable
    >(
        val: T
    ): Returns<TOp,TParams,T> => {
        switch(op) {
            case "truthy":
                return (
                    isArray(val)
                    ? val.filter(i => isTruthy(i))
                    : isTruthy(val)
                 ) as Returns<TOp,TParams,T>;
            case "startsWith":
                return (
                    isArray(val)
                        ? (val as readonly unknown[]).filter(
                            (v: unknown) => (
                                isString(v) || isNumber(v) || isBoolean(v)
                            ) && params.some(i => String(v).startsWith(i as string))
                        )
                        : (
                            isString(val) || isNumber(val) || isBoolean(val)
                        ) && params.some(i => String(val).startsWith(i as string))
                ) as Returns<TOp,TParams,T>;
            case "endsWith":
                return (
                    isArray(val)
                    ? (val as readonly unknown[]).filter(
                        (v: unknown) => (
                            isString(v) || isNumber(v) || isBoolean(v)
                        ) && params.some(i => String(v).endsWith(i as string))
                    )
                    : (
                        isString(val) || isNumber(val) || isBoolean(val)
                    ) && params.some(i => String(val).endsWith(i as string))
                ) as Returns<TOp,TParams,T>;
            case "contains":
                return (
                    isArray(val)
                        ? val.filter(
                            v => (
                                isString(v) || isNumber(v) || isBoolean(v)
                            ) && params.some(i => String(v).includes(String(i)))
                        )
                        : (isString(val) || isNumber(val) || isBoolean(val)) &&
                            params.some(i => String(val).includes(String(i)))
                ) as Returns<TOp,TParams,T>;

            case "after":
                return (
                    isArray(val)
                    ? val.filter(i => isDateLike(i) && isAfter(params[0] as DateLike)(i))
                    : isAfter(params[0] as DateLike)(val)
                ) as Returns<TOp,TParams,T>;
            case "before":
                return (
                    isArray(val)
                    ? val.filter(i => isDateLike(i) && isBefore(params[0] as DateLike)(i))
                    : isBefore(params[0] as DateLike)(val)
                ) as Returns<TOp,TParams,T>;
            case "betweenExclusively":
                return (
                    isArray(val)
                        ? val.filter(
                            i => between(
                                params[0] as number,
                                params[1] as number,
                                "exclusively"
                            )(i as number)
                        )
                        : between(
                            params[0] as number,
                            params[1] as number,
                            "exclusively"
                        )(val as number)
                ) as Returns<TOp,TParams,T>;
            case "betweenInclusively":
                return (
                    isArray(val)
                        ? val.filter(
                            i => between(
                                params[0] as number,
                                params[1] as number,
                                "inclusively"
                            )(i as number)
                        )
                        : between(
                            params[0] as number,
                            params[1] as number,
                            "inclusively"
                        )(val as number)
                ) as Returns<TOp,TParams,T>;
            case "containsAll":
                return (
                    isArray(val)
                        ? val.filter(
                            v => (
                                isString(v) || isNumber(v) || isBoolean(v)
                            ) && params.every(i => String(v).includes(String(i)))
                        )
                        : (isString(val) || isNumber(val) || isBoolean(val)) &&
                            params.every(i => String(val).includes(String(i)))
                ) as Returns<TOp,TParams,T>;

            case "containsSome":
                return (
                    isArray(val)
                        ? val.filter(
                            v => (
                                isString(v) || isNumber(v) || isBoolean(v)
                            ) && params.some(i => String(v).includes(String(i)))
                        )
                        : (isString(val) || isNumber(val) || isBoolean(val)) &&
                            params.some(i => String(val).includes(String(i)))
                ) as Returns<TOp,TParams,T>;

            case "equals":
                return (
                    isArray(val)
                        ? val.filter(v => params.some(p => v === p))
                        : params.some(p => val === p)
                ) as Returns<TOp,TParams,T>;

            case "equalsSome":
                return (
                    isArray(val)
                        ? val.filter(v => params.some(p => v === p))
                        : params.some(p => val === p)
                ) as Returns<TOp,TParams,T>;

            case "extends":
                // This is a type-level operation, runtime approximation
                return (
                    isArray(val)
                        ? val.filter(v => params.some(p => typeof v === typeof p))
                        : params.some(p => typeof val === typeof p)
                ) as Returns<TOp,TParams,T>;

            case "true":
                return (
                    isArray(val)
                        ? val.filter(v => v === true)
                        : val === true
                ) as Returns<TOp,TParams,T>;

            case "false":
                return (
                    isArray(val)
                        ? val.filter(v => v === false)
                        : val === false
                ) as Returns<TOp,TParams,T>;

            case "falsy":
                return (
                    isArray(val)
                        ? val.filter(v => !v)
                        : !val
                ) as Returns<TOp,TParams,T>;

            case "greaterThan":
                return (
                    isArray(val)
                        ? val.filter(v => isNumber(v) && v > (params[0] as number))
                        : isNumber(val) && val > (params[0] as number)
                ) as Returns<TOp,TParams,T>;

            case "greaterThanOrEqual":
                return (
                    isArray(val)
                        ? val.filter(v => isNumber(v) && v >= (params[0] as number))
                        : isNumber(val) && val >= (params[0] as number)
                ) as Returns<TOp,TParams,T>;

            case "lessThan":
                return (
                    isArray(val)
                        ? val.filter(v => isNumber(v) && v < (params[0] as number))
                        : isNumber(val) && val < (params[0] as number)
                ) as Returns<TOp,TParams,T>;

            case "lessThanOrEqual":
                return (
                    isArray(val)
                        ? val.filter(v => isNumber(v) && v <= (params[0] as number))
                        : isNumber(val) && val <= (params[0] as number)
                ) as Returns<TOp,TParams,T>;

            case "endsWithNumber":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            const str = String(v);
                            return /\d$/.test(str);
                        })
                        : /\d$/.test(String(val))
                ) as Returns<TOp,TParams,T>;

            // Object-related operations
            case "objectKeyEndsWith":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.keys(v).some(key =>
                                params.some(p => key.endsWith(String(p)))
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.keys(val).some(key =>
                              params.some(p => key.endsWith(String(p)))
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectKeyEquals":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.keys(v).some(key =>
                                params.some(p => key === String(p))
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.keys(val).some(key =>
                              params.some(p => key === String(p))
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectKeyExtends":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.keys(v).some(key =>
                                params.some(p => typeof key === typeof p)
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.keys(val).some(key =>
                              params.some(p => typeof key === typeof p)
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectKeyStartsWith":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.keys(v).some(key =>
                                params.some(p => key.startsWith(String(p)))
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.keys(val).some(key =>
                              params.some(p => key.startsWith(String(p)))
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectKeyValueExtends":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.entries(v).some(([key, value]) =>
                                params.some(p => typeof value === typeof p)
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.entries(val).some(([key, value]) =>
                              params.some(p => typeof value === typeof p)
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectKeyValueGreaterThan":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.entries(v).some(([key, value]) =>
                                isNumber(value) && value > (params[0] as number)
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.entries(val).some(([key, value]) =>
                              isNumber(value) && value > (params[0] as number)
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectKeyValueGreaterThanOrEqual":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.entries(v).some(([key, value]) =>
                                isNumber(value) && value >= (params[0] as number)
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.entries(val).some(([key, value]) =>
                              isNumber(value) && value >= (params[0] as number)
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectKeyValueLessThan":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.entries(v).some(([key, value]) =>
                                isNumber(value) && value < (params[0] as number)
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.entries(val).some(([key, value]) =>
                              isNumber(value) && value < (params[0] as number)
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectKeyValueLessThanOrEqual":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.entries(v).some(([key, value]) =>
                                isNumber(value) && value <= (params[0] as number)
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.entries(val).some(([key, value]) =>
                              isNumber(value) && value <= (params[0] as number)
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectValueEquals":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.values(v).some(value =>
                                params.some(p => value === p)
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.values(val).some(value =>
                              params.some(p => value === p)
                          )
                ) as Returns<TOp,TParams,T>;

            case "objectValueExtends":
                return (
                    isArray(val)
                        ? val.filter(v =>
                            typeof v === 'object' && v !== null &&
                            Object.values(v).some(value =>
                                params.some(p => typeof value === typeof p)
                            )
                        )
                        : typeof val === 'object' && val !== null &&
                          Object.values(val).some(value =>
                              params.some(p => typeof value === typeof p)
                          )
                ) as Returns<TOp,TParams,T>;

            // Error-related operations
            case "errors":
            case "errorsOfType":
                return (
                    isArray(val)
                        ? val.filter(v => v instanceof Error)
                        : val instanceof Error
                ) as Returns<TOp,TParams,T>;

            // Function return type operations
            case "returnEquals":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            if (typeof v !== 'function') return false;
                            try {
                                const result = (v as Function)();
                                return params.some(p => result === p);
                            } catch {
                                return false;
                            }
                        })
                        : (() => {
                            if (typeof val !== 'function') return false;
                            try {
                                const result = (val as Function)();
                                return params.some(p => result === p);
                            } catch {
                                return false;
                            }
                        })()
                ) as Returns<TOp,TParams,T>;

            case "returnExtends":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            if (typeof v !== 'function') return false;
                            try {
                                const result = (v as Function)();
                                return params.some(p => typeof result === typeof p);
                            } catch {
                                return false;
                            }
                        })
                        : (() => {
                            if (typeof val !== 'function') return false;
                            try {
                                const result = (val as Function)();
                                return params.some(p => typeof result === typeof p);
                            } catch {
                                return false;
                            }
                        })()
                ) as Returns<TOp,TParams,T>;

            // Additional string operations
            case "startsWithNumber":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            const str = String(v);
                            return /^\d/.test(str);
                        })
                        : /^\d/.test(String(val))
                ) as Returns<TOp,TParams,T>;

            case "onlyNumbers":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            const str = String(v);
                            return /^\d+$/.test(str);
                        })
                        : /^\d+$/.test(String(val))
                ) as Returns<TOp,TParams,T>;

            case "onlyLetters":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            const str = String(v);
                            return /^[a-zA-Z]+$/.test(str);
                        })
                        : /^[a-zA-Z]+$/.test(String(val))
                ) as Returns<TOp,TParams,T>;

            case "alphaNumeric":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            const str = String(v);
                            return /^[a-zA-Z0-9]+$/.test(str);
                        })
                        : /^[a-zA-Z0-9]+$/.test(String(val))
                ) as Returns<TOp,TParams,T>;

            // Date-related operations
            case "sameDay":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            if (!isDateLike(v) || !isDateLike(params[0])) return false;
                            const d1 = toDate(v);
                            const d2 = toDate(params[0] as DateLike);
                            return d1.getFullYear() === d2.getFullYear() &&
                                   d1.getMonth() === d2.getMonth() &&
                                   d1.getDate() === d2.getDate();
                        })
                        : (() => {
                            if (!isDateLike(val) || !isDateLike(params[0])) return false;
                            const d1 = toDate(val);
                            const d2 = toDate(params[0] as DateLike);
                            return d1.getFullYear() === d2.getFullYear() &&
                                   d1.getMonth() === d2.getMonth() &&
                                   d1.getDate() === d2.getDate();
                        })()
                ) as Returns<TOp,TParams,T>;

            case "sameMonth":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            if (!isDateLike(v) || !isDateLike(params[0])) return false;
                            const d1 = toDate(v);
                            const d2 = toDate(params[0] as DateLike);
                            return d1.getMonth() === d2.getMonth();
                        })
                        : (() => {
                            if (!isDateLike(val) || !isDateLike(params[0])) return false;
                            const d1 = toDate(val);
                            const d2 = toDate(params[0] as DateLike);
                            return d1.getMonth() === d2.getMonth();
                        })()
                ) as Returns<TOp,TParams,T>;

            case "sameMonthYear":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            if (!isDateLike(v) || !isDateLike(params[0])) return false;
                            const d1 = toDate(v);
                            const d2 = toDate(params[0] as DateLike);
                            return d1.getFullYear() === d2.getFullYear() &&
                                   d1.getMonth() === d2.getMonth();
                        })
                        : (() => {
                            if (!isDateLike(val) || !isDateLike(params[0])) return false;
                            const d1 = toDate(val);
                            const d2 = toDate(params[0] as DateLike);
                            return d1.getFullYear() === d2.getFullYear() &&
                                   d1.getMonth() === d2.getMonth();
                        })()
                ) as Returns<TOp,TParams,T>;

            case "sameYear":
                return (
                    isArray(val)
                        ? val.filter(v => {
                            if (!isDateLike(v) || !isDateLike(params[0])) return false;
                            const d1 = toDate(v);
                            const d2 = toDate(params[0] as DateLike);
                            return d1.getFullYear() === d2.getFullYear();
                        })
                        : (() => {
                            if (!isDateLike(val) || !isDateLike(params[0])) return false;
                            const d1 = toDate(val);
                            const d2 = toDate(params[0] as DateLike);
                            return d1.getFullYear() === d2.getFullYear();
                        })()
                ) as Returns<TOp,TParams,T>;

            default:
                throw new Error(`Unknown filter operation: ${op}`);
        }
    }
}
