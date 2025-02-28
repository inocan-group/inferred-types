/**
 * **IsNever**`<T>`
 *
 * Boolean type utility which check whether `T` is of type _never_.
 */
export type IsNever<T> = [T] extends [never]
    ? true
    : false;
