import { IndexableObject } from "./IndexableObject";

/**
 * **Indexable**
 * 
 * A type which can be _indexed_. This means either an array of
 * some sort or an indexable object.
 */
export type Indexable = IndexableObject | unknown[] | readonly unknown[];
