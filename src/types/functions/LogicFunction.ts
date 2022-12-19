
/**
 * A function -- without parameters -- which returns a boolean value
 */
export type LogicFunctionWithoutParams = <R extends boolean>() => R;

/**
 * **LogicFunction**
 * 
 * A function -- with _optional_ parameters -- which returns a boolean value.
 */
export type LogicFunction<TParams extends readonly any[]> = (...args: TParams) => boolean;

