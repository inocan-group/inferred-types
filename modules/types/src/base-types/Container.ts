import type { Dictionary, Narrowable, ObjectKey } from "inferred-types/types";

/**
 * **Container**
 *
 * A type which represents any container type including:
 *
 *  - any object based type defined with Record<K,V>
 *  - any array or tuple
 *  - any `Map<K,V>`, `WeakMap<K,V>`, or `Set<T>`
 */
export type Container =
    | Dictionary
    | readonly unknown[];

/**
 * **NarrowContainer**`<N>`
 *
 * Produces a type which has maximal runtime inference capabilility
 * of either a Tuple or Dictionary container type.
 */
export type NarrowContainer<N extends Narrowable> =
| Dictionary<ObjectKey,N>
| readonly N[];
