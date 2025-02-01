import type {
  AfterFirst,
  AnyObject,
  As,
  AsString,
  Equals,
  Extends,
  First,
  Join,
  Or,
  QuoteCharacter,
  Scalar,
  StringKeys,
  ToStringArray,
  Tuple,
} from "inferred-types/types";

type AsJsonArray<T extends Tuple> = Join<
  [
    "[ ",
    ...ToStringArray<T>,
    " ]",
  ]
>;

/**
 * **ToJsonValue**`<T>`
 *
 * Converts the value in `T` to a form appropriate for a
 * JSON value.
 *
 * Note: all outputs are a _string_ but:
 *
 * - string are placed in double quotes
 * - tuples are processed recursively
 */
export type ToJsonValue<
  T,
  Q extends QuoteCharacter = "\"",
> = T extends string
  ? `${Q}${T}${Q}`
  : T extends number
    ? `${T}`
    : T extends boolean
      ? `${T}`
      : T extends undefined
        ? "undefined"
        : T extends null
          ? "null"
          : T extends Tuple
            ? AsJsonArray<
              As<{ [K in keyof T]: ToJsonValue<T[K]> }, string>
            >
            : never;

type InnerArray<
  T extends readonly unknown[],
  Q extends QuoteCharacter
> = {
  [K in keyof T]: T[K] extends string
    ? `${Q}${T[K]}${Q}`
    : Or<[
      Extends<T[K], number>,
      Extends<T[K], boolean>,
      Extends<T[K], null>,
      Extends<T[K], undefined>,
    ]> extends true
    ? `${As<T[K], number | boolean | null | undefined>}`
    : T[K] extends readonly unknown[]
    ? ToJsonArray<T[K], Q>
    : T[K] extends AnyObject
    ? `{ ${InnerObject<T[K], StringKeys<T[K]>, Q>} }`
    : never
};

/**
 * **ToJsonArray**`<T,[Q]>`
 *
 * Converts an array to a JSON string of the same type.
 *
 * **Related:** `ToJson`, `ToJsonObject`, `ToJsonScalar`
 */
export type ToJsonArray<
  T extends readonly unknown[],
  Q extends QuoteCharacter = "\""
> = `[ ${Join<InnerArray<T,Q>, ", ">} ]`;


type InnerObject<
  T extends AnyObject,
  K extends readonly (keyof T & string)[],
  Q extends QuoteCharacter,
  R extends readonly string[] = [],
> = [] extends K
  ? Join<R, ", ">
  : InnerObject<
      T,
      AfterFirst<K>,
      Q,
      [
        ...R,
        Or<[
          Extends<T[First<K>], number>,
          Extends<T[First<K>], boolean>,
          Equals<T[First<K>], null>,
          Equals<T[First<K>], undefined>,
        ]> extends true
        ? `${Q}${First<K>}${Q}: ${As<T[First<K>], boolean | number | null | undefined>}`
        : T[First<K>] extends string
        ? `${Q}${First<K>}${Q}: ${Q}${T[First<K>]}${Q}`
        : T[First<K>] extends readonly unknown[]
        ? `${Q}${First<K>}${Q}: ${ToJsonArray<T[First<K>], Q>}`
        : T[First<K>] extends AnyObject
        ? `${Q}${First<K>}${Q}: ${ToJsonObject<T[First<K>]>}`
        : never
      ]
    >
;

/**
 * **ToJsonObject**`<T>`
 *
 * Converts an object type `T` to a JSON string of the same type.
 *
 * **Related:** `ToJson`, `ToJsonArray`, `ToJsonScalar`
 */
export type ToJsonObject<
  T extends AnyObject,
  Q extends QuoteCharacter = "\"",
> = `{ ${InnerObject<T, StringKeys<T>, Q>} }`;


/**
 * **ToJsonScalar**`<T>`
 *
 * Converts a scalar value to the JSON string representation.
 *
 * **Related:** `ToJson`, `ToJsonArray`, `ToJsonObject`
 */
export type ToJsonScalar<
  T extends Exclude<Scalar, Symbol>,
  Q extends QuoteCharacter = "\""
> = T extends string
? `${Q}${T}${Q}`
: `${T}`;



/**
 * Converts an object, array or scalar value to a
 * strongly typed JSON string.
 *
 * **Related:** `ToJsonObject`, `ToJsonArray`, `ToJsonScalar`
 */
export type ToJson<
  T extends Exclude<Scalar, Symbol> | AnyObject | Tuple,
  Q extends QuoteCharacter = "\""
> = T extends Exclude<Scalar, Symbol>
? ToJsonScalar<T, Q>
: T extends AnyObject
? ToJsonObject<T, Q>
: T extends Tuple
? ToJsonArray<T,Q>
: never;
