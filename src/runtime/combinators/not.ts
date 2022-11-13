import { LogicFunction } from "src/types/functions";

/**
 * Groups a number of "logic functions" together by combining their results using
 * the logical **NOT** operator.
 *
 * **Note:** a "logic function" is any function which returns a boolean
 */
export const not = <T extends any[]>(op: LogicFunction<T>): LogicFunction<T> => {
  const fn: LogicFunction<T> = (...args: T) => {
    return !op(...args);
  };

  return fn;
};
