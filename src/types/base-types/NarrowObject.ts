import type { Narrowable, ObjectKey } from "inferred-types/dist/types/index";

/**
 * **NarrowObject**`<N>`
 *
 * Defines a `Record` type who's values extends `Narrowable`. This type is most
 * commonly used in runtime settings where a function wants to _extend_ this
 * type to ensure that the received values are as narrow as could be available
 * from the input source.
 */
export type NarrowObject<N extends Narrowable> = Record<ObjectKey, N>;
