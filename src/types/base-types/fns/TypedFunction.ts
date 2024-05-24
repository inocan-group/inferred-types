/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * **TypedFunction**
 * 
 * A function which has basic typing information.
 * 
 * **Related:** `AnyFunction`
 */
export type TypedFunction<R = any> = ((...args: any[]) => R);
