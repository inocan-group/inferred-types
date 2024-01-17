import { IfNever } from "src/types/index";

/**
 * **IsAny**`<T>`
 * 
 * Tests whether a given `T` is of the **any** type.
 */
export type IsAny<T> = IfNever<T, false, 1 extends T & 0 ? true : false>;
