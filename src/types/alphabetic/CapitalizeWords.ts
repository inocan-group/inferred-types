/**
 * Capitalize all words in a string
 */
export type CapitalizeWords<S extends string> =
  S extends `${infer L} ${infer R}` ? `${CapitalizeWords<L>} ${CapitalizeWords<R>}` :
  S extends `${infer L},${infer R}` ? `${CapitalizeWords<L>},${CapitalizeWords<R>}` :
  S extends `${infer L}.${infer R}` ? `${CapitalizeWords<L>}.${CapitalizeWords<R>}` :
  Capitalize<S>;

