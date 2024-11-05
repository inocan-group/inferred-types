import { FnWithDescription } from "inferred-types/dist/types/index";



/**
 * **AsDoneFn**`<T>`
 *
 * Narrows
 */
export type AsDoneFn<T> = T extends { done: FnWithDescription }
  ? T & { done: () => unknown }
  : never;
