import { Concat } from "src/runtime/lists/Concat";
import { stripLeading } from "src/runtime/literals/stripLeading";
import { createTypeMapRule } from "src/runtime/runtime/createTypeMatcher";
import { AlphaNumericChar, LowerAlpha, UpperAlpha } from "src/types/alphabetic";
import {  IfLiteral } from "src/types/boolean-logic";
import { IfReadonlyArray } from "src/types/boolean-logic/array";
import { IfString } from "src/types/boolean-logic/string";
import { AfterFirst } from "src/types/lists";
import { First } from "src/types/lists/First";
import { Narrowable } from "src/types/Narrowable";
import { Digit } from "src/types/Numeric";
import { ToString } from "src/types/type-conversion";
import { MapType } from "src/types/type-conversion/MapType";
import { FromTypeDefn, Type, TypeDefaultValue } from "../Type";

/**
 * **StringLiteralToken**
 * 
 * The runtime type of a string literal can be composed via "tokens" as defined
 * by this type.
 * ```ts
 * // `${NumericDigit}-${string}`
 * const t = type(
 *    d => d.stringLiteral(s => s.tokens("digit", "l:-", "string"))
 * );
 * ```
 */
export type StringLiteralToken = "<string>" | "<number>" | "<digit>" | "<boolean>" | "<letter>" | "<letter:lowercase>" | "<letter:uppercase>" | `literal:${string}`;

type TokenAcc<
  T extends readonly (string | number | boolean)[],
  Results extends readonly StringLiteralToken[] = []
> = [] extends T
  ? Results
  : First<T> extends StringLiteralToken
    ? TokenAcc<AfterFirst<T>, [...Results, First<T>]>
    : IfLiteral<
        First<T>,
        Concat<["literal:", ToString<First<T>>]> extends StringLiteralToken
          ? TokenAcc<AfterFirst<T>, [...Results, Concat<["literal:", ToString<First<T>>]>]>
          : never,
        IfString<First<T>, "<string>", "<boolean>">
      >;

/**
 * **TokenizeStringLiteral**`<T>`
 * 
 * Type utility which receives a list of _tokens_ which are intended
 * to represent the underlying type of a string literal. This utility
 * will ensure that known tokens -- those delimited by `<` and `>` symbols
 * are maintained but that any _string literals_ are prefixed with "literal:".
 * 
 * - a wide _number_ or _boolean_ type will be converted to `${number}` and `${boolean}`
 * - literal values for number and boolean will be converted to a string using `ToString<T>`
 * 
 * **Related:** `ToStringLiteral<T>`
 */
export type TokenizeStringLiteral<
  T extends readonly (string | number | boolean)[]
> = TokenAcc<T>;

export type StringLiteralMapper = {
  "<string>": `${string}`;
  "<number>": `${number}`;
  "<boolean>": `${boolean}`;
  "<digit>": `${Digit}`;
  "<letter>": `${AlphaNumericChar}`;
  "<letter:lowercase>": `${LowerAlpha}`;
  "<letter:uppercase>": `${UpperAlpha}`;
};

// const matchers = [
//   createTypeMatcher("equals", "<number>", (v) => v as unknown as `${number}`),
//   createTypeMatcher("equals", "<boolean>", (v) => v as unknown as `${boolean}`),
//   createTypeMatcher("equals", "<digit>", (v) => v as unknown as `${Digit}`),
//   createTypeMatcher("equals", "<letter>", (v) => v as unknown as `${AlphaNumericChar}`),
//   createTypeMatcher("equals", "<letter:lowercase>", (v) => v as unknown as `${LowerAlpha}`),
//   createTypeMatcher("equals", "<letter:uppercase>", (v) => v as unknown as `${UpperAlpha}`),
//   createTypeMatcher("startsWith", "literal:", <V extends string>(v: V) => stripLeading(v, "literal:")),
// ];
  

export type ToStringLiteral<
  T extends readonly (string | number | boolean)[]
> = TokenizeStringLiteral<T>;

// DEF
// 1. union of literals (or singular literal)
// 2. builder API
//    - `startsWith()`
//    - `endsWith()`
//    - `contains()`
//    - `literalUnion(a,b,c)`
//    - `tokens()` - ["string", "l:literal", "number", "l:-", "numeric-digit", "bool"]

type ToUnderlying<T extends Narrowable> = IfReadonlyArray<
  T, T & readonly any[], readonly [T]
>;

type StringLiteralBuilderApi = {
  startsWith<T extends string>(start: T): Type<"stringLiteral">;
};

export type TypeApiStringLiteral = <
TRequired extends boolean,
TDesc extends string,
// a single string literal, an array of readonly strings, 
TUnderlying extends Narrowable[],
TDefaultValue extends TypeDefaultValue<"stringLiteral", TRequired, ToUnderlying<TUnderlying>>,
TValidations extends readonly any[] | "no-validations", 
>(
  ...defn: TUnderlying
  // options?: TypeOptions<
  //   "stringLiteral",TRequired, TDesc, ToUnderlying<TUnderlying>, TDefaultValue, TValidations
  // >
) => FromTypeDefn<{
  kind: "stringLiteral";
  isRequired: TRequired;
  description: TDesc;
  underlying: ToUnderlying<TUnderlying>;
  defaultValue: TDefaultValue;
  validations: TValidations;
}>;