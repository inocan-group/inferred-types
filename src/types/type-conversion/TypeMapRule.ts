import { TypeMapMatcher } from "./convert-and-map-support/TypeMapMatcher";
import { TypeMapTransformer } from "./convert-and-map-support/TypeMapTransformer";
import { TypeRuleDesc } from "./MapType";

/**
 * **TypeMapRule**`<TMatch,TTransform,TDesc>`
 * 
 * A type which defines how to transform a _matched_ type into a variant.
 */
export interface TypeMapRule<
  TMatch extends TypeMapMatcher = TypeMapMatcher,
  TTransform extends TypeMapTransformer = TypeMapTransformer,
  TDesc extends string = TypeRuleDesc<TMatch,TTransform>
> {
  match: TMatch;
  transform: TTransform;
  desc: TDesc;
}
