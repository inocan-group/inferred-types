import { Narrowable } from "../../types/Narrowable";
import { TypeMapRule, MapType, ConfiguredTypeMapper, TypeMapMatcher, TypeMapTransformer } from "../../types/type-conversion/MapType";

function convert<
  T extends Narrowable, 
  R extends readonly TypeMapRule<any, any, any>[]
>(token: T, rules: R) {
  // 
}


/**
 * **mapType**(rules)
 * 
 * A runtime utility which receives a set of mapping rules and the waits for
 * a stream of "tokens" to be converted using those rules.
 */
export function mapType<
  R extends readonly TypeMapRule<TypeMapMatcher, TypeMapTransformer, any>[], 
>(...rules: R): ConfiguredTypeMapper<R> {
  return <
    T extends readonly Narrowable[]
  >(...tokens: T) => {
    return tokens.reduce(
      (acc, token) => {
        return [...acc, convert(token, rules)];
      },
      [] as Narrowable[]
    ) as unknown as MapType<T, R>;
  };
}
