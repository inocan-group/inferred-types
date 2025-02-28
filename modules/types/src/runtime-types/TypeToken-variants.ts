/* eslint-disable no-template-curly-in-string */
import type {
    TYPE_TOKEN_REC_KEY_VARIANTS,
    TYPE_TOKEN_REC_VARIANTS,
    TYPE_TOKEN_STRING_SET_VARIANTS,
    TYPE_TOKEN_UNION_SET_VARIANTS,
} from "inferred-types/constants";
import type { MetricCategory, ReplaceAll } from "inferred-types/types";
import type { TypeTokenDelimiter, TypeTokenKind } from "./TypeToken";

type MakeDynamic<T extends readonly string[]> = {
    [K in keyof T]: ReplaceAll<
        ReplaceAll<T[K], "${string}", `${string}`>,
        "${Metric}",
        MetricCategory
    >
};

/**
 * Type extensions for the `string` variant
 *
 * Allow for wide "string", or a string literal.
 */
export type TypeToken__String = `${string}`;

export type TypeToken__StringSet = MakeDynamic<typeof TYPE_TOKEN_STRING_SET_VARIANTS>[number];

/**
 * Type extensions for the `number` variant.
 *
 * Allow for wide "number", a numeric literal.
 */
export type TypeToken__Number = `::${number}`;

export type TypeToken__NumberSet =
    | "bigInt" | `bigInt::${bigint}`
    | "digit" | `digit::${2 | 3 | 4}`
    | "integer";

type params = string;
type rtn = string;

type D = TypeTokenDelimiter;

export type TypeToken__Fn = `[${params}]` | `[${params}]${D}${rtn}` | `any::${rtn}`;
export type TypeToken__Gen = `[${params}]` | `[${params}]${D}${rtn}` | `gen${D}any${D}${rtn}`;

export type TypeToken__FnSet =
    | `withoutParams` | `withoutParams${D}${rtn}`
    | `booleanLogic` | `booleanLogic${D}[${params}]`;

export type RecVariant = typeof TYPE_TOKEN_REC_VARIANTS[number];
export type RecKeyVariant = typeof TYPE_TOKEN_REC_KEY_VARIANTS[number];

export type TypeToken__Rec = `${RecVariant}${D}${RecKeyVariant}` | `${D}kv${D}${string}` | `${D}kv${D}${string}${D}${"withUnknownIndex" | "withAnyIndex"}`;

export type TypeToken__Undefined = "";
export type TypeToken__Null = "";
export type TypeToken__Boolean = "";
export type TypeToken__True = "";
export type TypeToken__False = "";
export type TypeToken__Never = "";
export type TypeToken__Unknown = "";

export type TypeToken__UnionSet = typeof TYPE_TOKEN_UNION_SET_VARIANTS[number];

interface _TypeTokenLookup {
    "string": TypeToken__String;
    "string-set": TypeToken__StringSet;
    "number": TypeToken__Number;
    "number-set": TypeToken__NumberSet;

    "undefined": TypeToken__Undefined;
    "null": TypeToken__Null;
    "boolean": TypeToken__Boolean;
    "true": TypeToken__True;
    "false": TypeToken__False;
    "never": TypeToken__Never;
    "unknown": TypeToken__Unknown;
    "fn": TypeToken__Fn;
    "fn-set": TypeToken__FnSet;
    "gen": TypeToken__Gen;
    "rec": TypeToken__Rec;
    "arr": "";
    "map": "";
    "weak": "";
    "union": "";
    "union-set": TypeToken__UnionSet;

}
/**
 * **TypeTokenLookup**`<T>`
 *
 * Adds allowed string literal variants for a given `TypeTokenKind`
 */
export type TypeTokenLookup<T extends TypeTokenKind> = T extends keyof _TypeTokenLookup
    ? _TypeTokenLookup[T]
    : "";
