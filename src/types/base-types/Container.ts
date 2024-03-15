import {ObjectKey, Tuple } from "src/types/index";

/**
 * **Container**
 * 
 * A type which represents any object or array.
 */
export type Container = Record<ObjectKey, unknown> | Tuple;
