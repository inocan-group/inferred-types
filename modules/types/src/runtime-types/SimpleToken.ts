import type {
    SIMPLE_ARRAY_TOKENS,
    SIMPLE_DICT_TOKENS,
    SIMPLE_MAP_TOKENS,
    SIMPLE_OPT_SCALAR_TOKENS,
    SIMPLE_SCALAR_TOKENS,
    SIMPLE_SET_TOKENS,
    SIMPLE_UNION_TOKENS,
} from "inferred-types/constants";

/**
 * the _optional_ variants of the `SimpleScalarToken` type
 */
export type OptionalSimpleScalarTokens = typeof SIMPLE_OPT_SCALAR_TOKENS[number];

/**
 * the _required_ variants of the `SimpleScalarToken` type
 */
export type RequiredSimpleScalarTokens = typeof SIMPLE_SCALAR_TOKENS[number];

/**
 * **SimpleUnionToken**
 *
 * A subset of `SimpleToken` which represents union types.
 */
export type SimpleUnionToken = typeof SIMPLE_UNION_TOKENS[number];

/**
 * a subset of `SimpleContainerToken`
 */
export type SimpleDictToken = typeof SIMPLE_DICT_TOKENS[number];

/**
 * a subset of `SimpleContainerToken`
 */
export type SimpleArrayToken = typeof SIMPLE_ARRAY_TOKENS[number];

/**
 * a subset of `SimpleContainerToken`
 */
export type SimpleMapToken = typeof SIMPLE_MAP_TOKENS[number];

/**
 * a subset of `SimpleContainerToken`
 */
export type SimpleSetToken = typeof SIMPLE_SET_TOKENS[number];

/**
 * **SimpleContainerToken**
 *
 * A subset of `SimpleToken` which provides shortcut's for expressing
 * _container_ types via a simple token.
 */
export type SimpleContainerToken =
    | SimpleDictToken
    | SimpleArrayToken
    | SimpleMapToken
    | SimpleArrayToken;

/**
 * **SimpleScalarToken**
 *
 * A subset of the `SimpleToken` which may be more useful for building
 * simple string literal values.
 *
 * **Note:** this includes both `RequiredSimpleScalarTokens` and `OptionalSimpleScalarTokens`.
 */
export type SimpleScalarToken =
    | RequiredSimpleScalarTokens
    | OptionalSimpleScalarTokens;

/**
 * **SimpleToken**
 *
 * An enumeration of string values which point to _types_ in the
 * the type system.
 *
 * **Related:**
 * - `SimpleScalarToken`, `SimpleContainerToken`, `SimpleUnionToken`,
 * - `FromSimpleToken`, `FromDefn`
 * - `TypeToken`
 */
export type SimpleToken =
    | SimpleScalarToken
    | SimpleArrayToken
    | SimpleDictToken
    | SimpleMapToken
    | SimpleSetToken
    | SimpleUnionToken;
