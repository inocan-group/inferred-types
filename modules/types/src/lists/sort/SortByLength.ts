
/**
 * Returns true if A is longer than B.
 * We compare by stripping one char at a time.
 */
type IsLonger<A extends string, B extends string> =
  A extends `${string}${infer ARest}`
    ? B extends `${string}${infer BRest}`
      ? IsLonger<ARest, BRest>
      : true         // B ran out first → A is longer
    : false;         // A ran out (or empty) → not longer


/** Find the longest string in a readonly tuple */
type Longest<
  T extends readonly string[],
  Curr extends string = ""
> =
  T extends readonly [infer H extends string, ...infer R extends readonly string[]]
    ? Longest<R, IsLonger<H, Curr> extends true ? H : Curr>
    : Curr;



/**
 * Remove the first occurrence of V from a readonly tuple
 */
type RemoveFirst<
  T extends readonly unknown[],
  V,
  Acc extends unknown[] = []
> =
  T extends readonly [infer H, ...infer R]
    ? H extends V
      // found it: return accumulated + rest
      ? [...Acc, ...R]
      // not it: keep accumulating
      : RemoveFirst<R, V, [...Acc, H]>
    : Acc;

type Sort<
  T extends readonly string[],
  Acc extends string[] = []
> =
  T["length"] extends 0
    ? Acc
    : Longest<T> extends infer L extends string
      ? Sort<
          RemoveFirst<T, L>,
          [...Acc, L]
        >
      : never;

/**
 * **SortByLength**`<T>`
 *
 * Sorts the elements from longest to shortest.
 *
 * - use `Reverse<T>` utility if you want the opposite.
 */
export type SortByLength<
  T extends readonly string[]
> = Sort<T>;


