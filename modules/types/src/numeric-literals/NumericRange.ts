type Process<L, C extends unknown[] = [], R = L> =
  C["length"] extends L
      ? R
      : Process<L, [...C, 0], C["length"] | R>;

/**
 * **NumericRange**`<TLow,THigh>`
 *
 * Creates a union type of numbers between `TLow` and `THigh`
 *
 * ```ts
 * // 2 | 3 | 4 | 5 | 6 | 7
 * type Range = NumericRange<2,7>;
 * ```
 */
export type NumericRange<TLow, THigh> = TLow | Exclude<Process<THigh>, Process<TLow>>;
