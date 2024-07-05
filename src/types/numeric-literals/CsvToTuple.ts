import { Tuple } from "../base-types";
import { AsNumber, TupleToUnion } from "../type-conversion";
import { NumberLike } from "./NumberLike";


type Tighten<
  T extends string
> = T extends ` ${infer Rest extends string}`
? Rest
: T;


type Process<
  T extends string,
  Result extends readonly unknown[] = []
> = T extends `${infer Element},${infer Rest}`
? Process<
    Rest,
    [
      ...Result,
      Tighten<Element> extends NumberLike
        ? AsNumber<Tighten<Element>>
        : Tighten<Element>
    ]
  >
: [
    ...Result,
    Tighten<T> extends NumberLike
        ? AsNumber<Tighten<T>>
        : Tighten<T>
  ];

type ProcessStr<
  T extends string,
  Result extends readonly unknown[] = []
> = T extends `${infer Element},${infer Rest}`
? ProcessStr<
    Rest,
    [
      ...Result,
      Tighten<Element>
    ]
  >
: [
    ...Result,
    Tighten<T>
  ];

type ProcessUnion<
  T extends string,
  Result extends string | number = never
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
  Result extends string | number = never
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
