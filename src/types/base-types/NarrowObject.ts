import type { Narrowable, ObjectKey } from "src/types/index";

/**
 * **NarrowObject**`<N>`
 */
export type NarrowObject<N extends Narrowable> = Record<ObjectKey, N>;
