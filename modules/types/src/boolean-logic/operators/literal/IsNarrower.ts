/**
 * **IsNarrower**`<T,TWide>`
 *
 * tests whether `T` forms a _proper_ subtype of `TWide`?
 */
export type IsNarrower<T, TWide>
    = [T] extends [TWide] ? ([TWide] extends [T] ? false : true) : false;
