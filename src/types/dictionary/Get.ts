/* eslint-disable @typescript-eslint/no-unused-vars */
export type Get<T, K> = K extends `${infer FK}.${infer L}`
  ? FK extends keyof T ? Get<T[FK], L> : never
  : K extends keyof T ? T[K] : never;
