/**
 * **FirstOfEach**<TList>
 * 
 * Mutates a tuple in one of two ways based on the input tuple:
 * 
 * - **String** - if the array is an array of string literals then it will reduce the literal 
 * to just the first letter (if a wide string is found then it is left "as is")
 * - **Array** - if the elements of the array `TList` are themselves array's then it
 * will reduce the item to just the first element in the array and _undefined_ if the
 * array was empty.
 * 
 * For a two-dimensional array, returns a _union type_ which combines the first element of the interior
 * array.
 *
 * ```ts
 * type Str = [ "foo", "bar", "baz" ];
 * type Arr = [ ["foo", 1], ["bar", 2] ];
 * // "f" | "b"
 * type S = FirstOfEach<Str>;
 * // "foo" | "bar"
 * type A = FirstOfEach<Arr>;
 * ```
 */
export type FirstOfEach<T extends readonly unknown[][]> = T[number][0] extends T[number][number]
  ? T[number][0]
  : never;
