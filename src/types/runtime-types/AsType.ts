import { If, IsUnion } from "../boolean-logic";
import { SimpleType } from "./SimpleType";
import { SimpleToken, TypeToken } from "./TypeToken";

/**
 * **AsType**`<T>`
 *
 * converts either a `SimpleToken` or a `TypeToken` into the
 * _type_ it represents.
 *
 * NOTE: only implemented for `SimpleToken` at the moment.
 */
export type AsType<T extends SimpleToken | TypeToken> =  T extends SimpleToken
  ? SimpleType<T>
  : never;

