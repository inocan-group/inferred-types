import { createConstant } from "inferred-types/dist/constants/index";

export const MARKED = createConstant("Marked");

/**
 * **Marked**
 *
 * A constant that indicates that an item has been marked for
 * some ongoing operation.
 */
export type Marked = typeof MARKED;
