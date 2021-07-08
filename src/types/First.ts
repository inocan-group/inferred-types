/**
 * Returns the first values type in an array of values
 */
export type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
