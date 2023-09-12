import type { Narrowable, ObjectKey } from "src/types";

/**
 * **NarrowObject**`<N>`
 */
export type NarrowObject<N extends Narrowable> = Record<ObjectKey, N>;
