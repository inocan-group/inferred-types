import { Constant } from "inferred-types/dist/constants/index";
import { IfEqual, Dictionary, Throw, Tuple, AsString } from "src/types/index";

/**
 * **AsIndexOf**`<T,K,[ERR]>`
 *
 * Validates that `K` is a keyof `T` and
 */
export type AsIndexOf<
  T extends Dictionary | object | Tuple,
  K extends PropertyKey,
  ERR = Constant<"NoErr">
> = K extends keyof T
? T[K]
: IfEqual<
    ERR, Constant<"NoErr">,
    Throw<
      "invalid-key",
      `the key '${AsString<K>}' is not a valid key of the passed container`,
      "AsIndexOf"
    >,
    ERR
  >;

