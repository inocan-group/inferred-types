import type { COMPARISON_OPERATIONS } from "inferred-types/constants";
import type {
    DateLike,
    Dictionary,
    Narrowable,
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
    isTemplateLiteral: {
        params: readonly[];
        accept: unknown;
        take: 1;
    }

    extends: {
        params: readonly [types: unknown, ...unknown[]];
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
        params: readonly [];
        desc: "tests whether a string literal contains only letter characters";
        accept: string;
        take: 0;
    };

    contains: {
        params: readonly [substring: string | number];
        convert: ["stringLiteral"];
        accept: string | number | readonly (string | number)[];
        take: 1;
    };

    containsAll: {
        params: readonly [
            substrings: string | number,
            ...readonly (string | number)[]
        ];
        accept: string | number | readonly (string | number)[];
        convert: "stringArray";
        take: "*";
    };

    containsSome: {
        params: readonly [
            val1: string | number,
            val2: string | number,
            ...(string | number)[]
        ];
        accept: string | number | readonly (string | number)[];
        convert: "stringUnion";
        take: "1";
    };

    greaterThan: {
        params: readonly [value: NumberLike];
        accept: NumberLike;
        take: 1;
    };

    greaterThanOrEqual: {
        params: readonly [value: NumberLike];
        accept: NumberLike;
        take: 1;
    };

    lessThan: {
        params: readonly [value: NumberLike];
        accept: NumberLike;
        take: 1;
    };

    lessThanOrEqual: {
        params: readonly [value: NumberLike];
        accept: NumberLike;
        take: 1;
    };

    objectKeyGreaterThan: {
        params: readonly [
            key: string,
            type: NumberLike
        ];
        // accept: Dictionary<string|symbol, Narrowable>;
        take: 2;
    };

    objectKeyGreaterThanOrEqual: {
        params: readonly [
            key: string,
            type: NumberLike
        ];
        // accept: Record<string, Narrowable>;
        take: 2;
    };

    objectKeyLessThan: {
        params: readonly [
            key: string,
            type: NumberLike
        ];
        take: 2;
        // accept: Dictionary<string|symbol, Narrowable>;
    };

    objectKeyLessThanOrEqual: {
        params: readonly [
            key: string,
            type: NumberLike
        ];
        take: 2;
        // accept: Dictionary;
    };

    betweenInclusively: {
        params: readonly [greaterThan: NumberLike, lessThan: NumberLike];
        accept: NumberLike;
        take: 2;
    };

    betweenExclusively: {
        params: readonly [greaterThan: NumberLike, lessThan: NumberLike];
        accept: NumberLike;
        take: 2;
    };

    equals: {
        params: readonly [ value: unknown ];
        take: 1;
        accept: unknown;
    };

    equalsSome: {
        params: readonly [ potentialValues: unknown, unknown, ...unknown[] ];
        take: "*";
    };

    errors: {
        params: readonly[];
        take: 0;
    };

    errorsOfType: {
        params: readonly [type: string | Error];
        take: 1;
    };

    before: {
        params: readonly [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    after: {
        params: readonly [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    sameDay: {
        params: readonly [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    sameMonth: {
        params: readonly [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    sameMonthYear: {
        params: readonly [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    sameYear: {
        params: readonly [date: DateLike];
        accept: DateLike;
        take: 1;
    };

    truthy: {
        params: readonly[];
        take: 0;
        accept: Narrowable ;
    };

    falsy: {
        params: readonly[];
        accept: Narrowable ;
        take: 0;
    };

    true: {
        params: readonly[];
        take: 0;
    };

    false: {
        params: readonly[];
        take: 0;
    };

    objectKeyEquals: {
        params: readonly [
            key: string,
            value: unknown
        ];
        take: 2;
    };

    objectKeyExtends: {
        params: readonly [
            key: string,
            type: unknown
        ];
        accept: Dictionary<string|symbol, Narrowable>;
        take: 2;
    };

    objectExtends: {
        params: readonly [type: unknown];
        take: 1;
        accept: Dictionary<string|symbol, Narrowable>;
    };

    returnEquals: {
        params: readonly [ validReturnTypes: unknown, ...unknown[] ];
        take: "*";
        accept: (...args: any[]) => any;
    };

    returnExtends: {
        params: readonly [ validReturnTypes: unknown, ...unknown[] ];
        take: "1";
        convert: "union";
        accept: (...args: any[]) => any;
    };
};
