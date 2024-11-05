import { IsNever } from "inferred-types/dist/types/index";

/**
 * **IsAny**`<T>`
 *
 * Tests whether a given `T` is of the **any** type.
 */
export type IsAny<T> = IsNever<T> extends true
? false
: 1 extends T & 0 ? true : false;
