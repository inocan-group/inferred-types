import { Dictionary } from "src/types/index";

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
| readonly unknown[] 
| Map<unknown,unknown> 
| WeakMap<object,unknown>
| Set<unknown>
| object;

