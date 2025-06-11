import {
    DateLike,
    Dictionary,
    InputToken__SimpleTokens,
    InputTokenLike,
    Keys,
    Narrowable,
    NumberLike,
} from "inferred-types/types";

/**
 * Ways to convert conversion parameters to a `Comparator`
 * type when the `convertAll` configuration is active.
 */
export type ComparisonParamConvert =
| "union"
| "string-union" // convert to string array then union
| "token" // converts an InputToken to the type it represents
| "stringLiteral"
| "stringArray";


/**
 * the definition of a _comparator_ operation
 */
export type ComparisonOpConfig<T extends ComparisonMode = ComparisonMode> = {
    params: T extends "run-time"
        ? readonly Narrowable[]
        : readonly unknown[];
    /**
     * Explicitly state the _type_ the runtime function can take when moved
     * into strict mode. If not stated, it will be inferred based on the
     * parameters.
     */
    accept?: T extends "run-time" ? Narrowable : unknown;

    /**
     * how many parameters the function expects to take
     */
    take?: 0 | 1 | 2 | 3 | "*";
    /**
     * conversion of the parameters before comparison starts
     *
     * - if a tuple then the conversion is done element by element
     * of the parameters received
     * - if not a tuple then the operation is performed across
     * all the parameters
     *
     * **Note:** some operations -- like `union` -- when applied across
     * parameters will change the parameter count; this is likely
     * desired but just make sure you consider this.
     */
    convert?: ComparisonParamConvert | readonly ComparisonParamConvert[];
};

/** the _mode_ you're using the `ComparisonLookup` table in */
export type ComparisonMode = "run-time" | "design-time";


/**
 * A type which provides a lookup table for standard conversion types.
 */
export type ComparisonLookup<T extends ComparisonMode = "design-time"> = {
    extends: {
        params: T extends "run-time"
                ? [
                    types: InputTokenLike,
                    ...InputTokenLike[]
                ]
                : [types: unknown, ...unknown[]]

        accept: T extends "run-time" ? Narrowable : unknown;
    };

    startsWith: {
        params: [string | number, ...readonly (string | number)[]];
        convert: "string-union";
        take: 1;
    };

    endsWith: {
        params: [string | number, ...readonly (string | number)[]],
        convert: "string-union";
        accept: string | number;
        take: 1;
    };

    endsWithNumber: {
        params: [];
        desc: "tests whether a string literal ends with a numeric value";
        accept: string;
        take: 0;
    };

    startsWithNumber: {
        params: [];
        desc: "tests whether a string literal starts with a numeric value"
        accept: string;
        take: 0;
    };

    onlyNumbers: {
        params: [];
        desc: "tests whether a string literal contains only numeric characters"
        accept: string;
        take: 0;
    };

    alphaNumeric: {
        params: [];
        desc: "tests whether a string literal contains only alphabetic and numeric characters"
        accept: string;
        take: 0;
    };

    onlyLetters: {
        params: [];
        desc: "tests whether a string literal contains only letter characters"
        accept: string;
        take: 0;
    };

    contains: {
        params: [substring: string | number];
        convert: ["stringLiteral"];
        accept: string | number;
        take: 1;
    }

    containsAll: {
        params: [substrings: string | number, ...readonly (string | number)[]];
        accept: string | number;
        convert: "stringArray";
        take: "*"
    };

    containsSome: {
        params: [substrings: string | number, ...readonly (string|number)[]],
        accept: string | number;
        convert: "string-union";
        take: "1"
    };

    greaterThan: {
        params: [value: NumberLike]
        take: 1;
    };

    greaterThanOrEqual: {
        params: [value: NumberLike];
        take: 1;
    };

    lessThan: {
        params: [value: NumberLike];
        take: 1;
    };

    lessThanOrEqual: {
        params: [value: NumberLike];
        take: 1;
    };

    objectKeyValueGreaterThan: {
        params: [
            key: string,
            type: NumberLike
        ];
        accept: Dictionary;
        take: 2;
    };

    objectKeyValueGreaterThanOrEqual: {
        params: [
            key: string,
            type: NumberLike
        ];
        accept: Dictionary;
        take: 2;
    };

    objectKeyValueLessThan: {
        params: [
            key: string,
            type: NumberLike
        ];
        take: 2;
        accept: Dictionary;
    };

    objectKeyValueLessThanOrEqual: {
        params: [
            key: string,
            type: NumberLike
        ];
        take: 2;
        accept: Dictionary;
    };


    betweenInclusively: {
        params: [greaterThan: number, lessThan: number],
        accept: number;
        take: 2;
    };

    betweenExclusively: {
        params: [greaterThan: number, lessThan: number],
        accept: number;
        take: 2;
    };

    equals: {
        params: [
            T extends "run-time"
                ? Narrowable
                : unknown
        ];
        accept: T extends "run-time" ? Narrowable : unknown;
        take: 1;
    };

    equalsSome: {
        params: T extends "run-time"
            ? [values: Narrowable, Narrowable,  ...Narrowable[]]
            : [values: unknown, unknown, ...unknown[]];
        take: "*";
    };

    errors: {
        params: [];
        take: 0;
    };

    errorsOfType: {
        params: [type: string | Error];
        accept: Narrowable;
        take: 1;
    };

    before: {
        params: [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    after: {
        params: [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    sameDay: {
        params: [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    sameMonth: {
        params: [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    sameMonthYear: {
        params: [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    sameYear: {
        params: [date: DateLike];
        accept: DateLike;
        take: 1;
    }

    truthy: {
        params: [];
        accept: T extends "run-time" ? Narrowable : unknown;
        take: 0;
    };

    falsy: {
        params: [];
        accept: T extends "run-time" ? Narrowable : unknown;
        take: 0;
    };

    true: {
        params: [];
        accept: T extends "run-time" ? Narrowable : unknown;
        take: 0;
    };

    false: {
        params: [];
        accept: T extends "run-time" ? Narrowable : unknown;
        take: 0;
    };

    objectKeyEquals: {
        params: [
            key: string,
            value: T extends "run-time" ? Narrowable : unknown
        ];
        accept: Dictionary;
        take: 2;
    };

    objectKeyExtends: {
        params: [
            key: string,
            type: T extends "run-time"
                ? InputTokenLike
                : unknown
        ];
        accept: Dictionary;
        convert: [
            "none",
            T extends "run-time"
                ? "token"
                : "none"
        ]
        take: 2;
    };


    objectExtends: {
        params: [
            type: T extends "run-time"
                ? InputTokenLike
                : unknown
        ];
        convert: [
            T extends "runtime" ? "token" : "none"
        ];
        take: 1;
        accept: Dictionary;
    };


    returnEquals: {
        params: [ validReturnTypes: unknown, ...unknown[] ];
        take: "*";
    };

    returnExtends: {
        params: [ validReturnTypes: unknown, ...unknown[] ]
        take: "1";
        convert: "union";
    };
}

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
