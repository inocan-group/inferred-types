import { TypeGuard } from "~/types";
import { RuntimeType } from "../../../types/runtime";

/**
 * Creates a run-time type that is conveyed to Typescript as well
 */
export const type =
  <T extends any>() =>
  <N extends string, O extends object>(
    name: N,
    validate: TypeGuard<T>,
    _options: O
  ): RuntimeType<T> => {
    return {
      __kind: "type",

      type: name as unknown as T,
      is: validate,
    };
  };
