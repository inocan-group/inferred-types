/**
 * A function which returns a boolean value
 */
export type LogicFunction<T extends readonly any[]> = (...args: T) => boolean;
