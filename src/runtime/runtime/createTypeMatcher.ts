import {  TypeMapMatcher, TypeMapRule, TypeMapTransformer, TypeRuleDesc } from "types/type-conversion/MapType";
import { capitalize, ensureTrailing, stripTrailing, uncapitalize } from "../literals";
import { TYPE_MATCHER_DESC, TYPE_TRANSFORMER_DESC } from "./constants";

/**
 * **createTypeMapper**
 * 
 * Runtime helper to create a type-strong rule for type mapping. Consists of
 * 
 * - **Matcher** - a tuple that describes which types this rule should match on
 * - **Transformer** - a tuple that describes how the incoming type should be
 * mutated/converted.
 * 
 * ```ts
 * const m = createTypeMapper(
 *  ["Equals", "<boolean>"], 
 *  ["AsBooleanString"]
 * );
 * ```
 */
export function createTypeMapRule<
  TMatch extends TypeMapMatcher,
  TTransform extends TypeMapTransformer,
  TDesc extends TypeRuleDesc<TMatch,TTransform>
>(
  match: TMatch,
  transform: TTransform
) {
  return (
    { 
      match, 
      transform,
      desc: [
        capitalize(stripTrailing(TYPE_MATCHER_DESC[match[0]], ".")),
        ensureTrailing(uncapitalize(TYPE_TRANSFORMER_DESC[transform[0]]), ".")
      ].join(" and ") as TypeRuleDesc<TMatch,TTransform>
    }
  ) as TypeMapRule<TMatch, TTransform, TDesc>;
}

