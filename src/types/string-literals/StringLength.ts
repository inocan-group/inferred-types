/**
 * Type utility that provides the _length_ of a given string type in a way which
 * is _not_ limited to TS's recursive string length of roughly 48.
 * 
 * ```ts
 * // 3
 * type Three = StringLength<"foo">;
 * ```
 */
export type StringLength<S extends string, R extends number[] = []>
  = S extends `${infer _First}${infer _Second}${infer _Third}${infer _Fourth}${infer _Fifth}${infer _Sixth}${infer _Sevebnth}${infer _Eighth}${infer _Ninth}${infer _Tenth}${infer Rest}`
  ? StringLength<Rest, [...R, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]>
  : S extends `${infer _First}${infer _Second}${infer _Third}${infer _Fourth}${infer _Fifth}${infer _Sixth}${infer _Sevebnth}${infer _Eighth}${infer _Ninth}${infer Rest}`
  ? StringLength<Rest, [...R, 1, 1, 1, 1, 1, 1, 1, 1, 1]>
  : S extends `${infer _First}${infer _Second}${infer _Third}${infer _Fourth}${infer _Fifth}${infer _Sixth}${infer _Sevebnth}${infer _Eighth}${infer Rest}`
  ? StringLength<Rest, [...R, 1, 1, 1, 1, 1, 1, 1, 1]>
  : S extends `${infer _First}${infer _Second}${infer _Third}${infer _Fourth}${infer _Fifth}${infer _Sixth}${infer _Sevebnth}${infer Rest}`
  ? StringLength<Rest, [...R, 1, 1, 1, 1, 1, 1, 1]>
  : S extends `${infer _First}${infer _Second}${infer _Third}${infer _Fourth}${infer _Fifth}${infer _Sixth}${infer Rest}`
  ? StringLength<Rest, [...R, 1, 1, 1, 1, 1, 1]>
  : S extends `${infer _First}${infer _Second}${infer _Third}${infer _Fourth}${infer _Fifth}}${infer Rest}`
  ? StringLength<Rest, [...R, 1, 1, 1, 1, 1]>
  : S extends `${infer _First}${infer _Second}${infer _Third}${infer _Fourth}${infer Rest}`
  ? StringLength<Rest, [...R, 1, 1, 1, 1]>
  : S extends `${infer _First}${infer _Second}${infer _Third}${infer Rest}`
  ? StringLength<Rest, [...R, 1, 1, 1]>
  : S extends `${infer _First}${infer _Second}${infer Rest}`
  ? StringLength<Rest, [...R, 1, 1]>
  : S extends `${infer _First}${infer Rest}`
  ? StringLength<Rest, [...R, 1]>
  : [...R]["length"];



