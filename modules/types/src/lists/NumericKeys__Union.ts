type TupleIndices<T extends readonly unknown[]>
  = Exclude<keyof T, keyof any[]> extends infer K
      ? K extends `${infer N extends number}` // parse the string literal back to a number literal
          ? N
          : never
      : never;

/**
 * **NumericKeys__Union**`<T>`
 *
 * Provides a literal union of keys when a literal tuple is passed in.
 *
 * - returns `number` when a wide tuple is passed in
 *
 * **Related:** `NumericKeys`, `Keys`, `ObjectKeys`
 */
export type NumericKeys__Union<T extends readonly unknown[]> = TupleIndices<T>;
