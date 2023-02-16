/**
 * **LogicFunction**
 * 
 * A function -- with _optional_ parameters -- which returns a boolean value.
 */
export type LogicFunction<TParams extends readonly unknown[] = unknown[]> = (...args: TParams) => boolean;

