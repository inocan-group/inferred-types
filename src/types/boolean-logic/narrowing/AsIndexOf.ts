import { Constant } from "src/constants/index";
import { Concat, ErrorCondition, IfEqual, KV, ToString, Tuple } from "src/types/index";

/**
 * **AsIndexOf**`<T,K,[ERR]>`
 * 
 * Validates that `K` is a keyof `T` and 
 */
export type AsIndexOf<
  T extends KV | object | Tuple, 
  K extends PropertyKey, 
  ERR = Constant<"NoErr">
> = K extends keyof T
? T[K]
: IfEqual<
    ERR, Constant<"NoErr">,
    ErrorCondition<
      "invalid-key",
      Concat<[
        "the key '",
        ToString<K>,
        "' is not a valid key of the passed container"
      ]>
    >,
    ERR
  >;

