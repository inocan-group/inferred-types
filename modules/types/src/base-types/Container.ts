import type { Dictionary, Narrowable, ObjectKey } from "inferred-types/types";

/**
 * **Container**
 *
 * A type which represents common container types including:
 *
 *  - any object-based dictionary type (Record<K,V>)
 *  - any array or tuple
 *  - any `Map<K,V>`, `WeakMap<K,V>`, or `Set<T>`
 *
 * Note: functions are intentionally excluded to avoid excessive type
 * comparisons when treating functions as containers.
 */
export type Container
    = | readonly unknown[]
    | Dictionary
    | Map<any, any>
    | WeakMap<any, any>
    | Set<any>;

/**
 * **NarrowContainer**`<N>`
 *
 * Produces a type which has maximal runtime inference capabilility
 * of either a Tuple or Dictionary container type.
 */
export type NarrowContainer<N extends Narrowable>
    = | Dictionary<ObjectKey, N>
| readonly N[];
