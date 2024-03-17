import {KV, ObjectKey } from "src/types/index";

/**
 * **Container**`<V=unknown>`
 * 
 * A type which represents any `KV<ObjectKey,V>` or tuple of `readonly V[]`.
 */
export type Container<V = unknown> = KV<ObjectKey, V> | readonly V[];
