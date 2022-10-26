/**
 * A function which returns a boolean value
 */
export type LogicFunction<T extends any[]> = (...args: T) => boolean;
