import type {
    IsArray,
    IsDictionary,
    IsFalse,
    IsNumericLiteral,
    IsStringLiteral,
    IsTrue,
} from "inferred-types/types";

/**
 * **IsTruthy**`<T>`
 *
 * A type utility which evaluates `T` for _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_ and returns `true` or `false`
 * where the state can be detected at design time; otherwise returns `boolean`.
 *
 * **See Also:** `IfTruthy`, `IfSomeTruthy`, `IfAllTruthy`, and `TruthyReturns`
 */
export type IsTruthy<T> = 
    // Handle exact falsy values first
    [T] extends [null | undefined | false | 0 | -0 | ""]
        ? false
    // Handle exact truthy values
    : [T] extends [true]
        ? true
    // Handle string literals
    : [T] extends [string]
        ? IsStringLiteral<T> extends true
            ? true  // non-empty string literal
            : boolean // wide string type
    // Handle numeric literals  
    : [T] extends [number]
        ? IsNumericLiteral<T> extends true
            ? [T] extends [0 | -0]
                ? false
                : true
            : boolean // wide number type
    // Handle boolean literals
    : [T] extends [boolean]
        ? IsFalse<T> extends true
            ? false
            : IsTrue<T> extends true
                ? true
                : boolean // wide boolean type
    // Handle arrays and objects (always truthy)
    : IsArray<T> extends true
        ? true
        : IsDictionary<T> extends true
            ? true
            : never;
