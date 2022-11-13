import { LogicFunction } from "src/types/functions";

/**
 * Groups a number of "logic functions" together by combining their results using
 * the logical **AND** operator.
 *
 * **Note:** a "logic function" is any function which returns a boolean
 */
export const and = <T extends any[]>(...ops: readonly LogicFunction<T>[]): LogicFunction<T> => {
  const fn: LogicFunction<T> = (...args: T) => {
    return [...ops].every((i) => i(...args));
  };

  return fn;
};
