import { CamelCase, KebabCase, PascalCase, StripLeading, StripTrailing } from "../string-literals";
import {  IfEndsWith, IfEqual, IfExtends, IfNumericLiteral,  IfStartsWith, IfStringLiteral } from "../boolean-logic";
import {  FirstOrElse } from "../lists";
import { RemoveNever } from "../lists/extractors";
import { Narrowable } from "../literals/Narrowable";
import { ToString } from "./ToString";
import { TypeTuple } from "./TypeTuple";
import { Join } from "../string-literals/Join";
import { TYPE_MATCHER_DESC, TYPE_TRANSFORMER_DESC } from "src/runtime/runtime";

/**
 * **TypeMapMatcher**
 * 
 * Represents the _method_ you will use to match a type and any necessary
 * parameter to fully qualify it.
 */
export type TypeMapMatcher = 
  | ["Extends", any]
  | ["Equals", any]
  | ["NotEqual", any]
  | ["StartsWith", string | number]
  | ["EndsWith", string | number]
  | ["Truthy", any]
  | ["Falsy", any]
  | ["Returns", any]
  | ["Any"];

/**
 * The types of transformation you want to apply to matched tokens
 */
export type TypeMapTransformer = 
  | ["Identity"] 
  | ["Capitalized"]
  | ["PascalCase"]
  | ["CamelCase"]
  | ["KebabCase"]
  | ["ToString"]
  | ["ToTrue"]
  | ["ToFalse"]
  | ["ToBoolean"]
  | ["AsString"]
  | ["AsBooleanString"]
  | ["AsNumericString"]
  | ["Never"]
  | ["StripLeading", string] 
  | ["StripTrailing", string] 
  | ["As", TypeTuple<any, string>] 
  | ["NumericLiteral", number]
  | ["StringLiteral", string];

/**
 * **TypeRuleDesc**
 * 
 * Type utility which builds a description from the matcher and transformer.
 */
export type TypeRuleDesc<
  TMatch extends TypeMapMatcher,
  TTransform extends TypeMapTransformer
> = Join<[
  TMatch[0] extends keyof typeof TYPE_MATCHER_DESC
    ? Capitalize<StripTrailing<typeof TYPE_MATCHER_DESC[TMatch[0]], ".">>
    : "Unknown matcher!",
  TTransform[0] extends keyof typeof TYPE_TRANSFORMER_DESC
    ? Lowercase<typeof TYPE_TRANSFORMER_DESC[TTransform[0]]>
    : "unknown transformer!",
], " and ">;

/**
 * **TypeMapRule**`<TMatch,TTransform,TDesc>`
 * 
 * A type which defines how to transform a _matched_ type into a variant.
 */
export interface TypeMapRule<
  TMatch extends TypeMapMatcher,
  TTransform extends TypeMapTransformer,
  TDesc extends TypeRuleDesc<TMatch,TTransform>
> {
  match: TMatch;
  transform: TTransform;
  desc: TDesc;
}

/**
 * **ConfiguredTypeMapper**`<R>`
 * 
 * Represents a _mapper_ function which now expects to receive an array of tokens
 * to be converted based on the already applied rules (`MapRule`).
 * 
 * Note: this is return type from the `mapType()` runtime utility.
 */
export type ConfiguredTypeMapper<
  R extends readonly TypeMapRule<any, any, TypeRuleDesc<any,any>>[]
> = <T extends readonly Narrowable[]>(...tokens: T) => MapType<T,R>;


/**
 * facilitates deriving the "value" for map rules
 */
export type MappedValue<
  TValue extends Narrowable, 
  M extends TypeMapRule<TypeMapMatcher, TypeMapTransformer, any> 
