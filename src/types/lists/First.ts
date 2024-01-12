

/**
 * **First**`<T>`
 * 
 * Returns the _first_ type in a list.
 * 
 * Typing ensures that list has at a minimum one item in it.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type First<T> = T extends readonly any[]
  ? T[0] extends T[number] ? T[0] : never
  : never;


