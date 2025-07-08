import type { AsNumber, If, IsEqual } from "inferred-types/types";
import type { NumberLike } from "./NumberLike";

type Tighten<
    T extends string,
> = T extends ` ${infer Rest extends string}`
    ? T extends `  ${infer Double extends string}`
        ? Double
        : Rest
    : T;

type Process<
    T extends string,
    Result extends readonly unknown[] = [],
> = T extends `${infer Element},${infer Rest}`
    ? Process<
        Rest,
        [
            ...Result,
            Tighten<Element> extends NumberLike
                ? AsNumber<Tighten<Element>>
                : Tighten<Element>,
        ]
    >
    : [
        ...Result,
        Tighten<T> extends NumberLike
            ? AsNumber<Tighten<T>>
            : Tighten<T>,
    ];

type ProcessJsonTuple<
    T extends string,
    Result extends readonly unknown[] = [],
> = T extends `${infer Element},${infer Rest}`
    ? ProcessJsonTuple<
        Rest,
        [
            ...Result,
            Tighten<Element> extends NumberLike
                ? AsNumber<Tighten<Element>>
                : If<
                    IsEqual<Tighten<Element>, "true">,
                    true,
                    If<
                        IsEqual<Tighten<Element>, "false">,
                        false,
                        Tighten<`"${Element}"`>
                    >
                >,
        ]
    >
    : [
        ...Result,
        Tighten<T> extends NumberLike
            ? AsNumber<Tighten<T>>
            : If<
                IsEqual<Tighten<T>, "true">,
                true,
                If<
                    IsEqual<Tighten<T>, "false">,
                    false,
                    Tighten<`"${T}"`>
                >
            >,
    ];

type ProcessStr<
    T extends string,
    Result extends readonly unknown[] = [],
> = T extends `${infer Element},${infer Rest}`
    ? ProcessStr<
        Rest,
        [
            ...Result,
            Tighten<Element>,
        ]
    >
    : [
        ...Result,
        Tighten<T>,
    ];

type ProcessUnion<
    T extends string,
    Result extends string | number = never,
> = T extends `${infer Element},${infer Rest}`
    ? ProcessUnion<
        Rest,
        Tighten<Element> extends NumberLike
            ? Result | AsNumber<Tighten<Element>>
            : Result | Tighten<Element>
    >
    : Tighten<T> extends NumberLike
        ? Result | AsNumber<Tighten<T>>
        : Result | Tighten<T>;

type ProcessUnionStr<
    T extends string,
    Result extends string | number = never,
> = T extends `${infer Element},${infer Rest}`
    ? ProcessUnionStr<
        Rest,
    Result | Tighten<Element>
    >
    : Result | Tighten<T>;

/**
 * **CsvToTuple**`<T>`
 *
 * Converts a CSV string into a tuple with both numbers
 * and string literals extracted.
 *
 * **Related:** `CsvToTupleStr`, `CsvToUnion`
 */
export type CsvToTuple<T extends string> = Process<T>;

/**
 * **CsvToTupleStr**`<T>`
 *
 * Converts a CSV string into a tuple of string literals.
 *
 * **Related:** `CsvToTuple`
 */
export type CsvToTupleStr<T extends string> = ProcessStr<T>;

/**
 * **CsvToUnion**`<T>`
 *
 * Converts a CSV string into a union of string and/or numeric literals.
 *
 * **Related:** `CsvToTuple`, `CsvToStrUnion`
 */
export type CsvToUnion<T extends string> = ProcessUnion<T>;

/**
 * **CsvToStrUnion**`<T>`
 *
 * Converts a CSV string into a union of string literals.
 *
 * **Related:** `CsvToTuple`, `CsvToUnion`
 */
export type CsvToStrUnion<T extends string> = ProcessUnionStr<T>;

/**
 * **CsvToTuple**`<T>`
 *
 * Converts a CSV string into a tuple with both numbers
 * and string literals but for the string literals it ensures
 * -- just like you find with JSON strings -- that there are
 * explicit double quotes around the string.
 *
 * **Related:** `CsvToTuple`, `CsvToTupleStr`, `CsvToUnion`
 */
export type CsvToJsonTuple<T extends string> = ProcessJsonTuple<T>;
