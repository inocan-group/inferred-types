import {
    AfterFirst,
    AsArray,
    DateLike,
    Dictionary,
    First,
    FromInputToken,
    InputToken__SimpleTokens,
    Keys,
    Narrowable,
    ToStringArray
} from "inferred-types/types";


export type ComparisonConversionType =
| "union"
| "token"
| "stringLiteral"
| "stringArray";

export type ComparisonConversion<
    T,
    U extends readonly ComparisonConversionType[]
> = [] extends U
    ? T
    : ComparisonConversion<
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
export type ComparisonOp<T extends ComparisonMode> = {
    params: T extends "run-time"
        ? readonly Narrowable[]
        : readonly unknown[];
    /**
     * Explicitly state the _type_ the runtime function can take when moved
     * into strict mode. If not stated, it will be inferred based on the
     * parameters.
     */
    accept?: Narrowable;
    /** convert first parameter's type (for runtime) */
    convertP1?: ComparisonConversionType[];
    /** convert type using all parameters as a group (for runtime) */
    convertAll?: ComparisonConversionType[];
};

/** the _mode_ you're using the `ComparisonLookup` table in */
export type ComparisonMode = "run-time" | "design-time";

type X = AsArray<(string | number) |[string | number, ...readonly (string | number)[]]>;

/**
 * A type which provides a lookup table for standard conversion types.
 */
export type ComparisonLookup<T extends ComparisonMode = "design-time"> = {
    extends: {
        params: [
            types: T extends "run-time"
                ? InputToken__SimpleTokens
                : unknown, ...readonly unknown[]
        ]
    };
    startsWith: {
        params: [string | number, ...readonly (string | number)[]],
        convertAll: ["stringArray", "union"]
    };
    endsWith: {
        params: [string | number, ...readonly (string | number)[]],
        convertAll: ["stringArray", "union"]
    };

    endsWithNumber: {
        params: [];
        accept: string
    };

    contains: {
        params: [substring: string | number];
        accept: string | number;
    }

    containsSome: {
        params: [substrings: string | number, ...readonly (string | number)[]];
        accept: string | number;
        convertAll: ["stringArray", "union"]
    };

    containsAll: {
        params: [substrings: string | number, ...readonly (string | number)[]];
        accept: string | number;
        convertAll: ["stringArray"]
    };

    greaterThan: {
        params: [value: number]
    };

    greaterThanOrEqual: {
        params: [value: number]
    };

    lessThan: {
        params: [value: number]
    };

    lessThanOrEqual: {
        params: [value: number]
    };

    "between (inclusive)": {
        params: [greaterThan: number, lessThan: number]
    };

    "between (exclusive)": {
        params: [greaterThan: number, lessThan: number]
    };

    equals: {
        params: [
            value: T extends "run-time" ? Narrowable : unknown
        ]
    };

    equalsSome: {
        params:
            T extends "run-time"
                ? [values: Narrowable, Narrowable,  ...Narrowable[]]
                : [values: unknown, unknown, ...unknown[]]
    };

    errors: {
        params: []
    };

    errorsOfType: {
        params: [type: string]; accept: Narrowable
    };

    before: {
        params: [date: DateLike]; accept: DateLike
    };

    after: {
        params: [date: DateLike]; accept: DateLike
    };

    truthy: {
        params: []
    };

    falsy: {
        params: []; accept: Narrowable
    };

    true: {
        params: [];
        accept: Narrowable;
    };

    false: {
        params: [];
        accept: Narrowable;
    };

    "keyEquals (object)": {
        params: [key: string, value: Narrowable];
        accept: Dictionary
    };
    "valuesExtend (object)": {
        params: [key: string, type: InputToken__SimpleTokens];
        accept: Dictionary;
    };
    "valuesEqual (object)": {
        params: [value: Narrowable];
        accept: Dictionary;
    };
    "keyStartsWith (object)": {
        params: [key: string, value: Narrowable];
        accept: Dictionary;
    };
    "keyEndsWith (object)": {
        params: [key: string, value: Narrowable];
        accept: Dictionary;
    };
    "keyInValuesEqual (object)": {
        params: [key: string, value: Narrowable];
        accept: Dictionary;
    };
    "keyInValuesExtend (object)": {
        params: [key: string, type: InputToken__SimpleTokens];
        accept: Dictionary;
    };
    returnEquals: {
        params: [ validReturnTypes: unknown, ...unknown[] ]
    };
    returnExtends: {
        params: [ validReturnTypes: unknown, ...unknown[] ]
    };
} & Record<string, ComparisonOp<T>>

/**
 * **ComparisonOperation**
 *
 * Operations known by the `Compare<T>` and `compare()` utilities
 * and leveraged by utilities like `Filter<T>`/`filter()`, etc.
 */
export type ComparisonOperation
 = Keys<ComparisonLookup<"design-time">>[number];

 /**
  * **RuntimeComparisonOperation**
  *
  * Same as `ComparisonOperation` excluding a few operations which
  * revolve around functions where the runtime system does not
  * have enough information to play a useful role.
  */
export type RuntimeComparisonOperation
= Exclude<
    Keys<ComparisonLookup<"run-time">>[number],
    "returnsEquals" | "returnsExtends"
>
