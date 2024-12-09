/**
 * **Second**`<T, [ELSE]>`
 *
 * Returns the _second_ type in a list. If `TElse` is provided it will set
 * the type to `TElse` when:
 * - `T` is a Tuple type
 * - `T[1]` is not a valid index of `T`
 * - by default `TElse` is set to _never_
 *
 * **Related:** `First`, `Last`
 */
export type Second<
  T,
  ELSE = never,
> = T extends readonly unknown[]
  ? T[1] extends T[number]
    ? T[1]
    : ELSE
  : never;
