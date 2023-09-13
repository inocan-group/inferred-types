import type { 
  RemoveNever,
  Narrowable,
  Matcher,
  Transform,
  IfMatchAll
} from "../base";

/**
 * **ConfiguredTypeMapper**`<R>`
 * 
 * Represents a _mapper_ function which now expects to receive an array of tokens
 * to be converted based on the already applied rules (`MapRule`).
 * 
 * Note: this is return type from the `mapType()` runtime utility.
 */
export type ConfiguredTypeMapper<
  R extends readonly Matcher[]
// eslint-disable-next-line no-use-before-define
> = <T extends readonly Narrowable[]>(...tokens: T) => MapType<T,R>;

type MapAcc<
  TList extends readonly unknown[], 
  TConditions extends readonly Matcher[],
  TElse extends Narrowable = never,
  TResults extends readonly unknown[] = []
> = TList extends readonly [infer First, ...infer Rest]
    ? MapAcc<
        Rest,
        TConditions,
        TElse,
        [
          ...TResults,
          IfMatchAll<
            First, TConditions,
            Transform<First, []>,
            TElse
          >
        ]
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
  TList extends readonly unknown[],
  TConditions extends readonly Matcher[],
  TElse extends Narrowable = never
> = RemoveNever<MapAcc<TList, TConditions, TElse>>;
