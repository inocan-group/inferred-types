
import { 
  AnyFunction, 
  AnyObject, 
  Nothing, 
  IfNever, 
  IsStringLiteral, 
  IsEqual,
  IsNumericLiteral,
  IsBooleanLiteral,
  IsLiteral,
  IsUnion,
  If,
  UnionToTuple,
  Concat,
  Join,
  IsTuple
} from "src/types/index";

/**
 * **TypeFormat**
 * 
 * Options for how you'd like to parse a type at runtime.
 * 
 * - `normal` represents like you'd typically see them in your editor:
 *    - a _wide string_ type would just show as `string`
 *    - a _string literal_ would show like `"foo"`, `"42"`, etc 
 *    - whereas a numeric literal would show like `42` (without quotes)
 * - `tokenized` representation is the type as it would be defined by
 * the runtime utility `type()`.
 */
export type TypeFormat = "normal" | "tokenized"

type Describe<
  T,
  _TFormat extends TypeFormat = "normal"
> = IfNever<
T, "never",
IsEqual<T, Nothing> extends true ? "nothing"
: T extends string ? If<
    IsStringLiteral<T>,
    `string-literal(${T})`,
    "string"
  >
: T extends number ? If<
    IsNumericLiteral<T>, 
    `numeric-literal(${T})`, 
    "number"
  >
: T extends boolean ? If<IsBooleanLiteral<T>, T extends true ? "true" : "false", "boolean">
: T extends AnyFunction ? "function"
: T extends unknown[] 
  ? IsTuple<T> extends true ? Concat<["tuple[", Join<T, ", ", 3>, "]"]> : "array"
: T extends AnyObject | object ? If<IsLiteral<T>, "object-literal", "object">
: T extends symbol ? "symbol" 
: IsEqual<T,null> extends true  ? "null"
: IsEqual<T,undefined> extends true  ? "undefined"
: T extends unknown ? "unknown"
: "never"
>;

type HandleUnion<
  T extends readonly unknown[]
> = {
  [K in keyof T]: Describe<T[K]>
}


/**
 * **DescribeType**`<T>`
 * 
 * Describes the type of `T`.
 * 
 * - this includes being able to identify "runtime types" like those
 * defined from the `type()` runtime utility in this library as the
 * underlying type
 */
export type DescribeType<T> = IfNever<
  T,
  "never",
  If<
    IsUnion<T>,
    UnionToTuple<T> extends readonly unknown[]
      ? Concat<[
          "union(",
          HandleUnion<UnionToTuple<T>>,
          ")"
        ]>
      : never,
    Describe<T>
  >
>;

/**
 * **DescribeTypeNarrowly**`<T>`
 * 
 * Describes the type in string form. The description
 * attempts to segment all literal types from their wide
 * counterparts.
 * 
 * **Related:** `DescribeType` 
 */
export type DescribeTypeNarrowly<T> = IfNever<
T,
"never",
IsEqual<T, boolean> extends true
  ? "boolean"
  : If<
      IsUnion<DescribeNarrow<T>>,
      Concat<[
        "union(",
        Join<UnionToTuple<DescribeNarrow<T>>, " | ">,
        ")" 
      ]>,
      DescribeNarrow<T>
    >
>;
