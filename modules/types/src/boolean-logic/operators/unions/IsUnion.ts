

type IsUnionImpl<T, C extends T = T> =
  (T extends infer TItem // Iterate over T, here TItem is an item from the original union T. Ingredients 1&2
    ? C extends TItem // C holds the original union T. Does union T extends an item from it? // Ingredient 3
      ? true // yes. that could only be true if union T consist of one item
      : unknown // no
    : never) extends true ? false : true // have we got true from the above? yes - it's not a union

/**
 * **IsUnion**`<T>`
 *
 * Type utility which returns a boolean flag indicating whether the
 * given `T` is typed as a _union_ type.
 *
 * Note: `boolean` is treated as a union (`true | false`) and returns `true`.
 */
export type IsUnion<T> = IsUnionImpl<T>;
