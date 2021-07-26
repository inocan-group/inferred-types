
/**
 * **Break<T,D>**
 * 
 * Takes a string `T`, and splits it into a tuple of the form `[F, R]`.
 * ```ts
 * // ["the", " long and winding road"]
 * type T1 = Break<"the long and winding road", " ">;
 * // ["there", " I was, there I was"]
 * type T2 = Break<"there I was, there I was", " ">;
 * ```
 */
export type Break<T extends string, D extends string> = (
  string extends T ? [string, string] : (
    T extends `${infer F}${D}${infer _R}` ? (
      F extends `${infer _X}${D}${infer _Y}` ? never : (
        T extends `${F}${infer R}` ? [F, R] : never
      )
    ) : [T, ""]
  )
);

