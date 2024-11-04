import { Dictionary } from "src/types/index";


/**
 * **NonArray**
 * 
 * A base type which represents any value _other_ than an array or tuple.
 */
export type NonArray = string | number | boolean | null | undefined | symbol | Dictionary |Map<unknown,unknown> | Set<unknown> | WeakMap<object, unknown>;

