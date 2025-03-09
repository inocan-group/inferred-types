export type RemoveStringInterpolation<T extends string> =
? Trim<T>



  type T1 = RemoveStringInterpolation<`Name: {{string}}, Age: {{number}}`>;
  type T2 = RemoveStringInterpolation<`${string}Name: {{string}}, Age: {{number}}`>;
  type T3 = RemoveStringInterpolation<`${string}Name: {{string}}, Age: {{number}}${string}`>;

  type TT2 = Trim<T2>;
