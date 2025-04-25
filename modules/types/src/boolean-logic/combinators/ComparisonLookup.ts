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
    NumberLike,
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
        params:
            T extends "run-time"
                ? [types: InputToken__SimpleTokens, ...InputToken__SimpleTokens[]]
                : [types: unknown, ...unknown[]]

        accept: Narrowable;
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

    objectKeyValueGreaterThan: {
        params: [
            key: string,
            type: NumberLike
        ];
        accept: Dictionary;
    };

    objectKeyValueGreaterThanOrEqual: {
        params: [
            key: string,
            type: NumberLike
        ];
        accept: Dictionary;
    };

    objectKeyValueLessThan: {
        params: [
            key: string,
            type: number
        ];
        convertFirst: "token"
        accept: Dictionary;
    };

    objectKeyValueLessThanOrEqual: {
        params: [
            key: string,
            type: number
        ];
        convertFirst: "token"
        accept: Dictionary;
    };


    "betweenInclusively": {
        params: [greaterThan: number, lessThan: number]
    };

    "betweenExclusively": {
        params: [greaterThan: number, lessThan: number]
    };

    equals: {
        params: [
            value: T extends "run-time"
                ? Narrowable
                : unknown
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
        params: [date: DateLike];
        accept: DateLike
    };

    after: {
        params: [date: DateLike];
        accept: DateLike
    };

    sameDay: {
        params: [date: DateLike];
        accept: DateLike;
    };

    sameMonth: {
        params: [date: DateLike];
        accept: DateLike;
    };

    sameMonthYear: {
        params: [date: DateLike];
        accept: DateLike;
    };

    sameYear: {
        params: [date: DateLike];
        accept: DateLike;
    }

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

    objectKeyEquals: {
        params: [key: string, value: Narrowable];
        accept: Dictionary
    };
    objectKeyExtends: {
        params: [
            key: string,
            type: T extends "run-time"
                ? InputToken__SimpleTokens
                : unknown
        ];
        accept: Dictionary;
    };

    objectKeyStartsWith: {
        params: [key: string, value: Narrowable];
        accept: Dictionary;
    };
    objectKeyEndsWith: {
        params: [key: string, value: Narrowable];
        accept: Dictionary;
    };
    objectValueEquals: {
        params: [value: Narrowable];
        accept: Dictionary;
    };
    objectValueExtends: {
        params: [
            type: T extends "run-time"
                ? InputToken__SimpleTokens
                : unknown
        ];
        convertFirst: "token"
        accept: Dictionary;
    };

    objectKeyValueExtends: {
        params: [
            key: string,
            type: T extends "run-time"
                ? InputToken__SimpleTokens
                : unknown
        ];
        convertFirst: "token"
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
