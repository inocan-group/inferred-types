import { Tuple } from "../base-types";
import { If, IsEqual } from "../boolean-logic";
import { NumberLike } from "../numeric-literals";
import { EnsureLeading, EnsureTrailing } from "../string-literals";
import { AsNumber } from "./AsNumber";
import { AsString } from "./AsString";


/**
 * **JsonValue**`<T>`
 *
 * Converts a string value to the appropriate JSON type
 *
 * **Related:** `JsonValues`
 */
export type JsonValue<T> = T extends NumberLike
? AsNumber<T>
: If<
    IsEqual<T, "true">,
    true,
    If<
      IsEqual<T, "false">,
      false,
      EnsureLeading<AsString<T>, "\""> extends string
        ? EnsureTrailing<EnsureLeading<AsString<T>, "\"">, "\"">
        : never
    >
  >

/**
 * **JsonValues**`<T>`
 *
 * Converts a tuple of values to the appropriate JSON type
 *
 * **Related:** `JsonValue`
 */
export type JsonValues<T extends Tuple> = {
  [K in keyof T]: JsonValue<T[K]>
}

