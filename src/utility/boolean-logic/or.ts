import { LogicFunction } from "src/types/functions";

/**
 * Groups a number of "logic functions" together by combining their results using
 * the logical **OR** operator.
 *
 * **Note:** a "logic function" is any function which returns a boolean
 */
export const or = <T extends any[]>(...ops: LogicFunction<T>[]): LogicFunction<T> => {
  const fn: LogicFunction<T> = (...args: T) => {
    return [...ops].some((i) => i(...args));
  };

  return fn;
};
