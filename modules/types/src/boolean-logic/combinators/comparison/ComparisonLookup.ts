import type { COMPARISON_OPERATIONS } from "inferred-types/constants";
import type {
    DateLike,
    Dictionary,
    NumberLike,
} from "inferred-types/types";

/** the _mode_ you're using the `ComparisonLookup` table in */
export type ComparisonMode = "run-time" | "design-time";

/**
 * **ComparisonOperation**`<T>`
 *
 * Operations known by the `Compare<T>` and `compare()` utilities
 * and leveraged by utilities like `Filter<T>`/`filter()`, etc.
 *
 * - the generic `T` is used to switch between `run-time` and `design-time`
 * modes
 */
export type ComparisonOperation = typeof COMPARISON_OPERATIONS[number];

/**
 * A type which provides a lookup table for standard conversion types.
 */
export type ComparisonLookup = {
    extends: {
        params: [types: unknown, ...unknown[]];

        accept: unknown;
    };

    startsWith: {
        params: readonly (string | number)[];
        convert: "stringUnion";
        accept: string | number;
        take: 1;
    };

    endsWith: {
        params: readonly (string | number)[];
        convert: "stringUnion";
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
        desc: "tests whether a string literal starts with a numeric value";
        accept: string;
        take: 0;
    };

    onlyNumbers: {
        params: [];
        desc: "tests whether a string literal contains only numeric characters";
        accept: string;
        take: 0;
    };

    alphaNumeric: {
        params: [];
        desc: "tests whether a string literal contains only alphabetic and numeric characters";
        accept: string;
        take: 0;
    };

    onlyLetters: {
        params: [];
        desc: "tests whether a string literal contains only letter characters";
        accept: string;
        take: 0;
    };

    contains: {
        params: [substring: string | number];
        convert: ["stringLiteral"];
        accept: string | number | readonly (string | number)[];
        take: 1;
    };

    containsAll: {
        params: [substrings: string | number, ...readonly (string | number)[]];
        accept: string | number | readonly (string | number)[];
        convert: "stringArray";
        take: "*";
    };

    containsSome: {
        params: [
            val1: string | number,
            val2: string | number,
            ...(string | number)[]
        ];
        accept: string | number | readonly (string | number)[];
        convert: "stringUnion";
        take: "1";
    };

    greaterThan: {
        params: [value: NumberLike];
        accept: NumberLike;
        take: 1;
    };

    greaterThanOrEqual: {
        params: [value: NumberLike];
        accept: NumberLike;
        take: 1;
    };

    lessThan: {
        params: [value: NumberLike];
        accept: NumberLike;
        take: 1;
    };

    lessThanOrEqual: {
        params: [value: NumberLike];
        accept: NumberLike;
        take: 1;
    };

    objectKeyGreaterThan: {
        params: [
            key: string,
            type: NumberLike
        ];
        accept: Dictionary;
        take: 2;
    };

    objectKeyGreaterThanOrEqual: {
        params: [
            key: string,
            type: NumberLike
        ];
        accept: Dictionary;
        take: 2;
    };

    objectKeyLessThan: {
        params: [
            key: string,
            type: NumberLike
        ];
        take: 2;
        accept: Dictionary;
    };

    objectKeyLessThanOrEqual: {
        params: [
            key: string,
            type: NumberLike
        ];
        take: 2;
        accept: Dictionary;
    };

    betweenInclusively: {
        params: [greaterThan: NumberLike, lessThan: NumberLike];
        accept: NumberLike;
        take: 2;
    };

    betweenExclusively: {
        params: [greaterThan: NumberLike, lessThan: NumberLike];
        accept: NumberLike;
        take: 2;
    };

    equals: {
        params: [ value: unknown ];
        accept: unknown;
        take: 1;
    };

    equalsSome: {
        params: [ potentialValues: unknown, unknown, ...unknown[] ];
        accept: unknown;
        take: "*";
    };

    errors: {
        params: [];
        accept: unknown;
        take: 0;
    };

    errorsOfType: {
        params: [type: string | Error];
        accept: unknown;
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
    };

    truthy: {
        params: [];
        accept: unknown;
        take: 0;
    };

    falsy: {
        params: [];
        accept: unknown;
        take: 0;
    };

    true: {
        params: [];
        accept: unknown;
        take: 0;
    };

    false: {
        params: [];
        accept: unknown;
        take: 0;
    };

    objectKeyEquals: {
        params: [
            key: string,
            value: unknown
        ];
        accept: Dictionary;
        take: 2;
    };

    objectKeyExtends: {
        params: [
            key: string,
            type: unknown
        ];
        accept: Dictionary;
        take: 2;
    };

    objectExtends: {
        params: [type: unknown];
        take: 1;
        accept: Dictionary;
    };

    returnEquals: {
        params: [ validReturnTypes: unknown, ...unknown[] ];
        take: "*";
    };

    returnExtends: {
        params: [ validReturnTypes: unknown, ...unknown[] ];
        take: "1";
        convert: "union";
    };
};
