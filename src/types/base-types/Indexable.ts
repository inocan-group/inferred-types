/* eslint-disable @typescript-eslint/no-explicit-any */
import { IndexableObject } from "src/types/index";

/**
 * **Indexable**
 * 
 * A type which can be _indexed_. This means either an array of
 * some sort, an indexable object, a `Map`, or a `WeakMap`.
 */
export type Indexable = IndexableObject | unknown[] | readonly unknown[] | WeakMap<any, any> | Map<any,any>;
