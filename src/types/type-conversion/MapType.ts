import { IfEndsWith, IfEquals, IfExtends, IfStartsWith, IfUndefined } from "../boolean-logic";
import { AnyFunction } from "../functions/function-types";
import { ExcludeNever } from "../lists";
import { FirstOrElse } from "../lists/First";
import { Narrowable } from "../Narrowable";

export type MatcherLogic = "extends" | "equals" | "not-equal" | "startsWith" | "endsWith";
export type MatcherType = string | number | boolean;
export type MatcherTransform = <V extends string | number | boolean>(v: V) => any;

export type Matcher<
  TLogic extends MatcherLogic = MatcherLogic,
  TType extends MatcherType = MatcherType,
  TTransform extends MatcherTransform | undefined = MatcherTransform | undefined
> = [
  logic: TLogic, 
  type: TType, 
  transform: TTransform
] | [
  logic: TLogic, 
  type: TType
];


type MatchValue<
  T extends Narrowable, M extends Matcher
> = IfUndefined<
  M[2],
  T,
  M[2] extends AnyFunction
    ? ReturnType<M[2]>
    : never
>;

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
  TMatchers extends readonly Matcher[],
  TElse extends Narrowable = never
> = FirstOrElse<ExcludeNever<{
  [K in keyof TMatchers]: //
    IfEquals<TMatchers[K][0], "equals",
      IfEquals<TValue, TMatchers[K][1], MatchValue<TValue,TMatchers[K]>, never>,
      IfEquals<TMatchers[K][0], "extends",
        IfExtends<TValue, TMatchers[K][1], MatchValue<TValue,TMatchers[K]>, never>,
        IfEquals<TMatchers[K][0], "startsWith",
          IfStartsWith<TValue, TMatchers[K][1], MatchValue<TValue,TMatchers[K]>, never>,
          IfEquals<TMatchers[K][0], "endsWith",
            IfEndsWith<TValue, TMatchers[K][1], MatchValue<TValue,TMatchers[K]>, never>,
            never
          >
        >
      >
    >
}>, TElse>;

type MapAcc<
  TList extends readonly Narrowable[], 
  TMatchers extends readonly Matcher[],
  TElse extends Narrowable = never,
  TResults extends readonly any[] = []
> = TList extends [infer First, ...infer Rest]
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
  TMatchers extends readonly Matcher[],
  TElse extends Narrowable = never
> = ExcludeNever<MapAcc<TList, TMatchers, TElse>>;




