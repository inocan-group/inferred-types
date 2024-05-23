import { AsString } from "src/types/index";
import { isBoolean, isNumber, isString} from "src/runtime/index"

/**
 * **asString**`(value)
 * 
 * Attempts to convert the value passed in into a string
 * using the same methods available to the type utility 
 * `AsString<T>`.
 * 
 * If unable to convert to a string then it will provide
 * the runtime value of `String(value)` but the type system
 * will be set to `never`
 */
export const asString = <T>(value: T): AsString<T> => {
  return (
    isString(value)
      ? value
      : isNumber(value)
      ? `${value}`
      : isBoolean(value)
      ? `${value}`
      : String(value)
  ) as unknown as AsString<T>;
}


