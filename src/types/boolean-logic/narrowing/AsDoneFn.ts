import { Fn } from "src/types/functions/Fn";



/**
 * **AsDoneFn**`<T>`
 * 
 * Narrows 
 */
export type AsDoneFn<T> = T extends { done: Fn }
  ? T & { done: () => unknown }
  : never;
