

type ParseInt<T> = T extends `${infer N extends number}` ? N : never;
/**
 * **AsNumber**`<T>`
 * 
 * Returns a _number_ for `T` where `T` extends a _number_ or `${number}` type; otherwise
 * return _never_. Literal types are preserved.
 * 
 * ```ts
 * // 4
 * type Num = AsNumber<"4">;
 * ```
 * **Related:** `ToNumber`
 */
export type AsNumber<T> = T extends number
  ? T & number
  : number extends T
    ? number
    : T extends `${number}` 
      ? ParseInt<T>
      : never;
