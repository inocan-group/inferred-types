import type { ObjectKey } from "src/base-types/ObjectKey";
import type { Narrowable } from "src/literals";

/**
 * **TypedFunction**`<[P],[R]>`
 *
 * A function which has basic typing information.
 *
 * **Related:** `AnyFunction`
 */
export type TypedFunction<
    P extends readonly any[] = readonly any[],
    R = any
> = ((...args: P) => R);

export type TypedFunctionWithDictionary<
    P extends readonly any[] = readonly any[],
    R = any,
    D extends Record<ObjectKey, Narrowable> = Record<ObjectKey, Narrowable>
> = ((...args: P) => R) & D;
