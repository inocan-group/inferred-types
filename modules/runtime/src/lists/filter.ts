import type {
    AfterFirst,
    RuntimeComparisonOperation,
    ComparisonLookup,
    Compare,
    Defined,
    Err,
    First,
    FromInputToken,
    IsUnionArray,
    Join,
    Narrowable,
    ToStringArray,
    UnionArrayToTuple,
    UnionToString,
    Filter,
} from "inferred-types/types";
import { isArray, isBoolean, isNumber, isString } from "src/type-guards";

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


/**
 * the definition of a _comparator_ operation
 */
type Op = {
    params: readonly Narrowable[];
    accept?: Narrowable;
    /** convert first parameter's type  */
    convertP1?: Conversion[];
    /** convert type using all parameters as a group */
    convertAll?: Conversion[];
};

type Lookup = ComparisonLookup<"run-time">;

type OpDesc<T extends readonly string[]> = {
    startsWith: `tests whether value starts with: ${Join<T, " | ">}`,
    endsWith: `tests whether value ends with: ${Join<T, " | ">}`,
    contains: `tests whether the value contains a substring of: ${Join<T, " | ">}`
} & Record<keyof Lookup, string>


// type OpChoice = Keys<Lookup>[number];

type BaseType<
    T extends keyof Lookup
> = Lookup[T]["accept"] extends Defined
    ? Lookup[T]["accept"]
    : Lookup[T]["params"]["length"] extends 0
        ? Narrowable
        : Lookup[T]["params"][number];

type Accept<
    T extends keyof Lookup
> = BaseType<T> | readonly BaseType<T>[];

type P1<
    TParams extends string | readonly unknown[],
> = TParams extends readonly unknown[]
? First<TParams> extends string
    ? First<TParams>
    : ""
: UnionToString<TParams> extends string
? UnionToString<TParams>
: "";



type Desc<
    TKey extends keyof Lookup,
    TParams extends readonly unknown[],
    TOp extends Op = Lookup[TKey]
> = TKey extends keyof OpDesc<ToStringArray<TParams>>
? OpDesc<ToStringArray<TParams>>[TKey]
: "";


/**
 * Determines what the _comparator_ **type** should be.
 */
type Comp<
    TOp extends keyof Lookup,
    TParams extends Lookup[TOp]["params"],
    TConvertP1 extends readonly Conversion[] | undefined = Lookup[TOp]["convertP1"],
    TConvertAll extends readonly Conversion[] | undefined = Lookup[TOp]["convertAll"]
> = TConvertP1 extends readonly Conversion[]
    ? [Convert<TParams[0], TConvertP1> ]
    : TConvertAll extends Conversion[]
        ? Convert<TParams, TConvertAll>
        : TParams;

type Returns<
    TOp extends keyof Lookup,
    TParams extends Lookup[TOp]["params"],
    TVal extends unknown | readonly unknown[]
> = IsUnionArray<TVal> extends true
? Returns<TOp,TParams, UnionArrayToTuple<TVal>>

: TOp extends RuntimeComparisonOperation
? TVal extends readonly unknown[]
? Filter<TVal, Comp<TOp, TParams>, TOp>
: Compare<TVal, TOp, Comp<TOp,TParams>>
: Err<`operation-not-implemented/${TOp}`>;




/**
 * **FilterFn**`<Operation, OpParams>`
 *
 * A defined function from the `filter()` runtime utility which provides
 * a function which can accept both singular values to test against or
 * an array/tuple of values.
 */
export type FilterFn<
    TOp extends keyof Lookup,
    TParams extends Lookup[TOp]["params"],
    TDesc extends string = Desc<TOp, TParams>
> = <T extends N | readonly N[], N extends Narrowable>(val: T) => Returns<TOp,TParams,T>;

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
    return <T extends N | readonly N[], N extends Narrowable>(
        val: T
    ) => {
        switch(op) {
            case "startsWith":
                return (
                    isArray(val)
                        ? (val as any).filter(
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
                    ? (val as any).filter(
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
        }
    }
}

