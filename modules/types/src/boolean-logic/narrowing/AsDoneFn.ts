import type { FnWithDescription } from "inferred-types/types";

/**
 * **AsDoneFn**`<T>`
 *
 * Narrows
 */
export type AsDoneFn<T> = T extends { done: FnWithDescription }
    ? T & { done: () => unknown }
    : never;