> = M["transform"][0] extends "Identity"
  ? TValue
  : M["transform"][0] extends "AsString"
  ? `${string}`
  : M["transform"][0] extends "AsNumericString"
  ? `${number}`
  : M["transform"][0] extends "AsBooleanString"
  ? `${false | true}`
  : M["transform"][0] extends "AsString"
  ? `${string}`
  : M["transform"][0] extends "ToString"
  ? ToString<TValue>
  : M["transform"][0] extends "ToTrue"
  ? true
  : M["transform"][0] extends "ToFalse"
  ? false
  : M["transform"][0] extends "Capitalized"
  ? Capitalize<`${string}`>
  : M["transform"][0] extends "PascalCase"
  ? PascalCase<`${string}`>
  : M["transform"][0] extends "CamelCase"
  ? CamelCase<`${string}`>
  : M["transform"][0] extends "KebabCase"
  ? KebabCase<`${string}`>

  : M["transform"][0] extends "As"
  ? M["transform"][1] extends TypeTuple<infer TT,any> ? TT : never
  : M["transform"][0] extends "StripLeading"
  ? StripLeading<TValue, M["transform"][1]>
  : M["transform"][0] extends "StripTrailing"
  ? StripTrailing<TValue, M["transform"][1]>
  : M["transform"][0] extends "NumericLiteral"
  ? IfNumericLiteral<
      M["transform"][1], 
      M["transform"][1], 
      ["error", "invalid-numeric-literal"]
    >
  : M["transform"][0] extends "StringLiteral"
    ? IfStringLiteral<
        M["transform"][1], 
        M["transform"][1], 
        ["error", "invalid-string-literal"]
      >
  : unknown;


/**
 * **Convert**`<TValue,TMatchers,TElse>`
 * 
 * Type utility which converts the type of a single value by comparing the value
 * to an array of matcher rules. The first matcher which matches will convert the type
 * but if no matchers match then the `TElse` generic determines the type.
 * 
 * A matcher is a tuple which extends `Matcher`:
 * ```ts
 * type Matcher = []
 * ```
 * 
 * **Related:** `MapType<T,M,E>`
 */
export type ConvertType<
  TValue extends Narrowable, 
  TMatchers extends readonly TypeMapRule<TypeMapMatcher, TypeMapTransformer, any>[],
  TElse extends Narrowable = never
> = FirstOrElse<{
  [K in keyof TMatchers]: //
    IfEqual<TMatchers[K]["match"][0], "Equals",
      IfEqual<TValue, TMatchers[K]["match"][1], MappedValue<TValue,TMatchers[K]>, never>,
    IfEqual<TMatchers[K]["match"][0], "Extends",
      IfExtends<TValue, TMatchers[K]["match"][1], MappedValue<TValue,TMatchers[K]>, never>,
    IfEqual<TMatchers[K]["match"][0], "StartsWith",
      IfStartsWith<TValue, TMatchers[K]["match"][1], MappedValue<TValue,TMatchers[K]>, never>,
    IfEqual<TMatchers[K]["match"][0], "EndsWith",
      IfEndsWith<TValue, TMatchers[K]["match"][1], MappedValue<TValue,TMatchers[K]>, never>,
    never
  >>>>
}, TElse>;

type MapAcc<
  TList extends readonly Narrowable[], 
  TMatchers extends readonly TypeMapRule<any,any,any>[],
  TElse extends Narrowable = never,
  TResults extends readonly any[] = []
> = TList extends readonly [infer First, ...infer Rest]
    ? MapAcc<
        Rest, // next
        TMatchers, // static
        TElse, // static
        [...TResults, ConvertType<First, TMatchers, TElse>]
      >
    : TResults;

/**
 * **Map**`<TList,TMatchers,TElse>`
 * 
 * A type utility which maps over the list `TList` and looks for 
 * a _match_ on any passed matchers (`TMatchers`). The first match
 * which is found will dictate the type which is returned, however,
 * if _no_ matches are found then `TElse` is used (though by default
 * it is set as _never_ and effectively provides a filtering feature)
 * ```ts
 * type T = Map<
 *    ["foo", "bar", "baz"],
 *    [
 *      []
 *   ]
 * ```
 */
export type MapType<
  TList extends readonly any[], 
  TMatchers extends readonly TypeMapRule<any,any,any>[] | TypeMapRule<any,any,any>[],
  TElse extends Narrowable = never
> = RemoveNever<MapAcc<TList, TMatchers, TElse>>;




