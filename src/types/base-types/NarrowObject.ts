import type { Narrowable, ObjectKey } from "..";

/**
 * **NarrowObject**`<N>`
 */
export type NarrowObject<N extends Narrowable> = Record<ObjectKey, N>;
