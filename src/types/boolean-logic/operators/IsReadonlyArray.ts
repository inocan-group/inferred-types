
/**
 * **IsReadonlyArray**`<T>`
 * 
 * Boolean type utility which detects whether `T` is a readonly array.
 */
export type IsReadonlyArray<T> = 

T extends unknown[] 
  ? false
  : T extends readonly unknown[]
  ? true 
  : false;

