import { Constant } from "src/constants";
import { Concat, Container, ErrorCondition, IfEqual, ToString } from "src/types";

/**
 * **AsIndexOf**`<T,K,[ERR]>`
 * 
 * Validates that `K` is a keyof `T` and 
 */
export type AsIndexOf<
  T extends Container, 
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

