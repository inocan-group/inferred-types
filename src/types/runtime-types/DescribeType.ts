
import { 
  AnyFunction, 
  AnyObject, 
  Nothing, 
  IfNever, 
  IfStringLiteral, 
  IsEqual,
  IfNumericLiteral,
  IfBooleanLiteral,
  IfLiteral,
  IfUnion,
  UnionToTuple,
  Concat,
  Join,
  IfTuple
} from "src/types";

type DescribeWide<T> = IfNever<
  T, 
  "never",
  IsEqual<T, Nothing> extends true ? "nothing"
  : T extends string ? "string"
  : T extends number ? "number"
  : T extends boolean ? "boolean"
  : T extends AnyFunction ? "function"
  : T extends unknown[] | readonly unknown[] 
    ? IfTuple<T, Concat<["tuple[", Join<T, ", ", 3>, "]"]>, "array">
  : T extends AnyObject | object ? "object"
  : T extends symbol ? "symbol" 
  : IsEqual<T,null> extends true  ? "null"
  : IsEqual<T,undefined> extends true  ? "undefined"
  : T extends unknown ? "unknown"
  : "never"
>;

type DescribeNarrow<T> = IfNever<
T, "never",
IsEqual<T, Nothing> extends true ? "nothing"
: T extends string ? IfStringLiteral<
    T,
    `string-literal(${T})`,
    "string"
  >
: T extends number ? IfNumericLiteral<
    T, 
    `numeric-literal(${T})`, 
    "number"
  >
: T extends boolean ? IfBooleanLiteral<T, T extends true ? "true" : "false", "boolean">
: T extends AnyFunction ? "function"
: T extends unknown[] ? IfTuple<T, Concat<["tuple[", Join<T, ", ", 3>, "]"]>, "array">
: T extends AnyObject | object ? IfLiteral<T, "object-literal", "object">
: T extends symbol ? "symbol" 
: IsEqual<T,null> extends true  ? "null"
: IsEqual<T,undefined> extends true  ? "undefined"
: T extends unknown ? "unknown"
: "never"
>;


/**
 * **DescribeType**`<T>`
 * 
 * Describes the type in string form. The type match
 * it is looking for is only _wide types_.
 * 
 * **Related:** `DescribeTypeNarrowly` 
 */
export type DescribeType<T> = IfNever<
  T,
  "never",
  IfUnion<
    DescribeWide<T>,
    Concat<[
      "union(",
      Join<UnionToTuple<DescribeWide<T>>, " | ">,
      ")" 
    ]>,
    DescribeWide<T>
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
  : IfUnion<
      DescribeNarrow<T>,
      Concat<[
        "union(",
        Join<UnionToTuple<DescribeNarrow<T>>, " | ">,
        ")" 
      ]>,
      DescribeNarrow<T>
    >
>;
