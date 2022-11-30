/**
 * Returns the first values type in an array of values
 */
export type First<T extends readonly any[]> = T[0] extends T[number] ? T[0] : never;

export type FirstOrUndefined<T extends unknown> = T extends [unknown, ...[unknown]]
  ? First<T>
  : undefined;
