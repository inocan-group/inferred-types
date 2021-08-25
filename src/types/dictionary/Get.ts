/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Get the type of a property of an object:
 * ```ts
 * const car = { make: "Chevy", model: "Malibu", }
 * ```
 */
export type Get<T, K> = K extends `${infer FK}.${infer L}`
  ? FK extends keyof T
    ? Get<T[FK], L>
    : never
  : K extends keyof T
  ? T[K]
  : never;
