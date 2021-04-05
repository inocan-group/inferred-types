/**
 * A "KeyedRecord" is intended to store a value without
 * losing any ability to infer type information later.
 *
 * The structure is always represented as a two-key
 * dictionary, where one key is always `__key` and the value
 * of this key points to the second key.
 *
 * For example:
 * ```ts
 * const song: KeyedRecord = { __key: "song", song: XXX }
 * ```
 */
export type KeyedRecord<
  K extends string,
  V extends any,
  T extends { __key: K } = { __key: K },
  U extends keyof T = keyof T & K
> = {
  [X in U]: T[X];
} & { K: V };
