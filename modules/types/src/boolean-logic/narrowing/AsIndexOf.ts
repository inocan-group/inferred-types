import type { Constant } from "inferred-types/constants";
import type { AsString, Dictionary, IfEqual, Throw, Tuple } from "inferred-types/types";

/**
 * **AsIndexOf**`<T,K,[ERR]>`
 *
 * Validates that `K` is a keyof `T` and
 */
export type AsIndexOf<
    T extends Dictionary | object | Tuple,
    K extends PropertyKey,
    ERR = Constant<"NoErr">,
> = K extends keyof T
    ? T[K]
    : IfEqual<
        ERR,
        Constant<"NoErr">,
        Throw<
            "invalid-key",
      `the key '${AsString<K>}' is not a valid key of the passed container`,
      "AsIndexOf"
        >,
        ERR
    >;
