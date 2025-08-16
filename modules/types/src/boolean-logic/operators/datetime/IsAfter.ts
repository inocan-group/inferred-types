import type {
    AfterFirst,
    As,
    AsDateMeta,
    DateLike,
    DateMeta,
    Err,
    Extends,
    First,
    IsEqual,
    IsGreaterThan,
    Not,
    Or,
    Unbrand,
} from "inferred-types/types";

type Check<
    A extends readonly (`${number}` | null)[],
    B extends readonly (`${number}` | null)[]
> = [] extends A
    ? false
    : IsEqual<First<A>, First<B>> extends true
        ? Check<AfterFirst<A>, AfterFirst<B>>
        : First<A> extends `${number}`
            ? First<B> extends `${number}`
                ? IsGreaterThan<First<A>, First<B>>
                : First<B> extends null
                    ? Check<AfterFirst<A>, AfterFirst<B>>
                    : true
            : First<A> extends null
                ? First<B> extends `${number}`
                    ? Check<AfterFirst<A>, AfterFirst<B>>
                    : Check<AfterFirst<A>, AfterFirst<B>>
                : Check<
                    AfterFirst<A>,
                    AfterFirst<B>
                >;

// Check if two ISO date strings represent the same date with different precision
type IsSameDateDifferentPrecision<A extends string, B extends string> =
    // Case: "2023-01-01" vs "2023-01-01T00:00:00Z"
    A extends `${infer DatePart}T00:00:00Z`
        ? B extends DatePart ? true : false
    : B extends `${infer DatePart}T00:00:00Z`
        ? A extends DatePart ? true : false
    : false;

// Simple character comparison for single characters (0-9, :, -, T, Z)
type IsCharGreater<A extends string, B extends string> = 
    A extends "0" ? false
    : A extends "1" ? B extends "0" ? true : false
    : A extends "2" ? B extends "0" | "1" ? true : false
    : A extends "3" ? B extends "0" | "1" | "2" ? true : false
    : A extends "4" ? B extends "0" | "1" | "2" | "3" ? true : false
    : A extends "5" ? B extends "0" | "1" | "2" | "3" | "4" ? true : false
    : A extends "6" ? B extends "0" | "1" | "2" | "3" | "4" | "5" ? true : false
    : A extends "7" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" ? true : false
    : A extends "8" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" ? true : false
    : A extends "9" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" ? true : false
    : A extends ":" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ? true : false
    : A extends "T" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "-" | ":" ? true : false
    : A extends "Z" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "-" | ":" | "T" ? true : false
    : A extends "-" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ? true : false
    : false;

// Lexicographic string comparison for ISO date strings
// ISO dates are designed to sort lexicographically, so we can use string comparison
type LexicographicCompare<A extends string, B extends string> = A extends B
    ? false // Equal strings (not after)
    : IsSameDateDifferentPrecision<A, B> extends true
        ? false // Semantically equal dates with different precision
    : [A] extends [never]
        ? false
    : [B] extends [never]
        ? false
    : [A, B] extends [string, string]
        ? A extends `${infer AFirst}${infer ARest}`
            ? B extends `${infer BFirst}${infer BRest}`
                ? AFirst extends BFirst
                    ? LexicographicCompare<ARest, BRest> // First chars match, compare rest
                    : IsCharGreater<AFirst, BFirst> // Compare first characters
                : true // A has chars, B doesn't
            : false // A is empty, B has chars
        : false;

/**
 * **IsAfter**`<A,B>`
 *
 * Tests whether `A` is _after_ (in time) `B`.
 *
 * Preserves literal types by using string comparison for ISO date strings.
 * For wide types or complex dates, it returns boolean.
 */
export type IsAfter<
    A,
    B,
> = A extends object
    ? boolean
    : B extends object
        ? boolean
    : string extends A
        ? boolean
    : string extends B
        ? boolean
    : number extends A
        ? boolean
    : number extends B
        ? boolean
    // Handle numeric year comparisons
    : A extends number
        ? B extends number
            ? IsGreaterThan<A, B>
            : boolean
    // Handle string date comparisons using lexicographic comparison
    // This works for ISO dates because they sort lexicographically
    : A extends string
        ? B extends string
            ? LexicographicCompare<A, B>
            : boolean
    : boolean;
