import { Concat } from "src/runtime/lists/Concat";
import {  IfLiteral, IfStartsWith } from "src/types/boolean-logic";
import { IfReadonlyArray } from "src/types/boolean-logic/array";
import { IfString } from "src/types/boolean-logic/string";
import { AfterFirst } from "src/types/lists";
import { First } from "src/types/lists/First";
import { Narrowable } from "src/types/Narrowable";
import { ToString } from "src/types/type-conversion";
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
          
export type TokenizeStringLiteral<
  T extends readonly (string | number | boolean)[]
> = TokenAcc<T>;

    
type ConcatLiteral<
  T extends readonly (string | number | boolean)[],
  Results extends string = ""
> = [] extends T
  ? Results
  : IfStartsWith<
      First<T>, "literal:",
      any,
      any
    >;



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

type ToUnderlying<T extends Narrowable> = IfReadonlyArray<T, T & readonly any[], readonly [T]>;

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
  underlying: ToUnderlying<TUnderlying>;
  defaultValue: TDefaultValue;
  validations: TValidations;
}>;
