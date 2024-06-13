import { FnWithDescription } from "src/types/index";



/**
 * **AsDoneFn**`<T>`
 *
 * Narrows
 */
export type AsDoneFn<T> = T extends { done: FnWithDescription }
  ? T & { done: () => unknown }
  : never;
