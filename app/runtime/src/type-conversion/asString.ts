import { AsString } from "@inferred-types/types";
import { isArray, isBoolean, isNumber, isString} from "src/runtime/index"

/**
 * **asString**`(value)
 *
 * Attempts to convert the value passed in into a string
 * using the same methods available to the type utility
 * `AsString<T>`.
 *
 * If unable to convert to a string then it will provide
 * the runtime value of `String(value)` but the type system
 * will be set to `never`.
 *
 * - if an array is passed in then it will be joined
 * together -- no delimiter characters -- into a string
 * - if a tuple of `SimpleToken[]` is discovered it will
 * set the runtime type to a token of `<<string::...>>` while the
 * type of the string will be
 */
export const asString = <T>(value: T): AsString<T> => {
  return (
    isString(value)
      ? value
      : isNumber(value)
      ? `${value}`
      : isBoolean(value)
      ? `${value}`
      : isArray(value)
      ? value.join("")
      : String(value)
  ) as unknown as AsString<T>;
}


