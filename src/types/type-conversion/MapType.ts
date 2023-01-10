import { CamelCase, KebabCase, PascalCase, StripLeading, StripTrailing } from "../alphabetic";
import {  IfEndsWith, IfEquals, IfExtends, IfNumericLiteral, IfOr, IfStartsWith, IsEqual } from "../boolean-logic";
import { ExcludeNever, FirstOrElse } from "../lists";
import { Narrowable } from "../Narrowable";
import { ToString } from "./ToString";

/**
 * **TypeMapMatcher**
 * 
 * Represents the _method_ you will use to match a type.
 */
export type TypeMapMatcher = "extends" 
  | "equals" 
  | "not-equal" 
  | "startsWith" 
  | "endsWith" 
  | "truthy" 
  | "any";

/**
 * The types of transformation you want to apply to matched tokens
 */
export type TypeMapTransform = "identity" | "Capitalized" | "PascalCase" | "CamelCase" | "KebabCase" | ["StripLeading", string] | ["StripTrailing", string] | "ToString" | "AsString" | "AsBooleanString" | "AsNumericString" | ["As", any] | "Never" | ["NumericLiteral", number] | "ToTrue" | "ToFalse";

/**
 * **TypeMapRule**`<TMatch,TTarget,TTransform>`
 * 
 * A type which defines how to transform a _matched_ type into a variant.
 */
export interface TypeMapRule<
  TMatch extends TypeMapMatcher,
  TTarget extends IfOr<
    [ IsEqual<TMatch, "startsWith">, IsEqual<TMatch, "endsWith"> ],
    string | number,
    Narrowable
  >,
  TTransform extends TypeMapTransform,
> {
  match: TMatch;
  target: TTarget;
  transform: TTransform;
};

/**
 * **ConfiguredTypeMapper**`<R>`
 * 
 * Represents a _mapper_ function which now expects to receive an array of tokens
 * to be converted based on the already applied rules (`MapRule`).
 * 
 * Note: this is return type from the `mapType()` runtime utility.
 */
export type ConfiguredTypeMapper<
  R extends readonly TypeMapRule<any, any, any>[]
> = <T extends readonly Narrowable[]>(...tokens: T) => MapType<T,R>;



/**
 * facilitates deriving the "value" for map rules
 */
export type MappedValue<
  TValue extends Narrowable, 
  M extends TypeMapRule<any, any, any> 
> = M["transform"] extends "identity"
  ? TValue
  : M["transform"] extends "AsString"
  ? `${string}`
  : M["transform"] extends "AsNumericString"
  ? `${number}`
  : M["transform"] extends "AsBooleanString"
  ? `${false | true}`
  : M["transform"] extends "AsString"
  ? `${string}`
  : M["transform"] extends "ToString"
  ? ToString<TValue>
  : M["transform"] extends "ToTrue"
  ? true
  : M["transform"] extends "ToFalse"
  ? false
  : M["transform"] extends "Capitalized"
  ? Capitalize<`${string}`>
  : M["transform"] extends "PascalCase"
  ? PascalCase<`${string}`>
  : M["transform"] extends "CamelCase"
  ? CamelCase<`${string}`>
  : M["transform"] extends "KebabCase"
  ? KebabCase<`${string}`>

  : M["transform"] extends [infer Command, infer Param]
    ? Command extends "As"
    ? Param
    : Command extends "StripLeading"
    ? StripLeading<TValue, Param>
    : Command extends "StripTrailing"
    ? StripTrailing<TValue, Param>
    : Command extends "NumericLiteral"
    ? IfNumericLiteral<Param, Param, ["error", "invalid-numeric-literal"]>
    : unknown
    : never;


/**
 * **Convert**`<TValue,TMatchers,TElse>`
 * 
 * Type utility which converts the type of a single value by comparing the value
 * to an array of matchers. The first matcher which matches will convert the type
 * but if no matchers match then the `TElse` generic determines the type.
 * 
 * A matcher is a tuple which extends `Matcher`:
 * ```ts
 * type Matcher = []
 * ```
 * 
 * **Related:** `Map<T,M,E>`
 */
export type ConvertType<
  TValue extends Narrowable, 
  TMatchers extends readonly TypeMapRule<any, any, any>[],
  TElse extends Narrowable = never
> = FirstOrElse<ExcludeNever<{
  [K in keyof TMatchers]: //
    IfEquals<TMatchers[K]["match"], "equals",
      IfEquals<TValue, TMatchers[K]["target"], MappedValue<TValue,TMatchers[K]>, never>,
    IfEquals<TMatchers[K]["match"], "extends",
      IfExtends<TValue, TMatchers[K]["target"], MappedValue<TValue,TMatchers[K]>, never>,
    IfEquals<TMatchers[K]["match"], "startsWith",
      IfStartsWith<TValue, TMatchers[K]["target"], MappedValue<TValue,TMatchers[K]>, never>,
    IfEquals<TMatchers[K]["match"], "endsWith",
      IfEndsWith<TValue, TMatchers[K]["target"], MappedValue<TValue,TMatchers[K]>, never>,
    never
    >>>>
}>, TElse>;

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
 *    ]
 * ```
 */
export type MapType<
  TList extends readonly any[], 
  TMatchers extends readonly TypeMapRule<any,any,any>[] | TypeMapRule<any,any,any>[],
  TElse extends Narrowable = never
> = ExcludeNever<MapAcc<TList, TMatchers, TElse>>;




