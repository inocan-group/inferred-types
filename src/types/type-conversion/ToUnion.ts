/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * **ToUnion**`<T>`
 * 
 * Converts `T` -- which must be an array of something -- to 
 * a Union type.
 * 
 * **Related:** `TupleToUnion`
 */
export type ToUnion<T extends any[]> = T[number];
