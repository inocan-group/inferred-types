/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * **LogicFunction**
 * 
 * A function -- with _optional_ parameters -- which returns a boolean value.
 */
export type LogicFunction<
  TReturns extends boolean = boolean
> = (...args: any[]) => TReturns;


