import { 
  TypeMapMatcher,
  TypeRuleDesc, 
  TypeTransformOp 
} from "src/types";


/**
 * **TypeMapRule**`<TMatch,TTransform,TDesc>`
 * 
 * A type which defines how to transform a _matched_ type into a variant.
 */
export interface TypeMapRule<
  TMatch extends TypeMapMatcher = TypeMapMatcher,
  TTransform extends TypeTransformOp = TypeTransformOp,
  TDesc extends string = TypeRuleDesc<TMatch,TTransform>
> {
  match: TMatch;
  transform: TTransform;
  desc: TDesc;
}
