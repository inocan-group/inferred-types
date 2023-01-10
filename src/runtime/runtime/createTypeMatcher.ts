import { IfOr, IsEqual, Narrowable } from "src/types";
import {  TypeMapMatcher, TypeMapRule, TypeMapTransform } from "src/types/type-conversion/MapType";

/**
 * **createTypeMapper**
 * 
 * Runtime helper to create a type-strong "type mapper".
 * ```ts
 * const m = createTypeMapper("equals", "<boolean>", "AsBooleanString");
 * ```
 */
export function createTypeMapper<
  TMatch extends TypeMapMatcher,
  TTarget extends IfOr<
    [ IsEqual<TMatch, "startsWith">, IsEqual<TMatch, "endsWith"> ],
    string | number,
    Narrowable
  >,
  TTransform extends TypeMapTransform,
>(
  match: TMatch, 
  target: TTarget, 
  transform: TTransform
) {
  return (
    { match, target, transform }
  ) as TypeMapRule<TMatch, TTarget, TTransform>;
}
