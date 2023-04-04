import type { 
  StripTrailing,
  RemoveNever,
  Narrowable,
  Join,
  ConvertType
} from "src/types";

import { TYPE_MATCHER_DESC, TYPE_TRANSFORMER_DESC } from "src/runtime";
import { TypeMapMatcher } from "./convert-and-map-support/TypeMapMatcher";
import { TypeMapTransformer } from "./convert-and-map-support/TypeMapTransformer";
import { TypeMapRule } from "./TypeMapRule";


/**
 * **TypeRuleDesc**
 * 
 * Type utility which builds a description from the matcher and transformer.
 */
export type TypeRuleDesc<
  TMatch extends TypeMapMatcher = TypeMapMatcher,
  TTransform extends TypeMapTransformer = TypeMapTransformer
> = Join<[
  TMatch[0] extends keyof typeof TYPE_MATCHER_DESC
    ? Capitalize<StripTrailing<typeof TYPE_MATCHER_DESC[TMatch[0]], ".">>
    : "Unknown matcher!",
  TTransform[0] extends keyof typeof TYPE_TRANSFORMER_DESC
    ? Lowercase<typeof TYPE_TRANSFORMER_DESC[TTransform[0]]>
    : "unknown transformer!",
], " and ">;

/**
 * **ConfiguredTypeMapper**`<R>`
 * 
 * Represents a _mapper_ function which now expects to receive an array of tokens
 * to be converted based on the already applied rules (`MapRule`).
 * 
 * Note: this is return type from the `mapType()` runtime utility.
 */
export type ConfiguredTypeMapper<
  R extends readonly TypeMapRule[]
// eslint-disable-next-line no-use-before-define
> = <T extends readonly Narrowable[]>(...tokens: T) => MapType<T,R>;

type MapAcc<
  TList extends readonly unknown[], 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TMatchers extends readonly TypeMapRule[],
  TElse extends Narrowable = never,
  TResults extends readonly unknown[] = []
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
  TList extends readonly unknown[], 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TMatchers extends readonly TypeMapRule[],
  TElse extends Narrowable = never
> = RemoveNever<MapAcc<TList, TMatchers, TElse>>;
