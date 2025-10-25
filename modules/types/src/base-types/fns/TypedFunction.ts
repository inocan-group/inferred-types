import type { ObjectKey } from "types/base-types";
import type { Narrowable } from "types/literals";

/**
 * **TypedFunction**`<[P],[R]>`
 *
 * A function which has basic typing information.
 *
 * **Related:** `TypedFunctionWithDictionary>`
 */
export type TypedFunction<
    P extends readonly any[] = readonly any[],
    R = any
> = ((...args: P) => R);

export type TypedFunctionWithDictionary<
    P extends readonly any[] = readonly any[],
    R = unknown,
    D extends Record<ObjectKey, Narrowable> = Record<ObjectKey, Narrowable>
> = ((...args: P) => R) & D;
