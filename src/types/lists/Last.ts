/* eslint-disable @typescript-eslint/no-explicit-any */


/**
 * **Last**`<T>`
 * 
 * Returns the _last_ element in a list
 */
export type Last<T extends readonly any[]> = T extends [...any[], infer Last]
  ? Last
  : never;
