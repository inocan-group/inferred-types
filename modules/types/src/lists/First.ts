

/**
 * **First**`<T>`
 * 
 * Returns the _first_ type in a list. If `TElse` is provided it will set 
 * the type to `TElse` when:
 * - `T` is a Tuple type
 * - `T[1]` is not a valid index of `T`
 * - by default `TElse` is set to _never_
 * 
 * **Related:** `Second`, `Last`
 */
export type First<
  T,
  ELSE = never
> = T extends readonly unknown[]
  ? T[0] extends T[number] ? T[0] : ELSE
  : never;


