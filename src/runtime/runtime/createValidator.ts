import { Type } from "src/types/runtime-types/Type";

/**
 * Creates a `validate` function for a runtime type
 */
export function createValidator<T extends Type>(defn: T): T {
  const fn = (val: unknown): val is T["type"] => {
    // the first _validation_ is that it passes the type guard test
    if(defn.is(val)) {
      return defn.validations && defn.validations.length > 0
        ? defn.validations.every(v => v(val))
        : true;
    } else {
      return false;
    }
  };

  return {
    ...defn,
    validate: fn
  };
}
